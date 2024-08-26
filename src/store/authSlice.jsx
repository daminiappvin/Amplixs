
import { createSlice } from '@reduxjs/toolkit';
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    state_value:'',
    verifier_value:'',
    expires_in:'',
    refresh_token:'',
    access_token:'',
    token_type:'',
    isAuthenticated: false,
  },
  reducers: {
    setVerifier: (state, action) => {
        const { state_value, verifier_value } = action.payload;
        state.state_value = state_value;
        state.verifier_value = verifier_value;
    },
    setAuth: (state, action) => {
        const { expires_in , refresh_token , access_token , token_type } = action.payload; 
        state.expires_in = expires_in;
        state.refresh_token = refresh_token;
        state.access_token = access_token;
        state.token_type = token_type;
        state.isAuthenticated = true;
    },
    clearAuth: (state) => {
      state.state_value = '';
      state.verifier_value = '';
      state.expires_in = '';
      state.refresh_token = '';
      state.access_token = '';
      state.token_type = '';
      state.isAuthenticated = false;
    },
    setLogin: (state, action) => {
        state.access_token = action.payload.access_token;
        state.isAuthenticated = true;
      },
      setLogout: (state) => {
        state.state_value = '';
        state.verifier_value = '';
        state.expires_in = '';
        state.refresh_token = '';
        state.access_token = '';
        state.token_type = '';
        state.isAuthenticated = false;
      },
  },
});

export const { setVerifier, setAuth ,clearAuth , setLogin , setLogout} = authSlice.actions;
export default authSlice.reducer;
