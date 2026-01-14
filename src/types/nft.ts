export interface NFT {
  id: string;
  tokenId: string;
  name: string;
  description: string;
  image: string;
  collection: string;
  owner: string;
  contractAddress: string;
}

export interface TransactionStatus {
  status: 'idle' | 'pending' | 'success' | 'error';
  message?: string;
  hash?: string;
}

export type TabType = 'gallery' | 'mint' | 'transfer';
