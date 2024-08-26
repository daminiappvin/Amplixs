
import { createSlice } from '@reduxjs/toolkit';

const clientIdSlice = createSlice({
  name: 'client',
  initialState: null,
  reducers: {
    setClient: (state, action) => action.payload,
    clearClient: () => null,
  },
});

export const { setClient, clearClient } = clientIdSlice.actions;
export default clientIdSlice.reducer;
