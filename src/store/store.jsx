import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import chatSlice from "./slices/chatSlice";
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';


const reducers = combineReducers({
    user:userSlice,
    chat:chatSlice,
});


const persistConfig = {
    key: 'entrypoint',
    storage,
    //whitelist: ['cart'], // reducername
}

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
})

export default store;