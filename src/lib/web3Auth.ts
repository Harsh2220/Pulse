import { tssLib } from "@toruslabs/tss-dkls-lib";
import { EthereumSigningProvider } from "@web3auth/ethereum-mpc-provider";
import {
    COREKIT_STATUS,
    generateFactorKey,
    JWTLoginParams,
    keyToMnemonic,
    makeEthereumSigner,
    mnemonicToKey,
    parseToken,
    TssShareType,
    WEB3AUTH_NETWORK,
    Web3AuthMPCCoreKit,
} from "@web3auth/mpc-core-kit";
import { CHAIN_NAMESPACES } from "@web3auth/base";

const web3AuthClientId = process.env.NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID!;

export const verifier = process.env.NEXT_PUBLIC_VERIFIER;

export let coreKitInstance: Web3AuthMPCCoreKit;
export let evmProvider: EthereumSigningProvider;

if (typeof window !== "undefined") {
    const chainConfig = {
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        chainId: "0x1",
        rpcTarget: "https://rpc.ankr.com/eth",
        displayName: "Ethereum Mainnet",
        blockExplorer: "https://etherscan.io/",
        ticker: "ETH",
        tickerName: "Ethereum",
    };

    coreKitInstance = new Web3AuthMPCCoreKit({
        web3AuthClientId,
        web3AuthNetwork: WEB3AUTH_NETWORK.MAINNET,
        storage: window.localStorage,
        manualSync: true,
        tssLib: tssLib,
    });

    evmProvider = new EthereumSigningProvider({ config: { chainConfig } });
    evmProvider.setupProvider(makeEthereumSigner(coreKitInstance));
}

