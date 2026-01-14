import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { NFT } from '@/types/nft';
import { Button } from '@/components/ui/button';

interface NFTDetailModalProps {
  nft: NFT | null;
  isOpen: boolean;
  onClose: () => void;
  onTransfer?: (nft: NFT) => void;
}

export const NFTDetailModal = ({ nft, isOpen, onClose, onTransfer }: NFTDetailModalProps) => {
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    if (nft?.contractAddress) {
      await navigator.clipboard.writeText(nft.contractAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!nft) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-50 w-auto sm:max-w-4xl sm:w-full max-h-[90vh] overflow-auto rounded-xl border border-border bg-card shadow-elevated"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 p-2 rounded-full bg-muted/80 backdrop-blur-sm hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>

            <div className="grid md:grid-cols-2 gap-0">
              {/* Image */}
              <div className="aspect-square md:aspect-auto md:h-full">
                <img
                  src={nft.image}
                  alt={nft.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details */}
              <div className="p-6 md:p-8 space-y-6">
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">
                    {nft.collection}
                  </p>
                  <h2 className="font-display text-3xl font-semibold text-foreground">
                    {nft.name}
                  </h2>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {nft.description}
                </p>

                {/* Token Info */}
                <div className="space-y-3 pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Token ID</span>
                    <span className="text-sm font-mono text-foreground">#{nft.tokenId}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Owner</span>
                    <span className="text-sm font-mono text-primary">{nft.owner}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Contract</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-mono text-foreground/80 truncate max-w-[140px]">
                        {nft.contractAddress}
                      </span>
                      <button
                        onClick={copyAddress}
                        className="p-1 rounded hover:bg-muted transition-colors"
                      >
                        {copied ? (
                          <Check className="w-3.5 h-3.5 text-success" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <Button
                    variant="premium"
                    className="flex-1"
                    onClick={() => onTransfer?.(nft)}
                  >
                    Transfer
                  </Button>
                  <Button
                    variant="premium-outline"
                    onClick={() => window.open(`https://etherscan.io/token/${nft.contractAddress}`, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
