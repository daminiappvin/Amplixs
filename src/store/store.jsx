// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore,FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from "redux";
import clientIdReducer from './clientIdSlice.jsx';
import authReducer from './authSlice.jsx';
import userReducer from './userSlice.jsx';
const persistConfig = {
  key: 'root',
  storage,
}
const appReducer = combineReducers({
  client: clientIdReducer,
  auth:authReducer,
  user:userReducer
});
const rootReducer = (state, action) => {
  if (action.type === 'RESET_ALL') {
    return appReducer({ client: state.client }, action); 
  }
  return appReducer(state, action);
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer:persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
