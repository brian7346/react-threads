import { createSlice } from "@reduxjs/toolkit"
import { userApi } from "../../app/services/userApi"
import { RootState } from "../../app/store"
import { User } from "../../app/types"

interface InitialState {
  user: User | null
  isAuthenticated: boolean
  users: User[] | null
  current: User | null
  token?: string
}

const initialState: InitialState = {
  user: null,
  isAuthenticated: false,
  users: null,
  current: null,
}

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: () => initialState,
    resetUser: (state) => {
      state.user = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(userApi.endpoints.login.matchFulfilled, (state, action) => {
        state.token = action.payload.token
        state.isAuthenticated = true
      })
      .addMatcher(userApi.endpoints.current.matchFulfilled, (state, action) => {
        state.isAuthenticated = true
        state.current = action.payload
      })
      .addMatcher(
        userApi.endpoints.getUserById.matchFulfilled,
        (state, action) => {
          state.user = action.payload
        },
      )
  },
})

export const { logout, resetUser } = slice.actions
export default slice.reducer

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated

export const selectCurrent = (state: RootState) => state.auth.current

export const selectUsers = (state: RootState) => state.auth.users

export const selectUser = (state: RootState) => state.auth.user
