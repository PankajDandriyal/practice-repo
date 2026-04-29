import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserState } from '../../types/user';

const initialState: UserState = {
    data: [],
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        // Action to start the fetch (Saga listens to this)
        fetchUsersRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        // Action when data arrives (Saga calls this)
        fetchUsersSuccess: (state, action: PayloadAction<User[]>) => {
            state.loading = false;
            state.data = action.payload;
        },
        // Action if something breaks (Saga calls this)
        fetchUsersFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        addUserRequest: (state, _action: PayloadAction<Partial<User>>) => {
            state.loading = true;
        },

        addUserSuccess: (state, action: PayloadAction<User>) => {
            state.loading = false;
            // Push the new user to the top of the list so we see it immediately
            state.data = [action.payload, ...state.data];
        },
        addUserFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchUsersRequest, fetchUsersSuccess, fetchUsersFailure ,addUserRequest,addUserSuccess,addUserFailure} = userSlice.actions;
export default userSlice.reducer;