import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./features/userSlice/userSlice";
import booksReducer from "./features/booksSlice/booksSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    books: booksReducer,
  },
});
