import { configureStore, combineReducers } from '@reduxjs/toolkit'
import authReducer from '../slice/authSlice'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const reducerlist = combineReducers({
  auth: authReducer,

});

const persistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(persistConfig, reducerlist)
export const store = configureStore({
  reducer: persistedReducer,
  devTools: true
})
export const persistor = persistStore(store)