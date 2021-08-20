import { useState, useCallback, useContext } from 'react';
import axiosClient from 'api';
import { bytes2Char } from '@taquito/utils';
import { TezosContext } from 'contexts/Taquito';
import { getContractAddress } from 'utlis/network';
import { MessageContext } from 'contexts/Message';

export const useFA2 = () => {
  const [name, setName] = useState(null);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState(null);
  const [attributes, setAttributes] = useState(null);
  const { Tezos, address } = useContext(TezosContext);
  const { setStatus, setContent } = useContext(MessageContext);

  const fetchTokenFA2Info = useCallback(
    async (Fa2Address, tokenId) => {
      if (!!Tezos) {
        const FA2TokenContract = await Tezos.wallet.at(Fa2Address);
        const FA2Storage = await FA2TokenContract.storage();
        const tokenInfo = await FA2Storage.assets.token_metadata.get(tokenId);
        // get tokenUri
        const tokenUri = bytes2Char(tokenInfo.token_info.get('tokenUri'));
        let data = await axiosClient(tokenUri);

        setName(data.name);
        setImage(data.image);
        setDescription(data.description);
        setAttributes(data.attributes);
      }
    },
    [Tezos]
  );

  const updateOperator = useCallback(
    async (Fa2Address, tokenId) => {
      setStatus('process');
      setContent('Approval transaction is pending');
      let isSuccess = await Tezos.wallet
        .at(Fa2Address)
        .then((contract) => {
          const contractAddress = getContractAddress('florencenet');
          const param = { owner: address, operator: contractAddress.factory, token_id: tokenId };

          return contract.methods.update_operators([{ add_operator: param }]).send();
        })
        .then((op) => {
          console.log(`Awaiting for ${op.opHash} to be confirmed...`);
          return op.confirmation().then(() => op.opHash);
        })
        .then((opHash) => {
          setStatus('success');
          setContent('Approval transaction is successful');
          console.log(`Operation injected: https://florencenet.tzstats.com/${opHash}`);
          return true;
        })
        .catch((error) => {
          setStatus('error');
          setContent('Approval transaction failed');
          console.log(`Error: ${JSON.stringify(error, null, 2)}`);
          return false;
        });

      return isSuccess;
    },
    [Tezos, address]
  );

  return { name, image, description, attributes, fetchTokenFA2Info, updateOperator };
};
