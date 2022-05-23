import React, { FC } from "react";
import { providers } from "ethers";
import { Provider, createClient } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

import { Buffer } from "buffer";
import MintSeedForm from "./MintSeedForm";

if (typeof window !== "undefined" && !window.Buffer) {
  window.Buffer = Buffer;
}

const client = createClient({
  autoConnect: true,
  provider(config) {
    return new providers.AlchemyProvider(
      config.chainId,
      "9ANCgz1Z3X9HqDQLxVtzabn04IYiK1v-"
    );
  },
  connectors: [
    new InjectedConnector(),
    new WalletConnectConnector({
      options: {
        qrcode: true,
      },
    }),
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
