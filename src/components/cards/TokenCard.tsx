import { Token } from "@/types/token";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function TokenCard({ crypto }: { crypto: Token }) {
  return (
    <Card className="overflow-hidden shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Avatar className="bg-secondary h-12 w-12">
              <AvatarImage src={crypto.image} />
              <AvatarFallback>{crypto.symbol}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-md font-medium">{crypto.name}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {crypto.symbol}
              </p>
            </div>
          </div>
          <p className="text-xl font-semibold">
            ${crypto.price.toLocaleString()}
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between items-center">
        {/* <p className="text-xl font-semibold">
            ${crypto.price.toLocaleString()}
          </p>
          <div>
            <p className="text-xs text-muted-foreground">Created by</p>
            <div className="flex items-center gap-1">
              <Avatar className="bg-secondary h-6 w-6">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>{crypto.symbol}</AvatarFallback>
              </Avatar>
              <p className="text-sm">Iggy</p>
            </div>
          </div> */}
      </CardContent>
    </Card>
  );
}
