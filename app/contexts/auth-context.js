import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { serverUrl } from '../utils/config'

const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_IN_WITH_WALLET: 'SIGN_IN_WITH_WALLET',
  SIGN_OUT: 'SIGN_OUT',
  SIGN_OUT_WALLET: 'SIGN_OUT_WALLET'
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  wallet: null
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...(
        // if payload (user) is provided, then is authenticated
        user
          ? ({
            isAuthenticated: true,
            isLoading: false,
            user
          })
          : ({
            isLoading: false
          })
      )
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
      wallet: null
    };
  },
  [HANDLERS.SIGN_IN_WITH_WALLET]:(state, action) =>{
    return {
      ...state,
      isAuthenticated: true,
      user: null,
      wallet: action.payload.wallet
    }
  }
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      isAuthenticated = window.sessionStorage.getItem('authenticated') === 'true';
    } catch (err) {
      console.error(err);
    }

    if (isAuthenticated) {

      const user = {
        id: '5e86809283e28b96d2d38537',
        avatar: '/assets/avatars/avatar-anika-visser.png',
        name: 'Anika Visser',
        email: 'anika.visser@devias.io'
      };

      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: user
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE
      });
    }
  };

  useEffect(
    () => {
      initialize();
      const user = localStorage.getItem('quanmed_user')
      const data = JSON.parse(user)
      if(data){
        console.log('auth provider')
        setUser(data)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const skip = () => {
    try {
      window.sessionStorage.setItem('authenticated', 'true');
    } catch (err) {
      console.error(err);
    }

    const user = {
      id: '5e86809283e28b96d2d38537',
      avatar: '/assets/avatars/avatar-anika-visser.png',
      name: 'Anika Visser',
      email: 'anika.visser@devias.io'
    };

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user
    });
  };

  const signIn = async (email, password) => {
    // if (email !== 'demo@devias.io' || password !== 'Password123!') {
    //   throw new Error('Please check your email and password');
    // }
    let res = null
    try{
      res = await axios.post(`${serverUrl}/api/v1/auth/login`, { email, password })
    }catch(err) {
      throw new Error('Please check your email and password');
    }

    try {
      window.sessionStorage.setItem('authenticated', 'true');
      localStorage.setItem('quanmed_token', res.data.result.token)
    } catch (err) {
      console.error(err);
    }

    // console.log(res.data.user.name, " ", res.data.user.email)

    const _user = JSON.parse(res.data.result.user)

    const user = {
      id: '947958739485739288725',
      avatar: '/assets/avatars/avatar-anika-visser.png',
      // name: res.data.user.name,
      name: _user.name,
      // email: res.data.user.email
      email: _user.email
    };

    localStorage.setItem('quanmed_user', JSON.stringify(user))

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user
    });
  };

  const signinWithWallet = (wallet) => {
    window.sessionStorage.setItem('authenticated', 'true');
    window.sessionStorage.setItem('wallet', wallet);
    dispatch({
      type: HANDLERS.SIGN_IN_WITH_WALLET,
      payload: {
        wallet: wallet
      }
    })
  }

  const setUser = (user) => {
    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user
    });
  }

  const signUp = async (email, name, password) => {
    try{
      const res = await axios.post(`${serverUrl}/api/v1/auth/register`, { email, name, password });
    }catch(err) {
      throw new Error('Please check your email and password');
    }
  };

  const signOut = () => {
    window.sessionStorage.removeItem('authenticated');
    window.sessionStorage.removeItem('wallet');
    dispatch({
      type: HANDLERS.SIGN_OUT
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        skip,
        signIn,
        signinWithWallet,
        signUp,
        signOut,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
