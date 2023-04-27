import { createSlice } from '@reduxjs/toolkit';

export const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        currentChatId: null
    },
    reducers: {
        selectChatId: (state, action) => {
            state.currentChatId = action.payload;
        }
    }
});

export const {
    selectChatId
} = chatSlice.actions;
export default chatSlice.reducer;