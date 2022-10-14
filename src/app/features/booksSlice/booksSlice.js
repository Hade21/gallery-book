import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [],
  showedBooks: [],
  categories: [],
  searchQuery: "",
};

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
    },
    setShowedBooks: (state, action) => {
      state.showedBooks = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setBooks, setShowedBooks, setCategories, setSearchQuery } =
  booksSlice.actions;

export const selectBooks = (state) => state.books.books;
