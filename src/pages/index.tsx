import TokenCard from "@/components/cards/TokenCard";
import BlurFade from "@/components/magicui/blur-fade";
import useAllTokens from "@/hooks/useAllTokens";
import useSearchStore from "@/store/search";
import { Token } from "@/types/token";
import { motion } from "framer-motion";
import { useState } from "react";

const BLUR_FADE_DELAY = 0.25;

export default function Home() {
  const { data, error, loading } = useAllTokens();
  const { searchText } = useSearchStore();
  const [cryptoList, setCryptoList] = useState<Token[]>(mockData);
  const filteredList =
    data &&
    data.MyOFTFactory_Deploy.filter(
      (crypto) =>
        crypto.name.toLowerCase().includes(searchText.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(searchText.toLowerCase())
    );

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 ease-in-out">
      <main className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data &&
          filteredList.map((crypto, index) => (
            <BlurFade key={index} delay={BLUR_FADE_DELAY + index * 0.05} inView>
              <TokenCard crypto={crypto} />
            </BlurFade>
          ))}
      </main>
    </div>
  );
}
