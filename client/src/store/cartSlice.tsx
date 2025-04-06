import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface CartItem {
  productId?: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  cartId?: string;
}

const initialState: CartState = {
  items: [],
  status: "idle",
  cartId: "",
};

export const saveToCart = createAsyncThunk(
  "cart/saveToCart",
  async ({ userId, items }: { userId: string; items: CartItem[] }) => {
    const response = await axios.post(
      import.meta.env.VITE_API + "/create-cart",
      {
        userId,
        items,
      }
    );
    console.log("response.data saveto cart", response.data);
    return response.data;
  }
);
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async ({ userId }: { userId: string }) => {
    const response = await axios.get(
      import.meta.env.VITE_API + "/get-cart/" + userId
    );
    console.log("response.data getcart", response.data);
    return response.data;
  }
);

export const removeItemFromCart = createAsyncThunk(
  "cart/removeItemFromCart",
  async ({ userId, productId }: { userId: string; productId: string }) => {
    const response = await axios.delete(
      import.meta.env.VITE_API + `/remove-item/${userId}/${productId}`
    );
    console.log("response.data deleteitem", response.data.deleteProductId);
    return response.data.deleteProductId;
  }
);

export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({
    userId,
    productId,
    amount,
  }: {
    userId: string;
    productId: string;
    amount: number;
  }) => {
    const response = await axios.put(
      import.meta.env.VITE_API + `/update-quantity/${userId}/${productId}`,
      { amount }
    );
    console.log("response.data updatequantity", response.data);
    return response.data;
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async ({ userId }: { userId: string }) => {
    const response = await axios.put(
      import.meta.env.VITE_API + `/clear-cart/${userId}`
    );
    // console.log("response.data clearcart", response.data);
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saveToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state?.items?.push(action.payload);
      })
      .addCase(saveToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveToCart.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.items || [];
        state.cartId = action.payload._id;
      })
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        const deleteProductId = action.payload;
        state.items = state.items.filter(
          (item) => item.productId !== deleteProductId
        );
      })
      .addCase(removeItemFromCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeItemFromCart.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { productId, quantity } = action.payload;
        // console.log("productId", productId);
        // console.log("quantity", quantity);
        const findItem = state.items.find(
          (item) => item.productId === productId
        );
        if (findItem) {
          findItem.quantity += quantity;
        }
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.status = "succeeded";
        state.items = [];
      })
      .addCase(clearCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(clearCart.rejected, (state) => {
        state.status = "failed";
      });
  },
});

//Reducer
export default cartSlice.reducer;
