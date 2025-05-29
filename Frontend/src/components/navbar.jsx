import React from "react";

const navbar = () => {
  return (
    <>
      <div className="flex justify-between items-center w-full bg-purple-200 text-black p-2">
        <p className="ml-28 font-bold text-lg">
          <span>&lt;</span>
          <span>Priva</span>
          <span className="text-green-600">Coder</span>
          <span>/&gt;</span>
        </p>
        <a href="https://github.com/gsneha16" target="blank"><button className="mr-28 bg-green-600 px-3  py-1 rounded-2xl text-white font-bold">Github <i className="fa-brands fa-github"></i></button></a>
      </div>
    </>
  );
};

export default navbar;
