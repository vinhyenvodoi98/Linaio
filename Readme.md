<p align="center">
<img src="./lightLogo.png" />
</p>
<h1 align="center">Linaio</h1>

## Introduction 👋
This project provides an auction platform of custom products for crypto fans. Currently, the product will include the nike air force 1 shoe tokenized into nft . After the auction is done, we will contact the user to collect email and the shoes will be shipped in 2 to 3 weeks. in case the auction ends and no one bets the product will be sold at the openning price. We have a special feature is that unsuccessful bidders will be refunded get a little bonus. In addition, there will be a winner announcement event trigger, who will also be entitled to a bonus. We wanted to create a place where artists customizing shoes or other blockchain products could sold the physical version. Anyone who participates will get their benefits

## Link
Now we live on the Florence testnet

https://linaio.web.app/

## Video Demo

## Future

- Can be auctioned with FA1.2 . tokens
- Build nft bright between Ethereum and Tezos where people can switch chain
- auction nft on tezos with tokens on ethereum and vice versa.

## Development
### Smart Contract
Install
```sh
npm install
```
Replace your private key and run command to deploy:
```sh
npm run originate -- --code build/compilation/AuctionFactory.contract/contract_compiled/step_000_cont_0_contract.tz --storage build/compilation/AuctionFactory.contract/contract_compiled/step_000_cont_0_storage.tz --rpc https://florencenet.smartpy.io --private-key <Your Private Key>
```
### frontend
Install
```sh
yarn
```
Run project
```sh
yarn start
```
## Factory contract
KT1RvfaxUsJ6L8ynLjBwZqBQBswtXXXU1R1o

## FA2 contract we use :
KT1LCJLiG6dUBGoEdn9vQaBixPZtDfgiYBRM

we custom metadata :
```
{
  tokenUri : <Pinata link>
}
```
structure of tokenUri
```json
{
  "name":"Nike AF1 Tezos",
  "description":"This is the first custom shoe on the market",
  "image":"https://gateway.pinata.cloud/ipfs/QmPjHSKJyu1VEVeHpq224e9zX7AAaULXwijqZcbUDxpq98",
  "attributes":[
    {"trait_type":"size","value":"21 US"}
    ]
}
```
