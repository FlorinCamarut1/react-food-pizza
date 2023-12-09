import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const initialState = {
  cart: [],
  count: 1,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state, action) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;

// redux selector function
// export const getTotalCartItems = (state) =>
//   state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

// export const getTotalCartPrice = (state) =>
//   state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);
//'reselct' to optimize this selectors =>> check it out !

// export const getCurrentQuantityById = (id) => (state) =>
//   state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------SELECTORS-----------------------------------------------------------------------------------------
export const getCart = (state) => state.cart.cart;

export const getTotalCartItems = createSelector([getCart], (state) =>
  state.reduce((sum, item) => sum + item.quantity, 0),
);
export const getTotalCartPrice = createSelector([getCart], (state) =>
  state.reduce((sum, item) => sum + item.totalPrice, 0),
);
export const getCurrentQuantityById = (id) =>
  createSelector(
    [getCart],
    (state) => state.find((item) => item.pizzaId === id)?.quantity ?? 0,
  );
