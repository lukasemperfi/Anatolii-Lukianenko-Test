import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { CatsDto } from "api/dtos/cats.dto";
import { ErrorResponseDto } from "api/dtos/error-response.dto";
import { catsService } from "api/services/the-cat-api/the-cat-api.service";

import { AppDispatch, RootState } from "store/store";
import { RootReducers } from "../root-reducers";

interface CatsState {
  cats: CatsDto[];
  error?: any;
  isLoading: boolean;
  pagination: {
    page: number;
    hasMore: boolean;
  };
}

const initialState: CatsState = {
  cats: [],
  error: null,
  isLoading: false,
  pagination: {
    page: 1,
    hasMore: true,
  },
};

export const getCats = createAsyncThunk<
  CatsDto[],
  number,
  { rejectValue: ErrorResponseDto; dispatch: AppDispatch }
>(
  `${RootReducers.cats}/getCats`,
  async (page, { rejectWithValue, dispatch }) => {
    try {
      const response = await catsService.getCats(page);

      const limit = Number(response.headers["pagination-limit"]);
      const currentPage = Number(response.headers["pagination-page"]);
      const totalCount = Number(response.headers["pagination-count"]);

      const pageCount = Math.ceil(totalCount / limit);

      if (currentPage >= pageCount) {
        dispatch(setHasMore(false));
      }

      dispatch(setPage(currentPage));

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

const cats = createSlice({
  name: RootReducers.cats,
  initialState,
  reducers: {
    setHasMore(state, { payload }) {
      state.pagination.hasMore = payload;
    },
    setPage(state, { payload }) {
      state.pagination.page = payload;
    },
    clearState(state) {
      state.cats = [];
      state.error = null;
      state.isLoading = false;
      state.pagination.page = 1;
      state.pagination.hasMore = true;
    },
    deleteCat(state, { payload: id }: { payload: string }) {
      state.cats = state.cats.filter((cat) => cat.id !== id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCats.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getCats.fulfilled, (state, { payload }) => {
      state.error = null;
      state.isLoading = false;
      state.cats = [...state.cats, ...payload];
    });

    builder.addCase(getCats.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
  },
});

export const { setHasMore, setPage, clearState, deleteCat } = cats.actions;

export const selectCatsState = (state: RootState) => state?.cats;

export const catsSlice = cats.reducer;
