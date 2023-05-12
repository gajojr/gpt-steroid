import { createSlice } from '@reduxjs/toolkit';

export const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        currentChatId: null,
        currentChatType: null
    },
    reducers: {
        selectChatId: (state, action) => {
            state.currentChatId = action.payload;
        },
        selectChatType: (state, action) => {
            state.currentChatType = action.payload;
        }
    }
});

export const {
    selectChatId,
    selectChatType
} = chatSlice.actions;
export default chatSlice.reducer;