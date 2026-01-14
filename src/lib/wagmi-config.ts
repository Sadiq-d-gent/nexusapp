import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, optimism, arbitrum, sepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'NFT Asset Platform',
  projectId: 'demo-project-id', // Replace with actual WalletConnect project ID for production
  chains: [mainnet, polygon, optimism, arbitrum, sepolia],
  ssr: false,
});
