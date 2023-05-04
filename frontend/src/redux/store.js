import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './reducers/Chat';
import fineTuneReducer from './reducers/FineTune';

export const store = configureStore({
    reducer: {
        chat: chatReducer,
        fineTune: fineTuneReducer
    },
});