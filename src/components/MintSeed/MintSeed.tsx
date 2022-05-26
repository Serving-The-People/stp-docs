import React, { FC } from "react";
import { providers } from "ethers";
import { Provider, createClient } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";

import { Buffer } from "buffer";
import MintSeedForm from "./MintSeedForm";

if (typeof window !== "undefined" && !window.Buffer) {
  window.Buffer = Buffer;
}

const client = createClient({
  autoConnect: true,
  provider(config) {
    return new providers.AlchemyProvider(
      typeof config !== "undefined" && config.chainId,
      "9ANCgz1Z3X9HqDQLxVtzabn04IYiK1v-"
    );
  },
  connectors: [
    new InjectedConnector({ options: { name: "MetaMask" } }),
    new WalletConnectConnector({
      options: {
        qrcode: true,
      },
    }),
    // new CoinbaseWalletConnector({
    //   options: {
    //     appName: "stp-docs",
    //   },
    // }),
  ],
});

const App: FC = () => {
  return (
    <Provider client={client}>
      <MintSeedForm />
    </Provider>
  );
};

export default App;
