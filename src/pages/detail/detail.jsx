import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase";

const Detail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [book, setBook] = React.useState(null);
  const [user, isLoading] = useAuthState(auth);

  useEffect(() => {
    async function getData() {
      const res = await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${params.id}`
      );
      setBook(res.data);
    }
    getData();
  }, [params.id]);
  useEffect(() => {
    if (isLoading) {
      return;
    } else if (!user) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="w-full h-full bg-gradient-to-b from-purple-900 to-pink-900 text-white p-4 md:p-8 flex flex-col gap-6 sm:flex-row sm:gap-6">
      <IoChevronBack
        className="text-2xl cursor-pointer sm:text-4xl"
        onClick={() => navigate(-1)}
      />
      {book && (
        <div className="flex flex-col gap-14 w-full">
          <div className="image w-full h-full flex sm:justify-around sm:items-center flex-col gap-20 sm:gap-8 sm:flex-row">
            <img
              src={book.volumeInfo.imageLinks.thumbnail}
              alt="thumbnail"
              className="w-2/3 sm:w-1/3 h-full sm:self-center sm:justify-self-center"
            />
            <div className="detail flex flex-col gap-2 md:gap-8 flex-1">
              <h1 className="font-mochiy text-2xl md:text-4xl font-bold">
                {book.volumeInfo.title}
              </h1>
              <p className="author font-poppins text-sm md:text-lg font-medium text-slate-300">
                by {book.volumeInfo.authors}
              </p>
              <p className="publish font-sans text-sm sm:text-base font-light sm:mt-8">
                Published date : {book.volumeInfo.publishedDate}
              </p>
              <a
                href={book.volumeInfo.previewLink}
                className="text-sm sm:text-base px-4 py-2 bg-blue-700 rounded font-poppins font-medium shadow-md active:shadow-none active:translate-y-1 hover:bg-blue-500 transition-all duration-200 w-fit"
              >
                Preview Link
              </a>
            </div>
          </div>
          <div className="details flex flex-col">
            <p className="text-xl sm:text-2xl font-poppins font-medium">
              Description
            </p>
            <p
              className="desc font-poppins text-sm sm:text-base font-light text-slate-100 mt-6"
              dangerouslySetInnerHTML={{ __html: book.volumeInfo.description }}
            ></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
