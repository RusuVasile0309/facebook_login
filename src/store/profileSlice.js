import { createSlice } from "@reduxjs/toolkit";

const initialProfileState = {
    user: {
        name: '',
        email: '',
    }
};

const profileSlice = createSlice({
    name: 'profile',
    initialState: initialProfileState,
    reducers: {
        setUser(state, action) {
            state.user.name = action.payload.name;
            state.user.email = action.payload.email;
        }
    }
});

export const selectUser = (state) => state.profile.user;




export default profileSlice;