interface Window {
  cardano?: {
    isEnabled: () => Promise<boolean>;
    getUsedAddresses: () => Promise<string[]>
  }
}
