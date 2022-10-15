import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [],
  showedBooks: [],
  categories: [],
  selectedCategory: "",
  searchQuery: "",
  loading: false,
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
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setBooks,
  setShowedBooks,
  setCategories,
  setSearchQuery,
  setLoading,
  setSelectedCategory,
} = booksSlice.actions;
export default booksSlice.reducer;
