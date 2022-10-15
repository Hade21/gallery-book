import React from "react";
import { useNavigate } from "react-router-dom";

const CardBook = ({ thumbnail, title, publishDate, author, id }) => {
  const navigate = useNavigate();

  const handleDetail = () => {
    navigate(`/detail/${id}`);
  };
  return (
    <div
      className="bg-slate-100 rounded p-4 w-full flex flex-col gap-6 items-center justify-between cursor-pointer"
      onClick={handleDetail}
    >
      <div className="thumbnail">
        <img src={thumbnail} alt="thumbnail" />
      </div>
      <div className="desc self-start">
        <h3 className="font-mochiy text-xl text-slate-800">{title}</h3>
        <p className="font-poppins text-base text-slate-600 mt-6">
          by {author}
        </p>
        <p className="font-poppins text-sm font-light text-slate-500">
          Release : {publishDate}
        </p>
      </div>
    </div>
  );
};

export default CardBook;
