import React, { FC, useState, useCallback, ChangeEvent } from "react";
import { constants } from "ethers";
import { useAccount, useConnect, useSigner, useContractWrite } from "wagmi";
import { shortAddress } from "../../lib/shortAddress";
import SeedsABI from "../../hooks/SeedsABI.json";
import {
  useSeedsContract,
  SEEDS_CONTRACT_ADDRESS,
} from "../../hooks/useMintSeed";
import { useEtherPrices } from "../../hooks/useEtherPrices";
import styles from "./MintSeed.module.scss";

const MintSeed: FC = () => {
  const { data: address } = useAccount();
  const { connect, connectors } = useConnect();
  const [error, setError] = useState<string | null>(null);
  const [minting, setMinting] = useState(false);
  const [minted, setMinted] = useState(false);
  const { seedPrice } = useSeedsContract();
  const [quantity, setQuantity] = useState<number>(1);
  const [connectModalOpen, setConnectModalOpen] = useState(false);
  const { usdPrice } = useEtherPrices();

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(e.target.value));
  }, []);

  const { data: mintTx, write: mintSeed } = useContractWrite(
    {
      addressOrName: SEEDS_CONTRACT_ADDRESS,
      contractInterface: SeedsABI,
    },
    "mint",
    {
      args: [quantity],
      onError: (e) => {
        setMinting(false);
        if (e.message.includes("Not Enough Ether")) {
          setError("Not enough funds in your wallet");
        } else {
          setError("Could not process transaction");
        }
      },
      onSuccess: () => {
        setError(null);
        setMinting(false);
        setMinted(true);
      },
    }
  );

  const totalPriceEth = Math.max(0, (quantity || 0) * parseFloat(seedPrice));
  const totalPriceUSD = usdPrice ? totalPriceEth * usdPrice : 0;

  const handleSubmit = useCallback(async () => {
    if (quantity <= 0) {
      alert("You can only mint one or more seeds, obviously.");
    } else {
      setError(null);
      setMinting(true);
      mintSeed();
    }
  }, [quantity]);
  return (
    <div>
      <div className={styles.inputWrapper}>
        <label htmlFor="quantity">Quantity</label>
        <input
          id="quantity"
          type="number"
          value={quantity}
          onChange={handleChange}
        />
        {address && (
          <div className={styles.mintButtonWrapper}>
            <button onClick={handleSubmit} disabled={!address}>
              Mint
            </button>
            <span className={styles.address}>
              {shortAddress(address.address)}
            </span>
          </div>
        )}
        {!address && !connectModalOpen && (
          <button
            className={styles.connectButton}
            onClick={() => setConnectModalOpen(true)}
          >
            Connect Wallet to Mint
          </button>
        )}
        {!address && connectModalOpen && (
          <div className={styles.connectButtons}>
            {connectors.map((connector) => (
              <button
                key={connector.name}
                className={styles.connectButton}
                onClick={() => connect(connector)}
              >
                {connector.name}
              </button>
            ))}
            <button
              className={styles.connectButton}
              onClick={() => setConnectModalOpen(false)}
            >
              x
            </button>
          </div>
        )}
      </div>
      <div className={styles.balanceRow}>
        <span>
          Price:{" "}
          {seedPrice && usdPrice
            ? `${constants.EtherSymbol} ${totalPriceEth.toFixed(
                1
              )} ($${totalPriceUSD.toFixed(2)})`
            : "Loading..."}
        </span>
        {error && <span className={styles.error}>{error}</span>}
        {!error && minting && (
          <span className={styles.loading}>Minting...</span>
        )}
        {!error && !minting && minted && (
          <span className={styles.success}>
            {`Minted! View your seeds at `}
            <a href="https://seeds.lobus.io/wallet">seeds.lobus.io</a>
          </span>
        )}
      </div>
    </div>
  );
};

export default MintSeed;
