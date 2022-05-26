import React, { useEffect, useState, useCallback } from "react";

export const useEtherPrices = (): { usdPrice: number | null } => {
  const [usdPrice, setUsdPrice] = useState<number | null>(null);
  const fetchPrices = useCallback(async () => {
    const res = await fetch(
      "https://api.coinbase.com/v2/exchange-rates?currency=ETH"
    );
    const json = await res.json();
    const usd = json?.data?.rates?.USD;
    if (usd) {
      setUsdPrice(usd);
    }
  }, []);
  useEffect(() => {
    fetchPrices();
  }, [fetchPrices]);
  return { usdPrice };
};
