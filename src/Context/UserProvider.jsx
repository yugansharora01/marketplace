import { AuthConstants } from "@/Constants/Constants";
import { createContext, useContext, useReducer } from "react";

export const User = createContext();

export const useUser = () => useContext(User);

const reducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case AuthConstants.LOGIN_SUCCESS: {
      return {
        ...state,
        userState: {
          authenticated: true,
          ...state.userState,
        },
        userData: action.payload.data,
      };
    }
    case AuthConstants.LOGIN_FAILURE: {
      return {
        ...state,
        userState: {
          authenticated: false,
          error: action.payload,
          ...state.userState,
        },
      };
    }
    case AuthConstants.LOGOUT: {
      return {
        ...state,
        userState: {
          authenticated: false,
          ...state.userState,
        },
        userData: {},
      };
    }
    default: {
      return state;
    }
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    userState: {
      authenticated: false,
      error: null,
    },
    userData: {},
  });

  return <User.Provider value={[state, dispatch]}>{children}</User.Provider>;
};
