import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { SUPPORTED_CHAINS } from "@/constants/helper";
import { app } from "@/lib/firebase";
import { coreKitInstance, getWeb3AuthInstance, verifier } from "@/lib/web3Auth";
import useSearchStore from "@/store/search";
import useUserStore from "@/store/user";
import {
  COREKIT_STATUS,
  JWTLoginParams,
  parseToken,
} from "@web3auth/mpc-core-kit";
import {
  GoogleAuthProvider,
  UserCredential,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import {
  Coins,
  LogOutIcon,
  MoonIcon,
  SearchIcon,
  SunIcon,
  UserIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export default function Navbar() {
  const { setSearchText, searchText } = useSearchStore();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { connectors, connect, connectAsync } = useConnect();
  const { disconnect } = useDisconnect();
  const { isConnected } = useAccount();
  const router = useRouter();
  const pathname = usePathname();
  const [coreKitStatus, setCoreKitStatus] = useState<COREKIT_STATUS>(
    COREKIT_STATUS.NOT_INITIALIZED
  );

  const Web3AuthInstance = getWeb3AuthInstance(SUPPORTED_CHAINS);

  const { setUser, user, address, setAddress } = useUserStore();

  async function handleUserData() {
    try {
      if (!Web3AuthInstance.connected) return;
      console.log(Web3AuthInstance.status, "user");

      setUser(user);
    } catch (error) {
      console.log(error);
    }
  }

  async function initCoreKitInstance() {
    try {
      await coreKitInstance.init();
      setCoreKitStatus(coreKitInstance.status);
      handleUserData();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setMounted(true);
    initCoreKitInstance();
  }, []);

  const signInWithGoogle = async (): Promise<UserCredential> => {
    try {
      const auth = getAuth(app);
      const googleProvider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, googleProvider);
      return res;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const login = async () => {
    try {
      if (!Web3AuthInstance) {
        throw new Error("initiated to login");
      }
      // const loginRes = await signInWithGoogle();
      // const idToken = await loginRes.user.getIdToken(true);
      // const parsedToken = parseToken(idToken);

      // const idTokenLoginParams = {
      //   verifier,
      //   verifierId: parsedToken.sub,
      //   idToken,
      // } as JWTLoginParams;

      // await coreKitInstance.loginWithJWT(idTokenLoginParams);
      // if (coreKitInstance.status === COREKIT_STATUS.LOGGED_IN) {
      //   await coreKitInstance.commitChanges();
      // }

      // if (coreKitInstance.status === COREKIT_STATUS.REQUIRED_SHARE) {
      // }

      // setCoreKitStatus(coreKitInstance.status);
      const result = await connectAsync({ connector: connectors[2] });
      console.log("rsult", result);

      handleUserData();
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    disconnect();
    if (!Web3AuthInstance.connected) return;

    await Web3AuthInstance.logout();
  };

  if (!mounted) return null;

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img
                src="https://pump.fun/_next/image?url=/logo.png&w=64&q=75"
                alt="CryptoPump Logo"
                width={32}
                height={32}
                className="mr-2"
              />
              <span className="sr-only">Pulse</span>
            </Link>
          </div>
          {pathname === "/profile" || pathname === "/" ? (
            <div className="flex-1 max-w-xl mx-auto">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="pl-10 w-full"
                  placeholder="Search cryptocurrencies..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
            </div>
          ) : null}
          <div className="flex items-center">
            {isConnected ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <img
                      src={user?.picture}
                      alt="User Avatar"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <span className="sr-only">Open user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                    className="cursor-pointer"
                  >
                    {theme === "dark" ? (
                      <SunIcon className="mr-2 h-4 w-4" />
                    ) : (
                      <MoonIcon className="mr-2 h-4 w-4" />
                    )}
                    {theme === "dark" ? "Light Mode" : "Dark Mode"}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      router.push("/token/create");
                    }}
                    className="cursor-pointer"
                  >
                    <Coins className="mr-2 h-4 w-4" />
                    Create token
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      router.push("/profile");
                    }}
                    className="cursor-pointer"
                  >
                    <UserIcon className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={logout}>
                    <LogOutIcon className="mr-2 h-4 w-4" />
                    Disconnect
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={login}>Connect</Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
