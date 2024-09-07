import TokenCard from "@/components/cards/TokenCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Token } from "@/types/token";
import { motion } from "framer-motion";
import { CheckIcon, CopyIcon, EditIcon } from "lucide-react";
import { useState } from "react";

export default function Profile() {
  const [user, setUser] = useState({
    username: "CryptoWhale",
    avatarUrl: "/placeholder.svg?height=128&width=128",
    walletAddress: "0x1234...5678",
    tokens: [
      {
        name: "WhaleToken",
        symbol: "WHL",
        price: 0.5,
        change: 5.2,
        volume: 1000000,
        marketCap: 500000,
        image: "/placeholder.svg?height=50&width=50",
        favorite: false,
      },
      {
        name: "OceanCoin",
        symbol: "OCN",
        price: 0.1,
        change: -2.1,
        volume: 500000,
        marketCap: 50000,
        image: "/placeholder.svg?height=50&width=50",
        favorite: true,
      },
      {
        name: "CoralReef",
        symbol: "CRL",
        price: 0.05,
        change: 10.5,
        volume: 750000,
        marketCap: 37500,
        image: "/placeholder.svg?height=50&width=50",
        favorite: false,
      },
    ] as Token[],
  });

  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(user.walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Avatar className="w-32 h-32">
              <AvatarImage src={user.avatarUrl} alt={user.username} />
              <AvatarFallback>
                {user.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2 text-center sm:text-left flex-grow">
              <div className="flex items-center justify-center sm:justify-start">
                {isEditing ? (
                  <Input
                    value={user.username}
                    onChange={(e) =>
                      setUser({ ...user, username: e.target.value })
                    }
                    className="text-2xl font-bold"
                  />
                ) : (
                  <h2 className="text-2xl font-bold">{user.username}</h2>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-2"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <EditIcon className="h-4 w-4" />
                  <span className="sr-only">
                    {isEditing ? "Save" : "Edit"} username
                  </span>
                </Button>
              </div>
              <div className="flex items-center justify-center sm:justify-start text-muted-foreground">
                <code className="bg-muted px-2 py-1 rounded text-sm">
                  {user.walletAddress}
                </code>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-2"
                  onClick={copyToClipboard}
                >
                  {copied ? (
                    <CheckIcon className="h-4 w-4 text-green-500" />
                  ) : (
                    <CopyIcon className="h-4 w-4" />
                  )}
                  <span className="sr-only">Copy wallet address</span>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, staggerChildren: 0.1 }}
      >
        {user.tokens.map((token, index) => (
          <TokenCard key={index} crypto={token} />
        ))}
      </motion.div>
    </div>
  );
}
