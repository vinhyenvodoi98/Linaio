import { useEffect, useState, useCallback, useContext } from 'react';
import { TezosContext } from 'contexts/Taquito';
import { MessageContext } from 'contexts/Message';
import { getContractAddress } from 'utlis/network';

export const useFactory = () => {
  const { storage, Tezos } = useContext(TezosContext);
  const { setStatus, setContent } = useContext(MessageContext);

  const [auctions, setAuctions] = useState([]);

  const getAuctions = useCallback(async () => {
    if (!!storage) {
      // get all auctions
      let _auctions = await storage.auctions;
      setAuctions(_auctions);
    }
  }, [storage]);

  const createNewAuction = useCallback(
    async (nftAddress, tokenId, openningPrice, endTime) => {
      setStatus('process');
      setContent('Create new auction transaction is pending');

      openningPrice = parseInt(openningPrice) * 1000000;

      const contractAddress = getContractAddress('florencenet');
      await Tezos.wallet
        .at(contractAddress.factory)
        .then((contract) => {
          return contract.methods
            .createNewAuction(endTime, nftAddress, openningPrice, tokenId)
            .send();
        })
        .then((op) => {
          console.log(`Awaiting for ${op.opHash} to be confirmed...`);
          return op.confirmation().then(() => op.opHash);
        })
        .then((opHash) => {
          setStatus('success');
          setContent('Create new auction transaction is successful');
          console.log(`Operation injected: https://granada.tzstats.com/${opHash}`);
        })
        .catch((error) => {
          setStatus('error');
          setContent('Create new auction transaction failed');
          console.log(`Error: ${JSON.stringify(error, null, 2)}`);
        });

      await getAuctions();
    },

    [Tezos]
  );

  useEffect(() => {
    getAuctions();
  });

  return { auctions, getAuctions, createNewAuction };
};
