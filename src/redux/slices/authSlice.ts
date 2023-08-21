import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';

interface AuthInitialState {
  user: User | null;
}
const initialState: AuthInitialState = {
  user: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setFirebaseUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    }
  }
});
export const { setFirebaseUser, removeUser } = authSlice.actions;
export default authSlice.reducer;
