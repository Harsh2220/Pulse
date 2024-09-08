import { tssLib } from "@toruslabs/tss-dkls-lib";
import { CHAIN_NAMESPACES, CustomChainConfig } from "@web3auth/base";
import { EthereumSigningProvider } from "@web3auth/ethereum-mpc-provider";
import {
    makeEthereumSigner,
    WEB3AUTH_NETWORK,
    Web3AuthMPCCoreKit
} from "@web3auth/mpc-core-kit";
import { optimismSepolia, sepolia } from "viem/chains";

const web3AuthClientId = process.env.NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID!;

export const verifier = process.env.NEXT_PUBLIC_VERIFIER;

export let coreKitInstance: Web3AuthMPCCoreKit;
export let evmProvider: EthereumSigningProvider;

if (typeof window !== "undefined") {
    const chainConfig: CustomChainConfig = {
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        chainId: `0x${optimismSepolia.id.toString(16)}`,
        rpcTarget: optimismSepolia.rpcUrls.default.http[0],
    };

    coreKitInstance = new Web3AuthMPCCoreKit({
        web3AuthClientId,
        web3AuthNetwork: WEB3AUTH_NETWORK.DEVNET,
        storage: window.localStorage,
        manualSync: true,
        tssLib: {
            keyType: tssLib.keyType,
            lib: tssLib
        },
    });

    evmProvider = new EthereumSigningProvider({ config: { chainConfig } });
    evmProvider.setupProvider(makeEthereumSigner(coreKitInstance));
}
