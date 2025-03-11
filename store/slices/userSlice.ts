    // store/slices/userSlice.ts
    import { createSlice, PayloadAction } from "@reduxjs/toolkit";

    interface UserState {
        id: string | null;
        firstName: string | null;
        lastName: string | null;
        role: "gm" | "player" | null;
        email: string | null;
        avatar: string | null;
        token: string | null;
    }

    const initialState: UserState = {
        id: null,
        firstName: null,
        lastName: null,
        role: null,
        email: null,
        avatar: null,
        token: null,
    };

    const userSlice = createSlice({
        name: "user",
        initialState,
        reducers: {
            setUser(state, action: PayloadAction<UserState>) {
                state.id = action.payload.id;
                state.firstName = action.payload.firstName;
                state.lastName = action.payload.lastName;
                state.role = action.payload.role;
                state.email = action.payload.email;
                state.avatar = action.payload.avatar;
                state.token = action.payload.token;
            },
            logout() {
                return initialState;
            }
        }
    });

    export const { setUser, logout } = userSlice.actions;
    export default userSlice.reducer;
