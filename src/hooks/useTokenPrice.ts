import { MYOFTABI } from "@/constants/MyOFTABI";
import { useState, useEffect } from "react";
import Web3 from "web3";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export function useTokenPrice(tokenAddress: string, amount: string = "1") {
  const [price, setPrice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function calculatePrice() {
      if (typeof window.ethereum === "undefined") {
        setError("No Ethereum wallet detected");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();

        if (accounts.length === 0) {
          throw new Error("No account connected");
        }

        const contract = new web3.eth.Contract(MYOFTABI, tokenAddress);

        const amountInWei = web3.utils.toWei(amount, "ether");
        const priceInWei = await contract.methods
          .calculateCurvedMintReturn(amountInWei)
          .call();
        setPrice(web3.utils.fromWei(priceInWei, "ether"));
      } catch (err) {
        console.error("Error calculating token price:", err);
        setError("Failed to calculate token price");
      } finally {
        setLoading(false);
      }
    }

    if (amount) {
      calculatePrice();
    }
  }, [amount]);

  return { price, loading, error };
}
