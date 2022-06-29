import { createSlice } from '@reduxjs/toolkit';

const locationsSlice = createSlice({
    name: 'locations',
    initialState: {
        cities: []
    },
    reducers: {
        setLocations(state, action) {
            state.cities = action.payload
        }
    }
})

export const locationsActions = locationsSlice.actions;
export default locationsSlice;