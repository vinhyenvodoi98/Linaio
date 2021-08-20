import React from 'react';
import { Button } from 'components';

export default function WalletButton({ address, connectWallet, disconnectWallet }) {
  return (
    <Button
      onClick={() => {
        if (!address) {
          connectWallet();
        } else {
          disconnectWallet();
        }
      }}
    >
      {!address ? 'Connect Wallet' : 'Disconnect Wallet'}
    </Button>
  );
}
