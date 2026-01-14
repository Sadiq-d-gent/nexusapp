import { motion } from 'framer-motion';
import { ImageOff } from 'lucide-react';
import { NFT } from '@/types/nft';
import { NFTCard } from './NFTCard';

interface NFTGalleryProps {
  nfts: NFT[];
  isLoading: boolean;
  isConnected: boolean;
  onNFTClick: (nft: NFT) => void;
}

export const NFTGallery = ({ nfts, isLoading, isConnected, onNFTClick }: NFTGalleryProps) => {
  // Loading state
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-lg overflow-hidden">
            <div className="aspect-square skeleton" />
            <div className="p-4 space-y-3 bg-card">
              <div className="h-3 w-20 skeleton" />
              <div className="h-5 w-32 skeleton" />
              <div className="flex justify-between pt-2">
                <div className="h-3 w-16 skeleton" />
                <div className="h-3 w-20 skeleton" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Not connected state
  if (!isConnected) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-24 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-6">
          <ImageOff className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="font-display text-2xl font-medium text-foreground mb-2">
          Wallet Not Connected
        </h3>
        <p className="text-muted-foreground max-w-md">
          Connect your wallet to view your NFT collection. We support MetaMask, WalletConnect, and Coinbase Wallet.
        </p>
      </motion.div>
    );
  }

  // Empty state
  if (nfts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-24 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-6">
          <ImageOff className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="font-display text-2xl font-medium text-foreground mb-2">
          No NFTs Found
        </h3>
        <p className="text-muted-foreground max-w-md">
          Your wallet doesn't contain any NFTs yet. Explore collections or mint your first NFT.
        </p>
      </motion.div>
    );
  }

  // NFT Grid
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {nfts.map((nft, index) => (
        <NFTCard
          key={nft.id}
          nft={nft}
          index={index}
          onClick={() => onNFTClick(nft)}
        />
      ))}
    </div>
  );
};
