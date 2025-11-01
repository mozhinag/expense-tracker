import axios from 'axios';
import { createContext, useReducer } from 'react';
import AppReducer from './AppReduer';
// InitialState
const initialState = {
  transactions: [],
  error: null,
  loading: true,
};

// Create context

export const GlobalContext = createContext(initialState);

//Provider Component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //Actions
  async function getTransactions() {
    try {
      const res = await axios.get('/api/transactions');
      dispatch({
        type: 'GET_TRANSACTION',
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: error.response.data.error,
      });
    }
  }
  async function deleteTransaction(id) {
    try {
      await axios.delete(`/api/transactions/${id}`);
      dispatch({
        type: 'DELETE_TRANSACTION',
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: error.response.data.error,
      });
    }
  }

  async function addTransaction(transaction) {
    const config = {
      headers: {
        ' Content_type': 'aplication/json',
      },
    };
    try {
      const res = await axios.post('/api/transactions', transaction, config);

      dispatch({
        type: 'ADD_TRANSACTION',
        payload: res.data.data,
      });
    } catch (error) {
       dispatch({
         type: 'TRANSACTION_ERROR',
         payload: error.response.data.error,
       });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        getTransactions,
        deleteTransaction,
        addTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
