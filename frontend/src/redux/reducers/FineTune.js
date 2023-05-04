import { createSlice } from '@reduxjs/toolkit';

export const fineTuneSlice = createSlice({
    name: 'fineTune',
    initialState: {
        currentFineTunedModel: null
    },
    reducers: {
        selectFineTunedModel: (state, action) => {
            state.currentFineTunedModel = action.payload;
        }
    }
});

export const {
    selectFineTunedModel
} = fineTuneSlice.actions;
export default fineTuneSlice.reducer;