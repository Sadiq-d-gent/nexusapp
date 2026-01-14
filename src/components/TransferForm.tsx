import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, Check, X, AlertCircle, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NFT, TransactionStatus } from '@/types/nft';

interface TransferFormProps {
  isConnected: boolean;
  nfts: NFT[];
  preSelectedNFT?: NFT | null;
  onConnect: () => void;
}

export const TransferForm = ({ isConnected, nfts, preSelectedNFT, onConnect }: TransferFormProps) => {
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(preSelectedNFT || null);
  const [recipientAddress, setRecipientAddress] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [txStatus, setTxStatus] = useState<TransactionStatus>({ status: 'idle' });

  const isValidAddress = recipientAddress.match(/^0x[a-fA-F0-9]{40}$/);

  const handleTransfer = async () => {
    if (!showConfirmation) {
      setShowConfirmation(true);
      return;
    }

    setTxStatus({ status: 'pending', message: 'Awaiting confirmation...' });
    setShowConfirmation(false);

    // Simulate transaction
    await new Promise(resolve => setTimeout(resolve, 2500));

    if (Math.random() > 0.2) {
      setTxStatus({
        status: 'success',
        message: 'Transfer completed successfully!',
        hash: '0xabcd...efgh'
      });
      setSelectedNFT(null);
      setRecipientAddress('');
    } else {
      setTxStatus({
        status: 'error',
        message: 'Transaction failed. Please try again.'
      });
    }
  };

  const resetStatus = () => {
    setTxStatus({ status: 'idle' });
    setShowConfirmation(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-lg mx-auto"
    >
      <div className="text-center mb-10">
        <h2 className="font-display text-3xl font-semibold text-foreground mb-3">
          Transfer NFT
        </h2>
        <p className="text-muted-foreground">
          Send an NFT to another wallet address
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 space-y-6">
        {/* NFT Selector */}
        <div className="space-y-3">
          <label className="text-xs text-muted-foreground uppercase tracking-wider">
            Select NFT
          </label>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg border border-border bg-muted text-left hover:border-primary/50 transition-colors"
              disabled={!isConnected || nfts.length === 0}
            >
              {selectedNFT ? (
                <div className="flex items-center gap-3">
                  <img
                    src={selectedNFT.image}
                    alt={selectedNFT.name}
                    className="w-10 h-10 rounded object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium text-foreground">{selectedNFT.name}</p>
                    <p className="text-xs text-muted-foreground">#{selectedNFT.tokenId}</p>
                  </div>
                </div>
              ) : (
                <span className="text-muted-foreground">
                  {!isConnected ? 'Connect wallet first' : nfts.length === 0 ? 'No NFTs available' : 'Choose an NFT'}
                </span>
              )}
              <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && nfts.length > 0 && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 right-0 mt-2 z-50 rounded-lg border border-border bg-card shadow-elevated max-h-60 overflow-auto"
                >
                  {nfts.map((nft) => (
                    <button
                      key={nft.id}
                      onClick={() => {
                        setSelectedNFT(nft);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted transition-colors ${
                        selectedNFT?.id === nft.id ? 'bg-muted' : ''
                      }`}
                    >
                      <img
                        src={nft.image}
                        alt={nft.name}
                        className="w-10 h-10 rounded object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-foreground">{nft.name}</p>
                        <p className="text-xs text-muted-foreground">{nft.collection} · #{nft.tokenId}</p>
                      </div>
                    </button>
                  ))}
                </motion.div>
              </>
            )}
          </div>
        </div>

        {/* Recipient Address */}
        <div className="space-y-3">
          <label className="text-xs text-muted-foreground uppercase tracking-wider">
            Recipient Address
          </label>
          <input
            type="text"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            placeholder="0x..."
            className="input-premium font-mono text-sm"
            disabled={!isConnected}
          />
          {recipientAddress && !isValidAddress && (
            <p className="text-xs text-destructive">Please enter a valid Ethereum address</p>
          )}
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

        {/* Confirmation Step */}
        {showConfirmation && selectedNFT && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 rounded-lg border border-warning/50 bg-warning/5"
          >
            <p className="text-sm text-foreground font-medium mb-3">Confirm Transfer</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">NFT</span>
                <span className="text-foreground">{selectedNFT.name} #{selectedNFT.tokenId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">To</span>
                <span className="text-foreground font-mono text-xs">{recipientAddress.slice(0, 10)}...{recipientAddress.slice(-8)}</span>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button variant="ghost" size="sm" className="flex-1" onClick={() => setShowConfirmation(false)}>
                Cancel
              </Button>
              <Button variant="premium" size="sm" className="flex-1" onClick={handleTransfer}>
                Confirm
              </Button>
            </div>
          </motion.div>
        )}

        {/* Transfer Button */}
        {!showConfirmation && (
          isConnected ? (
            <Button
              variant="premium"
              size="xl"
              className="w-full gap-2"
              onClick={handleTransfer}
              disabled={!selectedNFT || !isValidAddress || txStatus.status === 'pending'}
            >
              {txStatus.status === 'pending' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Transferring...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Transfer NFT
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
              Connect Wallet to Transfer
            </Button>
          )
        )}
      </div>
    </motion.div>
  );
};
