import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Transaction {
  id: string;
  amount: string;
  transaction_type: string;
  created_at: string;
  transaction_id: string;
  date: string;
  time: string;
  status: boolean | string;
}

export interface TransactionsState {
  list: Transaction[];
  loading: boolean;
  error: string | null;
}

const initialState: TransactionsState = {
  list: [],
  loading: false,
  error: null,
};

const API_URL = "https://689f1aaa3fed484cf8790ec6.mockapi.io/api/amount";

export const fetchTransactions = createAsyncThunk<Transaction[]>(
  "transactions/fetchTransactions",
  async () => {
    const response = await axios.get<Transaction[]>(API_URL);
    return response.data;
  }
);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTransactions.fulfilled,
        (state, action: PayloadAction<Transaction[]>) => {
          state.loading = false;
          state.list = action.payload;
        }
      )
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Something went wrong";
      });
  },
});

export default transactionsSlice.reducer;
