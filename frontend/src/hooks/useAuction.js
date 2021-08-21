import { useState, useCallback, useContext, useEffect } from 'react';
import { parseBalance } from 'utlis/helper';
import { MessageContext } from 'contexts/Message';
import { TezosContext } from 'contexts/Taquito';

export const useAuction = (auctionAddress) => {
  const { Tezos, address } = useContext(TezosContext);
  const { setStatus, setContent } = useContext(MessageContext);

  const [FA2adr, setFA2adr] = useState(null);
  const [tokenId, setTokenId] = useState(null);
  const [partner, setPartner] = useState(null);
  const [highestBid, setHighestBid] = useState(null);
  const [openingPrice, setOpeningPrice] = useState(null);
  const [totalBidAmount, setTotalBidAmount] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isAuctionEnd, setIsAuctionEnd] = useState(null);
  const [isCanBuy, setIsCanBuy] = useState(null);
  const [biders, setBiders] = useState(null);
  const [purchased, setPurchased] = useState(null);
  const [biderBonus, setBiderBonus] = useState(null);
  const [bountyPerBidder, setBountyPerBidder] = useState(null);

  const getAuctions = useCallback(async () => {
    if (!!auctionAddress && Tezos !== null) {
      const contract = await Tezos.wallet.at(auctionAddress);
      const auctionStorage = await contract.storage();
      // get FA2 in auction
      let _FA2adr = auctionStorage.nft_address;
      setFA2adr(_FA2adr);
      // get tokenId in auction
      let _tokenId = await auctionStorage.token_id;
      setTokenId(_tokenId.toNumber());
      // get partner
      let _partner = await auctionStorage.partner;
      setPartner(_partner);
      // get HighestBid
      let _highestBid = await auctionStorage.highest_bid;
      setHighestBid(parseBalance(_highestBid, 6));
      // get openingPrice
      let _openingPrice = await auctionStorage.openning_price;
      setOpeningPrice(parseBalance(_openingPrice, 6));
      // get end time
      let _end_time = await auctionStorage.end_time;
      _end_time = new Date(_end_time);
      setEndTime(_end_time.getTime());
      // checko is purchased
      let _is_purchased = await auctionStorage.is_purchased;
      setPurchased(_is_purchased);
      // get biders
      let _biders = await auctionStorage.biders;
      setBiders(_biders);
      // get bonus for bider
      let _bider_bonus = await auctionStorage.bider_bonus;
      setBiderBonus(parseInt(_bider_bonus));
      // get total bid amount of user
      try {
        let _totalBidAmount = _biders.get(address);
        setTotalBidAmount(parseBalance(_totalBidAmount, 6));
      } catch (error) {
        console.log(error);
        setTotalBidAmount(0);
      }
    }
  }, [Tezos, auctionAddress, address]);

  const bidding = useCallback(
    async (amount) => {
      if (!!auctionAddress && !!address && !!Tezos) {
        // convert tez to mutez
        amount = amount * 1000000;
        // show message
        setStatus('process');
        setContent('Bid transaction is pending');
        // place a bid
        await Tezos.wallet
          .at(auctionAddress)
          .then((contract) => {
            return contract.methods.Bid([]).send({ amount, mutez: true });
          })
          .then((op) => {
            console.log(`Awaiting for ${op.opHash} to be confirmed...`);
            return op.confirmation().then(() => op.opHash);
          })
          .then((opHash) => {
            setStatus('success');
            setContent('Bid transaction is successful');
            console.log(`Operation injected: https://florencenet.tzstats.com/${opHash}`);
            return true;
          })
          .catch((error) => {
            setStatus('error');
            setContent('Bid transaction failed');
            console.log(`Error: ${JSON.stringify(error, null, 2)}`);
            return false;
          });
      }
    },
    [auctionAddress, Tezos, address, setStatus, setContent]
  );

  const refund = useCallback(async () => {
    if (!!auctionAddress && !!address && !!Tezos) {
      // show message
      setStatus('process');
      setContent('Refund transaction is pending');
      // Refund
      await Tezos.wallet
        .at(auctionAddress)
        .then((contract) => {
          return contract.methods.Refund([]).send();
        })
        .then((op) => {
          console.log(`Awaiting for ${op.opHash} to be confirmed...`);
          return op.confirmation().then(() => op.opHash);
        })
        .then((opHash) => {
          setStatus('success');
          setContent('Refund transaction is successful');
          console.log(`Operation injected: https://florencenet.tzstats.com/${opHash}`);
          return true;
        })
        .catch((error) => {
          setStatus('error');
          setContent('Refund transaction failed');
          console.log(`Error: ${JSON.stringify(error, null, 2)}`);
          return false;
        });
    }
  }, [auctionAddress, Tezos, address, setStatus, setContent]);

  const buy = useCallback(
    async (amount) => {
      if (!!auctionAddress && !!address && !!Tezos) {
        // convert tez to mutez
        amount = amount * 1000000;
        console.log({ auctionAddress });
        // show message
        setStatus('process');
        setContent('Buy transaction is pending');
        // place a bid
        await Tezos.wallet
          .at(auctionAddress)
          .then((contract) => {
            return contract.methods.Buy([]).send({ amount, mutez: true });
          })
          .then((op) => {
            console.log(`Awaiting for ${op.opHash} to be confirmed...`);
            return op.confirmation().then(() => op.opHash);
          })
          .then((opHash) => {
            setStatus('success');
            setContent('Buy transaction is successful');
            console.log(`Operation injected: https://florencenet.tzstats.com/${opHash}`);
            return true;
          })
          .catch((error) => {
            setStatus('error');
            setContent('Buy transaction failed');
            console.log(`Error: ${JSON.stringify(error, null, 2)}`);
            return false;
          });
      }
    },
    [auctionAddress, Tezos, address, setStatus, setContent]
  );

  const checkAuctionEnd = useCallback(async () => {
    if (!!endTime) {
      let now = new Date();
      setIsAuctionEnd(now.getTime() > endTime);
      return now.getTime() > endTime;
    }
    return false;
  }, [endTime]);

  const checkCanBuy = useCallback(async () => {
    if (!!auctionAddress) {
      const contract = await Tezos.wallet.at(auctionAddress);
      const auctionStorage = await contract.storage();
      // check auction end
      let _is_purchased = await auctionStorage.is_purchased;

      let now = new Date();
      if (_is_purchased && now.getTime() < endTime) setIsCanBuy(true);
      else setIsCanBuy(false);
    }
  }, [auctionAddress, Tezos, endTime]);

  const checkPurchased = useCallback(async () => {
    if (!!auctionAddress) {
      const contract = await Tezos.wallet.at(auctionAddress);
      const auctionStorage = await contract.storage();
      // check auction end
      let _is_purchased = await auctionStorage.is_purchased;
      setPurchased(_is_purchased);
      return _is_purchased;
    } else return false;
  }, [auctionAddress, Tezos]);

  const getBountyPerBidder = useCallback(async () => {
    if (!!highestBid && biderBonus !== null && biders !== null) {
      const _bountyPerBidder = (highestBid * biderBonus) / 100 / biders.size;
      setBountyPerBidder(_bountyPerBidder);
    }
  }, [highestBid, biderBonus, biders]);

  useEffect(() => {
    if (auctionAddress !== null) {
      getAuctions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auctionAddress]);

  return {
    FA2adr,
    tokenId,
    highestBid,
    partner,
    openingPrice,
    totalBidAmount,
    endTime,
    isAuctionEnd,
    isCanBuy,
    purchased,
    bountyPerBidder,
    bidding,
    getAuctions,
    checkAuctionEnd,
    checkCanBuy,
    checkPurchased,
    getBountyPerBidder,
    refund,
    buy,
  };
};
