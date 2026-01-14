import { WalletButton } from './WalletButton';

interface HeaderProps {
  isConnected: boolean;
  address?: string;
  balance?: string;
  onConnect: () => void;
  onDisconnect: () => void;
}

export const Header = ({
  isConnected,
  address,
  balance,
  onConnect,
  onDisconnect,
}: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-copper flex items-center justify-center">
            <span className="text-primary-foreground font-display font-bold text-lg">N</span>
          </div>
          <span className="font-display text-xl font-semibold tracking-tight text-foreground">
            Nexus
          </span>
        </div>

        {/* Network indicator + Wallet */}
        <div className="flex items-center gap-4">
          {isConnected && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted border border-border">
              <div className="w-2 h-2 rounded-full bg-success" />
              <span className="text-xs text-muted-foreground">Ethereum</span>
            </div>
          )}
          
          <WalletButton
            isConnected={isConnected}
            address={address}
            balance={balance}
            onConnect={onConnect}
            onDisconnect={onDisconnect}
          />
        </div>
      </div>
    </header>
  );
};
