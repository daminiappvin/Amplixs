
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    id:null,
    name:'',
    email:'',
    roles:[],
    modules:[]
  },
  reducers: {
    setUser: (state, action) => {
        const { id, name , email , roles } = action.payload;
        state.id = id;
        state.name = name;
        state.email = email;
        state.roles = roles;
    },
    clearUser: (state) => {
        state.id = null;
        state.name = '';
        state.email = '';
        state.roles = [];
        state.modules = [];
    },
    setModule: (state, action) => {
        const { modules } = action.payload;
        state.modules = modules;
    },
    setProfile: (state, action) => {
      const { name , email } = action.payload;
      state.name = name;
      state.email = email;
  },
  },
});

export const { setUser, clearUser , setModule , setProfile} = userSlice.actions;
export default userSlice.reducer;
