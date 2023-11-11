"use client";
import * as React from "react";
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
  metaMaskWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
  goerli,
  sepolia,
  hardhat,
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { UserProvider } from "@/Context/UserProvider";
import { MoralisProvider } from "react-moralis";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, base, zora, sepolia, hardhat],
  [
    alchemyProvider({
      apiKey: "5XnurvtEOmmKWf2Aattemfs8MWQBDkCU",
      stallTimeout: 1_000,
    }),
    publicProvider(),
  ]
);

const projectId = "28479ee26cf6e63331047e3525637362";

const { wallets } = getDefaultWallets({
  appName: "NFT Nexus",
  projectId,
  chains,
});

const demoAppInfo = {
  appName: "NFT Nexus",
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
      metaMaskWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export function Providers({ children }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <MoralisProvider initializeOnMount={false}>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains} appInfo={demoAppInfo}>
          <UserProvider>{mounted && children}</UserProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </MoralisProvider>
  );
}
