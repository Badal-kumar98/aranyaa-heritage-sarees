import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AccountState {
  signedIn: boolean;
  user?: { name: string; email: string };
  preferences: {
    newsletter: boolean;
    whatsapp: boolean;
    launchAlerts: boolean;
  };
}

const initialState: AccountState = {
  signedIn: false,
  preferences: { newsletter: true, whatsapp: false, launchAlerts: true },
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    signIn(state, action: PayloadAction<{ name: string; email: string }>) {
      state.signedIn = true;
      state.user = action.payload;
    },
    signOut(state) {
      state.signedIn = false;
      state.user = undefined;
    },
    setPreference(state, action: PayloadAction<{ key: keyof AccountState['preferences']; value: boolean }>) {
      state.preferences[action.payload.key] = action.payload.value;
    },
  },
});

export const { signIn, signOut, setPreference } = accountSlice.actions;
export default accountSlice.reducer;
