interface AppState {
  wallet: {
    working: boolean;
    enabled: boolean;
    address?: string;
    utxos?: string[];
    balance?: number;
  }
}

interface AppReducerAction {
  type: string;
  payload: any;
}

interface AppContextType {
  state?: DefaultAppState;
  dispatch: (action: AppReducerAction) => void;
}
