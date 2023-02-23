import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import cartItems from "../../cartItems";

const initialState = {
  cartItems: [],
  amount: 5,
  total: 0,
  isLoading: null,
  error: null,
};

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://course-api.com/react-useReducer-cart-project"
      );

      if (!response.ok) {
        throw new Error("Ошибка получения данных");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload.id;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increment: (state, action) => {
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      cartItem.amount = cartItem.amount + 1;
    },
    decrement: (state, action) => {
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      cartItem.amount = cartItem.amount - 1;
    },
    calculateTotals(state) {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount = amount + item.amount;
        total = total + item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
  extraReducers: {
    [getCartItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [getCartItems.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { clearCart, removeItem, increment, decrement, calculateTotals } =
  cartSlice.actions;
export default cartSlice.reducer;
