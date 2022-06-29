import { configureStore } from '@reduxjs/toolkit';
import profileSlice from './profileSlice';
import locationsSlice from './locationsSlice';

const store = configureStore({
    reducer: {
        profile: profileSlice.reducer,
        locations: locationsSlice.reducer
    }
});

export const profileActions = profileSlice.actions;

export default store;