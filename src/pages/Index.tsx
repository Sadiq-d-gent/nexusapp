import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { NavigationTabs } from '@/components/NavigationTabs';
import { NFTGallery } from '@/components/NFTGallery';
import { NFTDetailModal } from '@/components/NFTDetailModal';
import { MintForm } from '@/components/MintForm';
import { TransferForm } from '@/components/TransferForm';
import { mockNFTs } from '@/data/mock-nfts';
import { NFT, TabType } from '@/types/nft';

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabType>('gallery');
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transferNFT, setTransferNFT] = useState<NFT | null>(null);

  // Mock wallet data
  const mockAddress = '0x1234567890abcdef1234567890abcdef12345678';
  const mockBalance = '2.847';

  const handleConnect = useCallback(() => {
    setIsLoading(true);
    // Simulate connection delay
    setTimeout(() => {
      setIsConnected(true);
      setIsLoading(false);
    }, 1500);
  }, []);

  const handleDisconnect = useCallback(() => {
    setIsConnected(false);
  }, []);

  const handleNFTClick = useCallback((nft: NFT) => {
    setSelectedNFT(nft);
    setIsModalOpen(true);
  }, []);

  const handleTransferFromModal = useCallback((nft: NFT) => {
    setIsModalOpen(false);
    setTransferNFT(nft);
    setActiveTab('transfer');
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'gallery':
        return (
          <NFTGallery
            nfts={isConnected ? mockNFTs : []}
            isLoading={isLoading}
            isConnected={isConnected}
            onNFTClick={handleNFTClick}
          />
        );
      case 'mint':
        return (
          <MintForm
            isConnected={isConnected}
            onConnect={handleConnect}
          />
        );
      case 'transfer':
        return (
          <TransferForm
            isConnected={isConnected}
            nfts={mockNFTs}
            preSelectedNFT={transferNFT}
            onConnect={handleConnect}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        isConnected={isConnected}
        address={mockAddress}
        balance={mockBalance}
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
      />

      <main className="container mx-auto px-6 py-8">
        {/* Page header */}
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-3"
          >
            Digital Assets
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
            Manage your NFT collection with precision and elegance
          </motion.p>
        </div>

        {/* Navigation tabs */}
        <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Tab content */}
        <div className="py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderTabContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* NFT Detail Modal */}
      <NFTDetailModal
        nft={selectedNFT}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTransfer={handleTransferFromModal}
      />

      {/* Footer */}
      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-primary to-copper flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-xs">N</span>
              </div>
              <span className="font-display">Nexus</span>
            </div>
            <p>Premium NFT Management Platform</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
