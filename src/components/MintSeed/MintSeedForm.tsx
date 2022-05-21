import React, { FC, useState, useCallback, ChangeEvent, Fragment } from "react";
import { constants } from "ethers";
import { useAccount, useConnect, useBalance } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { shortAddress } from "../../lib/shortAddress";
import { useSeedsContract } from "../../hooks/useMintSeed";
import styles from "./MintSeed.module.scss";

const MintSeed: FC = () => {
  const { data: address } = useAccount();
  const { data: balance } = useBalance({ addressOrName: address?.address });
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const seedsContract = useSeedsContract();
  const [quantity, setQuantity] = useState<number>(0);
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(e.target.value));
  }, []);
  const handleSubmit = useCallback(async () => {
    if (quantity <= 0) {
      alert("You can only mint one or more seeds, obviously.");
    } else {
      const tx = await seedsContract.mint(`${quantity}`);
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
        {address ? (
          <Fragment>
            <button onClick={handleSubmit} disabled={!address}>
              Mint
            </button>
            <span className={styles.address}>
              {shortAddress(address.address)}
            </span>
          </Fragment>
        ) : (
          <button onClick={() => connect()}>Connect Wallet to Mint</button>
        )}
      </div>
      <div className={styles.balanceRow}>
        <div>
          Price:{" "}
          {`${constants.EtherSymbol} ${Math.max(0, quantity * 0.1).toFixed(1)}`}
        </div>
      </div>
    </div>
  );
};

export default MintSeed;
