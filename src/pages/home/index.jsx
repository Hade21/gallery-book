import React, { useEffect } from "react";
import axios from "../../config/api/axios";
import { Header, ListBook } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import {
  setBooks,
  setCategories,
} from "../../app/features/booksSlice/booksSlice";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function getData() {
      const res = await axios.get();
      if (res.status === 200) {
        const books = res.data.items;
        dispatch(setBooks(books));
        if (books) {
          const categories = [];
          books.map((book) => {
            if (book.volumeInfo.categories) {
              book.volumeInfo.categories.map((category) => {
                if (!categories.includes(category)) {
                  categories.push(category);
                }
              });
            }
          });
          dispatch(setCategories(categories));
        }
      }
    }
    getData();
  }, []);
  return (
    <div className="flex">
      <Header />
      <section className="p-8 h-screen bg-gradient-to-b from-pink-900 to-purple-900 w-full min-w-[380px] sm:min-w-[680px] md:min-w-[940px] lg:min-w-[1222px] overflow-scroll">
        <h1 className="font-poppins text-4xl font-bold text-slate-100">
          Daftar Buku
        </h1>
        <div className="list-book mt-6">
          <ListBook />
        </div>
      </section>
    </div>
  );
};

export default Home;
