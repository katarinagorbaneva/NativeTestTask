import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  'access-token': string,
  client: string,
  uid: string,
  username: string,
  avatar_url: string
}

const initialState: UserState | {} = {};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
      deleteUser: (state) => state = initialState,
      updateUser: (state, { payload }) => state = payload
  }
})

export default userSlice.reducer;
