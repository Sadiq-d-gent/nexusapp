import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Loader2, Check, X, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TransactionStatus } from '@/types/nft';

interface MintFormProps {
  isConnected: boolean;
  onConnect: () => void;
}

export const MintForm = ({ isConnected, onConnect }: MintFormProps) => {
  const [quantity, setQuantity] = useState(1);
  const [txStatus, setTxStatus] = useState<TransactionStatus>({ status: 'idle' });

  const handleMint = async () => {
    setTxStatus({ status: 'pending', message: 'Awaiting confirmation...' });
    
    // Simulate transaction
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Randomly succeed or fail for demo
    if (Math.random() > 0.3) {
      setTxStatus({ 
        status: 'success', 
        message: 'NFT minted successfully!',
        hash: '0x1234...5678'
      });
    } else {
      setTxStatus({ 
        status: 'error', 
        message: 'Transaction failed. Please try again.'
      });
    }
  };

  const resetStatus = () => {
    setTxStatus({ status: 'idle' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-lg mx-auto"
    >
      <div className="text-center mb-10">
        <h2 className="font-display text-3xl font-semibold text-foreground mb-3">
          Mint New NFT
        </h2>
        <p className="text-muted-foreground">
          Create a new token from the Lumina Collection
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 space-y-6">
        {/* Preview */}
        <div className="aspect-video rounded-lg overflow-hidden bg-muted relative">
          <img
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80"
            alt="NFT Preview"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Collection</p>
            <p className="font-display text-lg text-foreground">Lumina Collection</p>
          </div>
        </div>

        {/* Quantity selector */}
        <div className="space-y-3">
          <label className="text-xs text-muted-foreground uppercase tracking-wider">
            Quantity
          </label>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 rounded-lg border border-border bg-muted flex items-center justify-center text-foreground hover:border-primary/50 transition-colors"
              disabled={quantity <= 1}
            >
              −
            </button>
            <span className="text-xl font-medium text-foreground w-8 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(Math.min(10, quantity + 1))}
              className="w-10 h-10 rounded-lg border border-border bg-muted flex items-center justify-center text-foreground hover:border-primary/50 transition-colors"
              disabled={quantity >= 10}
            >
              +
            </button>
          </div>
        </div>

        {/* Price breakdown */}
        <div className="space-y-2 py-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Price per item</span>
            <span className="text-foreground">0.08 ETH</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Est. gas fee</span>
            <span className="text-foreground">~0.002 ETH</span>
          </div>
          <div className="flex items-center justify-between text-base font-medium pt-2 border-t border-border">
            <span className="text-foreground">Total</span>
            <span className="text-primary">{(quantity * 0.08 + 0.002).toFixed(3)} ETH</span>
          </div>
        </div>

        {/* Transaction Status */}
        {txStatus.status !== 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-center gap-3 p-4 rounded-lg border ${
              txStatus.status === 'pending' ? 'status-pending border' :
              txStatus.status === 'success' ? 'status-success border' :
              'status-error border'
            }`}
          >
            {txStatus.status === 'pending' && <Loader2 className="w-5 h-5 animate-spin" />}
            {txStatus.status === 'success' && <Check className="w-5 h-5" />}
            {txStatus.status === 'error' && <AlertCircle className="w-5 h-5" />}
            <div className="flex-1">
              <p className="text-sm font-medium">{txStatus.message}</p>
              {txStatus.hash && (
                <p className="text-xs opacity-70 font-mono mt-0.5">Hash: {txStatus.hash}</p>
              )}
            </div>
            {txStatus.status !== 'pending' && (
              <button onClick={resetStatus} className="p-1 hover:opacity-70 transition-opacity">
                <X className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        )}

        {/* Mint Button */}
        {isConnected ? (
          <Button
            variant="premium"
            size="xl"
            className="w-full gap-2"
            onClick={handleMint}
            disabled={txStatus.status === 'pending'}
          >
            {txStatus.status === 'pending' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Minting...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Mint {quantity} NFT{quantity > 1 ? 's' : ''}
              </>
            )}
          </Button>
        ) : (
          <Button
            variant="premium"
            size="xl"
            className="w-full"
            onClick={onConnect}
          >
            Connect Wallet to Mint
          </Button>
        )}
      </div>
    </motion.div>
  );
};
