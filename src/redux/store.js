import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './reducers/Chat';

export const store = configureStore({
    reducer: {
        chat: chatReducer
    },
});