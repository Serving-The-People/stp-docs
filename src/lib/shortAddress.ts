import { utils } from "ethers";

export function shortAddress(address: string): string {
  if (utils.isAddress(address)) {
    if (!address.startsWith("0x")) {
      address = "0x" + address;
    }
    return address.slice(0, 6) + "…" + address.slice(address.length - 4);
  }
  return "";
}
