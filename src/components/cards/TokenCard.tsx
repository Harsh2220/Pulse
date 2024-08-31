import { Token } from "@/types/token";
import { motion } from "framer-motion";
import { ArrowDownIcon, ArrowUpIcon, StarIcon } from "lucide-react";
import { Area, AreaChart } from "recharts";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";

const chartData = [
  { month: "January", mobile: 80 },
  { month: "February", mobile: 200 },
  { month: "March", mobile: 400 },
  { month: "April", mobile: 190 },
  { month: "May", mobile: 130 },
  { month: "June", mobile: 140 },
];

const chartConfig = {
  mobile: {
    label: "Mobile",
  },
} satisfies ChartConfig;

export default function TokenCard({
  crypto,
  toggleFavorite,
}: {
  crypto: Token;
  toggleFavorite: (symbol: string) => void;
}) {
  return (
    <motion.div
      key={crypto.symbol}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden transition-shadow duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img
                src={crypto.image}
                alt={`${crypto.name} logo`}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <span className="font-bold">{crypto.name}</span>
                <span className="text-sm text-muted-foreground ml-2">
                  ({crypto.symbol})
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleFavorite(crypto.symbol)}
              className={`${
                crypto.favorite ? "text-yellow-500" : "text-muted-foreground"
              } hover:text-yellow-500 transition-colors duration-200`}
            >
              <StarIcon className="h-5 w-5" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 m-0">
          <div className="flex gap-2 mb-4 px-6">
            <p className="text-3xl font-bold">
              ${crypto.price.toLocaleString()}
            </p>
            <div
              className={`flex items-center mt-1 px-1 py-0 text-xs leading-3 rounded-lg ${
                crypto.change >= 0
                  ? "text-green-500 bg-green-500 bg-opacity-10"
                  : "text-red-500 bg-red-500 bg-opacity-10"
              }`}
            >
              {crypto.change >= 0 ? (
                <ArrowUpIcon className="mr-1 h-3 w-3" />
              ) : (
                <ArrowDownIcon className="mr-1 h-3 w-3" />
              )}
              <span className="font-semibold">{Math.abs(crypto.change)}%</span>
            </div>
          </div>
          <ChartContainer config={chartConfig} className="h-24 w-full">
            <AreaChart accessibilityLayer data={chartData}>
              <Area
                className="bg-red-300"
                dataKey="mobile"
                type="bumpX"
                fill={
                  crypto.change >= 0
                    ? "hsl(var(--chart-2))"
                    : "hsl(var(--chart-1))"
                }
                fillOpacity={0.4}
                stroke={
                  crypto.change >= 0
                    ? "hsl(var(--chart-2))"
                    : "hsl(var(--chart-1))"
                }
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}
