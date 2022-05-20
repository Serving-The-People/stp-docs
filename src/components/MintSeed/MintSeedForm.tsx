import React, {
  FC,
  useState,
  useCallback,
  ChangeEvent,
  useEffect,
  Fragment,
} from "react";
import { useAccount, useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { shortAddress } from "../../lib/shortAddress";
import styles from "./MintSeed.module.scss";

const MintSeed: FC = () => {
  const { data } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  useEffect(() => {
    // connect();
  }, [connect]);
  const [quantity, setQuantity] = useState<number>(0);
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(e.target.value));
  }, []);
  const handleSubmit = useCallback(() => {
    if (quantity <= 0) {
      alert("You can only mint one or more seeds, obviously.");
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
        {data ? (
          <Fragment>
            <button onClick={handleSubmit} disabled={!data}>
              Mint
            </button>
            <span className={styles.address}>{shortAddress(data.address)}</span>
          </Fragment>
        ) : (
          <button onClick={() => connect()}>Connect Wallet to Mint</button>
        )}
      </div>
    </div>
  );
};

export default MintSeed;
