import TokenCard from "@/components/cards/TokenCard";
import useSearchStore from "@/store/search";
import { Token } from "@/types/token";
import { motion } from "framer-motion";
import { useState } from "react";

const mockData: Token[] = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    price: 30000,
    change: 5.2,
    volume: 28000000000,
    marketCap: 580000000000,
    image: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    favorite: false,
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    price: 2000,
    change: -2.1,
    volume: 15000000000,
    marketCap: 240000000000,
    image: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    favorite: false,
  },
  {
    name: "Dogecoin",
    symbol: "DOGE",
    price: 0.08,
    change: 10.5,
    volume: 1200000000,
    marketCap: 10000000000,
    image: "https://cryptologos.cc/logos/dogecoin-doge-logo.png",
    favorite: false,
  },
  {
    name: "Ripple",
    symbol: "XRP",
    price: 0.5,
    change: -1.8,
    volume: 2000000000,
    marketCap: 25000000000,
    image: "https://cryptologos.cc/logos/xrp-xrp-logo.png",
    favorite: false,
  },
  {
    name: "Cardano",
    symbol: "ADA",
    price: 0.3,
    change: 3.7,
    volume: 800000000,
    marketCap: 10000000000,
    image: "https://cryptologos.cc/logos/cardano-ada-logo.png",
    favorite: false,
  },
  {
    name: "Polkadot",
    symbol: "DOT",
    price: 5,
    change: -0.9,
    volume: 500000000,
    marketCap: 6000000000,
    image: "https://cryptologos.cc/logos/polkadot-new-dot-logo.png",
    favorite: false,
  },
];
export default function Home() {
  const { searchText } = useSearchStore();
  const [cryptoList, setCryptoList] = useState<Token[]>(mockData);

  const toggleFavorite = (symbol: string) => {
    setCryptoList((prevList) =>
      prevList.map((crypto) =>
        crypto.symbol === symbol
          ? { ...crypto, favorite: !crypto.favorite }
          : crypto
      )
    );
  };

  const filteredList = cryptoList.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(searchText.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 ease-in-out">
      <main className="flex-grow container mx-auto p-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {filteredList.map((crypto) => (
            <TokenCard crypto={crypto} toggleFavorite={toggleFavorite} />
          ))}
        </motion.div>
      </main>
    </div>
  );
}
