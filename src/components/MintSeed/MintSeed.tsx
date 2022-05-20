import React, { FC } from "react";
import { Provider, createClient } from "wagmi";
import { Buffer } from "buffer";
import MintSeedForm from "./MintSeedForm";

if (!window.Buffer) {
  window.Buffer = Buffer;
}

const client = createClient({
  autoConnect: true,
});

function App() {
  return (
    <Provider client={client}>
      <MintSeedForm />
    </Provider>
  );
}

export default App;
