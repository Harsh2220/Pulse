import TokenCard from "@/components/cards/TokenCard";
import BlurFade from "@/components/magicui/blur-fade";
import useAllTokens from "@/hooks/useAllTokens";
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

const BLUR_FADE_DELAY = 0.25;

export default function Home() {
  const { data, error, loading } = useAllTokens();

  const { searchText } = useSearchStore();
  const [cryptoList, setCryptoList] = useState<Token[]>(mockData);
  const filteredList = data && data.MyOFTFactory_Deploy.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(searchText.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 ease-in-out">
      <main className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredList.map((crypto, index) => (
          <BlurFade key={index} delay={BLUR_FADE_DELAY + index * 0.05} inView>
            <TokenCard crypto={crypto} />
          </BlurFade>
        ))}
      </main>
    </div>
  );
}
