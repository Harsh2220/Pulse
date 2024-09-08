import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMintMyOFT } from "@/hooks/useMyOFT";
import useToken from "@/hooks/useTokens";
import { useState } from "react";
import { useAccount } from "wagmi";

export function Actions({
  contractAddress,
}: {
  contractAddress: `0x${string}`;
}) {
  const { token, loading, error } = useToken(contractAddress);
  const [amount, setAmount] = useState("");
  const { chainId, address, chain } = useAccount();
  const { isLoading, mint, hash } = useMintMyOFT(
    contractAddress,
    "base-sepolia"
  );
  const tokenSymbol = token?.symbol;

  console.log(token, "token", error);

  const handleAmountChange = (e: any) => {
    setAmount(e.target.value);
  };

  console.log("address", address);

  const handleBuy = async () => {
    if (!amount) return;

    try {
      console.log("chain", chain, chainId);

      const brrr = await mint(amount);
      console.log("hash", hash, brrr);
    } catch (err) {
      console.error("Error buying tokens:", err);
    }
  };
  return (
    <Tabs defaultValue="account">
      <TabsList className="grid w-full grid-cols-3" defaultValue="buy">
        <TabsTrigger value="buy">Buy</TabsTrigger>
        <TabsTrigger value="sell">Sell</TabsTrigger>
        <TabsTrigger value="transfer">Transfer</TabsTrigger>
      </TabsList>
      <TabsContent value="buy">
        <Card>
          <CardHeader>
            <CardTitle>{`Buy $${tokenSymbol}`}</CardTitle>
            <CardDescription>
              Enter the amount of ETH you want to spend to buy {token?.symbol}{" "}
              tokens.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="amount">Amount (ETH)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.0"
                value={amount}
                onChange={handleAmountChange}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              onClick={handleBuy}
              disabled={isLoading || !amount}
            >
              {isLoading ? "Buying..." : `Buy ${tokenSymbol}`}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="sell">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you&apos;ll be logged
              out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="transfer">
        <Card>
          <CardHeader>
            <CardTitle>Transfer</CardTitle>
            <CardDescription>
              Change your password here. After saving, you&apos;ll be logged
              out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
