// import * as Auction from './Auction.contract';

//  Auction contract
type Bider = TMap<TAddress, TNat>;

type TransferParams = TList<
    TRecord<
        {
            from_: TAddress;
            txs: TList<
                TRecord<
                    {
                        to_: TAddress;
                        token_id: TNat;
                        amount: TNat;
                    },
                    ['to_', ['token_id', 'amount']]
                >
            >;
        },
        ['from_', 'txs']
    >
>;

interface TAuctionStorage {
    nft_address: TOption<TAddress>;
    token_id: TNat;
    end_time: TTimestamp;
    partner: TOption<TAddress>;
    partner_profit: TNat;
    bider_bonus: TNat;
    openning_price: TNat;
    auction_factory: TOption<TAddress>;
    is_purchased: TBool;
    highest_bidder: TOption<TAddress>;
    highest_bid: TNat;
    biders: Bider;
}

class AuctionStorage {
    // The constructor allows the user to override the initial storage
    constructor(
        public storage: TAuctionStorage = {
            nft_address: Sp.none,
            token_id: 0,
            end_time: Sp.now,
            partner: Sp.none,
            partner_profit: 0,
            bider_bonus: 0,
            openning_price: 0,
            auction_factory: Sp.none,
            is_purchased: false,
            highest_bidder: Sp.none,
            highest_bid: 0,
            biders: [],
        },
    ) {}
}

class AuctionOffchainView extends AuctionStorage {
    @OffChainView({
        pure: true,
        description: 'This is the `is_auction_end` check is auction end',
    })
    is_auction_end = (): TBool => {
        return Sp.now > this.storage.end_time;
    };

    @OffChainView({
        pure: true,
        description: 'This is the `get_partner_share` check how much partner get',
    })
    get_partner_share = (): TNat => {
        return (this.storage.highest_bid * this.storage.partner_profit) / 100;
    };

    @OffChainView({
        pure: true,
        description: 'This is the `get_bider_bonus` check how much bider bonus after auction end',
    })
    get_bider_bonus = (): TNat => {
        if (this.storage.biders.size() !== 0) {
            return (this.storage.highest_bid * this.storage.bider_bonus) / 100 / this.storage.biders.size();
        } else {
            return 0;
        }
    };

    @OffChainView({
        pure: true,
        description: 'This is the `get_end_time` check when auction end',
    })
    get_end_time = (): TTimestamp => {
        return this.storage.end_time;
    };
}

@Contract
export class Auction extends AuctionOffchainView {
    @Inline
    natOfMutez = (v: TMutez): TNat =>
        Sp.ediv(v, 1 as TMutez)
            .openSome('Failed to divide mutez')
            .fst();

    @Inline
    mutezOfNat = (v: TNat) => (1 as TMutez).multiply(v);

    @EntryPoint
    Bid(): void {
        const bid_amount: TNat = this.storage.biders.get(Sp.sender, 0) + this.natOfMutez(Sp.amount);
        Sp.verify(Sp.now < this.storage.end_time, 'Auction is over');
        Sp.verify(
            bid_amount >= this.storage.openning_price && bid_amount > this.storage.highest_bid,
            'Must bid greater than or equal to the opening price and higher than hightest bid',
        );
        Sp.verify(!this.storage.is_purchased, 'Nft was bought by someone');

        // Update bider
        this.storage.biders.set(Sp.sender, bid_amount);
        this.storage.highest_bid = bid_amount;
        this.storage.highest_bidder = Sp.some(Sp.sender);
    }

    @EntryPoint
    Refund(): void {
        Sp.verify(this.storage.highest_bid > 0, 'Refund only when someone bidded');
        Sp.verify(Sp.now > this.storage.end_time, 'Auction not over');
        Sp.verify(!this.storage.is_purchased, 'Nft was bought by someone');

        const rewardBid: TNat =
            (this.storage.highest_bid * this.storage.bider_bonus) / 100 / this.storage.biders.size();

        // remove highest bidder
        this.storage.biders.remove(this.storage.highest_bidder.openSome('Invalid highest bider'));

        for (const bider of this.storage.biders.entries()) {
            Sp.transfer(
                Sp.unit,
                this.mutezOfNat(bider.value + rewardBid),
                Sp.contract<TUnit>(bider.key as TAddress).openSome('Invalid bider address'),
            );
        }

        // transfer profit to partner
        Sp.transfer(
            Sp.unit,
            this.mutezOfNat((this.storage.highest_bid * this.storage.partner_profit) / 100),
            Sp.contract<TUnit>(this.storage.partner.openSome('Invalid partner address')).openSome(
                'Invalid partner contract',
            ),
        );

        // transfer bonus to someone who trigger refund function
        Sp.transfer(
            Sp.unit,
            this.mutezOfNat(rewardBid),
            Sp.contract<TUnit>(Sp.sender).openSome('Invalid sender contract'),
        );

        // transfer nft to highest bidder
        const transfer_nft: TransferParams = [
            {
                from_: Sp.selfAddress,
                txs: [
                    {
                        to_: this.storage.highest_bidder.openSome('Invalid highest bidder address'),
                        token_id: this.storage.token_id,
                        amount: 1,
                    },
                ],
            },
        ];

        const contract: TContract<TransferParams> = Sp.contract<TransferParams>(
            this.storage.nft_address.openSome('Invalid address'),
            'transfer',
        ).openSome('Invalid Interface');
        Sp.transfer(transfer_nft, 0, contract);

        // transfer left balance to auction factory
        let auc_factory_profit: TNat = (100 - this.storage.partner_profit) as TNat;
        auc_factory_profit = (auc_factory_profit - this.storage.bider_bonus) as TNat;
        Sp.transfer(
            Sp.unit,
            this.mutezOfNat((this.storage.highest_bid * auc_factory_profit) / 100),
            Sp.contract<TUnit>(this.storage.auction_factory.openSome('Invalid auction factory address')).openSome(
                'Invalid factory contract',
            ),
        );

        this.storage.is_purchased = true;
    }

