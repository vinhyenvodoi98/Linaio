import { useCallback, useState, createContext, useEffect } from 'react';

import { TezosToolkit } from '@taquito/taquito';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { NetworkType, BeaconEvent, defaultEventCallbacks } from '@airgap/beacon-sdk';
import { getContractAddress } from 'utlis/network';
import { parseBalance } from 'utlis/helper';

export const TezosContext = createContext({
  address: null,
  userBalance: null,
  connectWallet: null,
  disconnectWallet: null,
  contract: null,
  storage: null,
  Tezos: null,
});

export const TaquitoProvider = ({ children }) => {
  const [Tezos, setTezos] = useState(new TezosToolkit('https://florencenet.smartpy.io'));
  const [wallet, setWallet] = useState(null);
  const [address, setAddress] = useState(null);
  const [beaconConnection, setBeaconConnection] = useState(false);
  const [userBalance, setUserBalance] = useState(0);
  const [publicToken, setPublicToken] = useState('');
  const [contract, setContract] = useState(null);
  const [storage, setStorage] = useState(null);

  const connectWallet = useCallback(async () => {
    try {
      const setup = async (address) => {
        setAddress(address);
        // updates balance
        const balance = await Tezos.tz.getBalance(address);
        setUserBalance(parseBalance(balance.toNumber(), 6));
        // creates contract instance
        const contractAddress = getContractAddress('florencenet');

        const contract = await Tezos.wallet.at(contractAddress.factory);
        const storage = await contract.storage();
        setContract(contract);
        setStorage(storage);
      };

      const wallet = new BeaconWallet({
        name: 'Taquito Boilerplate',
        preferredNetwork: NetworkType.FLORENCENET,
        disableDefaultEvents: true, // Disable all events / UI. This also disables the pairing alert.
        eventHandlers: {
          // To keep the pairing alert, we have to add the following default event handlers back
          [BeaconEvent.PAIR_INIT]: {
            handler: defaultEventCallbacks.PAIR_INIT,
          },
          [BeaconEvent.PAIR_SUCCESS]: {
            handler: (data) => setPublicToken(data.publicKey),
          },
        },
      });
      Tezos.setWalletProvider(wallet);
      setWallet(wallet);
      // checks if wallet was connected before
      const activeAccount = await wallet.client.getActiveAccount();
      if (activeAccount) {
        const userAddress = await wallet.getPKH();
        await setup(userAddress);
        setBeaconConnection(true);
      }

      await wallet.requestPermissions({
        network: {
          type: NetworkType.FLORENCENET,
          rpcUrl: 'https://florencenet.smartpy.io',
        },
      });
      // gets user's address
      const userAddress = await wallet.getPKH();
      await setup(userAddress);
      setBeaconConnection(true);
    } catch (error) {
      console.log(error);
    }
  }, [Tezos]);

  const disconnectWallet = async () => {
    //window.localStorage.clear();
    setAddress('');
    setUserBalance(0);
    setWallet(null);
    const tezosTK = new TezosToolkit('https://florencenet.smartpy.io');
    setTezos(tezosTK);
    setBeaconConnection(false);
    setPublicToken(null);
    console.log('disconnecting wallet');
    if (wallet) {
      await wallet.client.removeAllAccounts();
      await wallet.client.removeAllPeers();
      await wallet.client.destroy();
    }
  };

  useEffect(() => {
    connectWallet();
  }, [1]);

  // return [address, loadWeb3Modal, logoutOfWeb3Modal];
  return (
    <TezosContext.Provider
      value={{ Tezos, address, userBalance, contract, storage, connectWallet, disconnectWallet }}
    >
      {children}
    </TezosContext.Provider>
  );
};
