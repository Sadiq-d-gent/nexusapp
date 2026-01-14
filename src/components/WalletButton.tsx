import { motion } from 'framer-motion';
import { Wallet, ChevronDown, Copy, Check, ExternalLink, LogOut } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface WalletButtonProps {
  isConnected: boolean;
  address?: string;
  balance?: string;
  onConnect: () => void;
  onDisconnect: () => void;
}

export const WalletButton = ({
  isConnected,
  address,
  balance,
  onConnect,
  onDisconnect,
}: WalletButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isConnected) {
    return (
      <Button
        variant="premium"
        onClick={onConnect}
        className="gap-2"
      >
        <Wallet className="w-4 h-4" />
        Connect Wallet
      </Button>
    );
  }

  return (
    <div className="relative">
      <Button
        variant="premium-outline"
        onClick={() => setIsOpen(!isOpen)}
        className="gap-2"
      >
        <div className="w-2 h-2 rounded-full bg-success animate-pulse-subtle" />
        <span className="font-mono text-sm">{truncateAddress(address || '')}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)} 
          />
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-64 z-50 rounded-lg border border-border bg-card p-4 shadow-elevated"
          >
            <div className="space-y-4">
              {/* Balance */}
              <div className="text-center pb-3 border-b border-border">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Balance</p>
                <p className="text-xl font-display font-semibold text-foreground">{balance || '0.00'} ETH</p>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Address</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-xs font-mono text-foreground/80 bg-muted px-2 py-1.5 rounded truncate">
                    {address}
                  </code>
                  <button
                    onClick={copyAddress}
                    className="p-1.5 rounded hover:bg-muted transition-colors"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-success" />
                    ) : (
                      <Copy className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => window.open(`https://etherscan.io/address/${address}`, '_blank')}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Explorer
                </button>
                <button
                  onClick={() => {
                    onDisconnect();
                    setIsOpen(false);
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs text-destructive hover:text-destructive/80 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Disconnect
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};