    @EntryPoint
    Buy(): void {
        Sp.verify(this.storage.highest_bid == 0, 'You can buy only when no one bidded');
        Sp.verify(Sp.now > this.storage.end_time, 'Auction not over');
        Sp.verify(!this.storage.is_purchased, 'Nft was bought by someone');
        Sp.verify(
            this.natOfMutez(Sp.amount) >= this.storage.openning_price,
            'you need to pay greater than or equal to the opening price ',
        );

        // transfer profit to partner

        Sp.transfer(
            Sp.unit,
            this.mutezOfNat((this.natOfMutez(Sp.amount) * this.storage.partner_profit) / 100),
            Sp.contract<TUnit>(this.storage.partner.openSome('Invalid partner address')).openSome('Invalid contract'),
        );

        // transfer nft buyer
        const transfer_nft: TransferParams = [
            {
                from_: Sp.selfAddress,
                txs: [
                    {
                        to_: Sp.sender,
                        token_id: this.storage.token_id,
                        amount: 1,
                    },
                ],
            },
        ];

        const contract: TContract<TransferParams> = Sp.contract<TransferParams>(
            this.storage.nft_address.openSome('Invalid address'),
            'transfer',
        ).openSome('Invalid Interface');
        Sp.transfer(transfer_nft, 0, contract);

        // transfer left balance to auction factory
        const auc_factory_profit: TNat = (100 - this.storage.partner_profit) as TNat;
        Sp.transfer(
            Sp.unit,
            this.mutezOfNat((this.natOfMutez(Sp.amount) * auc_factory_profit) / 100),
            Sp.contract<TUnit>(this.storage.auction_factory.openSome('Invalid auction factory address')).openSome(
                'Invalid contract',
            ),
        );

        this.storage.is_purchased = true;
    }
}

///// Auction Factory

type Profit = TNat;

type Partners = TMap<TAddress, Profit>;

interface TStorage {
    admin: TAddress;
    partners: Partners;
    auctions: TSet<TAddress>;
    bider_bonus: TNat;
}

class FactoryStorage {
    // The constructor allows the user to override the initial storage
    constructor(
        public storage: TStorage = {
            admin: 'tz1bwsEWCwSEXdRvnJxvegQZKeX5dj6oKEys',
            partners: [],
            auctions: [],
            bider_bonus: 2,
        },
    ) {}
}

class FactoryOffchainView extends FactoryStorage {
    @OffChainView({
        pure: true,
        description: 'This is the `balance` view ',
    })
    get_balance = (): TNat => {
        return Sp.balance;
    };
}

@Contract
export class AuctionFactory extends FactoryOffchainView {
    @Inline
    onlyAdmin(): void {
        Sp.verify(Sp.sender == this.storage.admin, 'onlyAdmin');
    }

    @Inline
    isPartner = (address: TAddress): TBool => this.storage.partners.hasKey(address);

    @Inline
    onlyPartners(): void {
        Sp.verify(this.isPartner(Sp.sender), 'onlyPartners');
    }

    @EntryPoint
    SetPartner(remove: TOption<TSet<TAddress>>, add: TOption<TSet<TAddress>>, profit: TNat): void {
        this.onlyAdmin();
        if (remove.isSome()) {
            for (const partner of remove.openSome().elements()) {
                this.storage.partners.remove(partner);
            }
        }
        if (add.isSome()) {
            for (const partner of add.openSome().elements()) {
                this.storage.partners.set(partner, profit);
            }
        }
    }

    @EntryPoint
    SetBiderBonus(value: TNat): void {
        this.onlyAdmin();
        this.storage.bider_bonus = value;
    }

    @EntryPoint
    createNewAuction(_nft_address: TAddress, _token_id: TNat, _bidding_time: TInt, _opening_price: TNat): void {
        this.onlyPartners();

        // create new auction
        const auctionContract: TOption<TAddress> = Sp.some(
            Sp.createContract(
                Auction,
                {
                    nft_address: Sp.some(_nft_address),
                    token_id: _token_id,
                    end_time: Sp.now.addMinutes(_bidding_time),
                    partner: Sp.some(Sp.sender),
                    partner_profit: this.storage.partners.get(Sp.sender),
                    bider_bonus: this.storage.bider_bonus,
                    openning_price: _opening_price,
                    auction_factory: Sp.some(this.storage.admin),
                    is_purchased: false,
                    highest_bidder: Sp.none,
                    highest_bid: 0,
                    biders: [] as Bider,
                },
                0,
                'tz1RomaiWJV3NFDZWTMVR2aEeHknsn3iF5Gi',
            ),
        );

        const _to: TAddress = auctionContract.openSome('Value is None');

        // store auction address
        this.storage.auctions.add(_to);

        // transfer nft to nft contract
        const transfer_nft: TransferParams = [
            {
                from_: Sp.sender,
                txs: [
                    {
                        to_: _to,
                        token_id: _token_id,
                        amount: 1,
                    },
                ],
            },
        ];

        const contract: TContract<TransferParams> = Sp.contract<TransferParams>(_nft_address, 'transfer').openSome(
            'Invalid Interface',
        );
        Sp.transfer(transfer_nft, 0, contract);
    }
}

Dev.compileContract('contract_compiled', new AuctionFactory());
