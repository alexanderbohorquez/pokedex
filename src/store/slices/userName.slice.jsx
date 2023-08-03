import { createSlice } from '@reduxjs/toolkit';


export const userNameSlice = createSlice({
    name: 'userName',
    initialState: "x",
    reducers: {
        getUsername: (state, action) => {
            const name = action.payload;
            return name
        }

    }
}
)
export const { getUsername } = userNameSlice.actions;
export default userNameSlice.reducer;