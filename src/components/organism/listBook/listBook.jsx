import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowedBooks } from "../../../app/features/booksSlice/booksSlice";
import { CardBook } from "../../molecule";

const ListBook = () => {
  const dispatch = useDispatch();

  const books = useSelector((state) => state.books.books);
  const searchQuery = useSelector((state) => state.books.searchQuery);
  const selectedCategory = useSelector((state) => state.books.selectedCategory);
  const showedBooks = useSelector((state) => state.books.showedBooks);

  useEffect(() => {
    if (searchQuery) {
      const filteredBooks = books.filter((book) => {
        return book.volumeInfo.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      });
      dispatch(setShowedBooks(filteredBooks));
    } else if (selectedCategory) {
      const filteredBooks = books.filter((book) => {
        return book.volumeInfo.categories.includes(selectedCategory);
      });
      dispatch(setShowedBooks(filteredBooks));
    } else {
      dispatch(setShowedBooks(books));
    }
  }, [searchQuery, selectedCategory]);

  console.log(showedBooks);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
      {showedBooks.map((book, i) => {
        return (
          <CardBook
            title={book.volumeInfo.title}
            author={book.volumeInfo.authors[0]}
            publishDate={book.volumeInfo.publishedDate}
            thumbnail={book.volumeInfo.imageLinks.smallThumbnail}
            key={i}
            link={book.selfLink}
          />
        );
      })}
    </div>
  );
};

export default ListBook;
