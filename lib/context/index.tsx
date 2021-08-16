import { createContext, FC, useReducer, useEffect } from "react";

import { actions } from "./actions";

export const initialState: AppState & { dispatch: () => void } = {
  wallet: {
    working: false,
    enabled: false,
  },
  dispatch: (): void => {
    return;
  },
};

export const reducer = (
  state: AppState,
  action: AppReducerAction
): AppState => {
  switch (action.type) {
    case actions.UPDATE_WALLET:
      return {
        ...state,
        wallet: {
          ...state.wallet,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export const AppContext = createContext<AppContextType>(initialState);
export const AppContextProvider: FC = ({ children, ...rest }): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider
      {...rest}
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { actions } from "./actions";
