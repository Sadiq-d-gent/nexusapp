import { motion } from 'framer-motion';
import { NFT } from '@/types/nft';

interface NFTCardProps {
  nft: NFT;
  index: number;
  onClick: () => void;
}

export const NFTCard = ({ nft, index, onClick }: NFTCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="nft-card group cursor-pointer"
      onClick={onClick}
    >
      {/* Image container */}
      <div className="aspect-square overflow-hidden">
        <img
          src={nft.image}
          alt={nft.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">
          {nft.collection}
        </p>
        <h3 className="font-display text-lg font-medium text-foreground leading-tight">
          {nft.name}
        </h3>
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-muted-foreground">
            Token #{nft.tokenId}
          </span>
          <span className="text-xs text-primary/80 font-mono">
            {nft.owner}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
