import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { AuthResponseDto } from "api/dtos/auth-response.dto";
import { ErrorResponseDto } from "api/dtos/error-response.dto";
import { UserDto } from "api/dtos/user.dto";
import { authService } from "api/services/auth/auth.service";
import { RootState } from "store/store";
import { fakeLogin } from "utils/fake-auth";
import { RootReducers } from "../root-reducers";

interface UserAuthState {
  user: UserDto | null;
  isAuth: boolean;
  error?: ErrorResponseDto | null;
  isLoading: boolean;
}

const initialState: UserAuthState = {
  user: null,
  isAuth: false,
  error: null,
  isLoading: false,
};

export const login = createAsyncThunk<
  AuthResponseDto,
  { username: string; password: string },
  { rejectValue: ErrorResponseDto }
>(
  `${RootReducers.user}/login`,
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await authService.login(username, password);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk<void, void, { rejectValue: any }>(
  `${RootReducers.user}/logout`,
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const checkAuth = createAsyncThunk<
  AuthResponseDto,
  void,
  { rejectValue: ErrorResponseDto }
>(`${RootReducers.user}/checkAuth`, async (_, { rejectWithValue }) => {
  try {
    const response = await fakeLogin("admin", "12345");

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

const user = createSlice({
  name: RootReducers.user,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.error = null;
      state.isLoading = false;
      state.isAuth = true;
      state.user = payload.user;
      localStorage.setItem("token", payload.accessToken);
    });

    builder.addCase(login.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });

    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(logout.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isAuth = false;
      state.user = null;
      localStorage.removeItem("token");
    });

    builder.addCase(logout.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload?.response?.data;
    });

    builder.addCase(checkAuth.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(checkAuth.fulfilled, (state, { payload }) => {
      state.error = null;
      state.isLoading = false;
      state.isAuth = true;
      state.user = payload.user;
      localStorage.setItem("token", payload.accessToken);
    });

    builder.addCase(checkAuth.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
  },
});

export const selectUserState = (state: RootState) => state?.user;

export const userSlice = user.reducer;
