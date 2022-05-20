import React, { FC } from "react";
import { Provider, createClient } from "wagmi";
import { Buffer } from "buffer";
import MintSeedForm from "./MintSeedForm";

if (typeof window !== "undefined" && !window.Buffer) {
  window.Buffer = Buffer;
}

const client = createClient({
  autoConnect: true,
});

const App: FC = () => {
  return (
    <Provider client={client}>
      <MintSeedForm />
    </Provider>
  );
};

export default App;
