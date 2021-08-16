interface BlockFrostUTXO {
  tx_hash: string;
  output_index: number;
  amount: {
    unit: string;
    quantity: string;
  }[],
  block: string;
}
