import BlurFade from "@/components/magicui/blur-fade";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { MultiSelect } from "@/components/ui/multi-select";
import useCreateTokenStore from "@/store/create-token";
import { Label } from "@radix-ui/react-label";

const BLUR_FADE_DELAY = 0.04;

const supportedChains = [
  { value: "eth-sepolia", label: "Eth sepolia" },
  { value: "base-sepolia", label: "Base sepolia" },
  { value: "optimism-sepolia", label: "Optimism sepolia" },
];

export default function CreateProfile() {
  const { chains, setChains, setName, setSupply, setSymbol } =
    useCreateTokenStore();

  return (
    <section className="w-full min-h-[calc(100vh-65px)] flex justify-center items-center">
      <BlurFade delay={BLUR_FADE_DELAY * 4} inView>
        <Card className="w-[400px]">
          <CardHeader>
            <BlurFade delay={BLUR_FADE_DELAY * 4} inView>
              <CardTitle>Create Token</CardTitle>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 5} inView>
              <CardDescription>Create your token in one-click.</CardDescription>
            </BlurFade>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col w-full justify-center gap-4">
                <BlurFade delay={BLUR_FADE_DELAY * 6} inView>
                  <Avatar className="w-20 h-20 mx-auto">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </BlurFade>
                <BlurFade
                  delay={BLUR_FADE_DELAY * 7}
                  inView
                  className="flex flex-col space-y-1.5"
                >
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter name"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </BlurFade>
                <BlurFade
                  delay={BLUR_FADE_DELAY * 9}
                  inView
                  className="flex items-center gap-4"
                >
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="symbol">Symbol</Label>
                    <Input
                      id="symbol"
                      placeholder="Enter symbol"
                      onChange={(e) => {
                        setSymbol(e.target.value);
                      }}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="supply">Supply</Label>
                    <Input
                      type="number"
                      id="supply"
                      min={1}
                      placeholder="Enter supply"
                      onChange={(e) => {
                        setSupply(e.target.value);
                      }}
                    />
                  </div>
                </BlurFade>
                <BlurFade
                  delay={BLUR_FADE_DELAY * 9}
                  inView
                  className="flex flex-col space-y-1.5"
                >
                  <Label htmlFor="chain">Select chain</Label>
                  <MultiSelect
                    id="chain"
                    options={supportedChains}
                    onValueChange={setChains}
                    defaultValue={chains}
                    placeholder="Select frameworks"
                    variant="inverted"
                    animation={2}
                    maxCount={3}
                  />
                </BlurFade>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <BlurFade delay={BLUR_FADE_DELAY * 10} inView className="w-full">
              <Button className="w-full">Create</Button>
            </BlurFade>
          </CardFooter>
        </Card>
      </BlurFade>
    </section>
  );
}
