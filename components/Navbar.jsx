import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { HiOutlineUpload, HiOutlineLogout } from "react-icons/hi";
import { AiOutlineMenu } from "react-icons/ai";
import Link from "next/link";
const Navbar = ({
  toggleUpload,
  logout,
  isLoggedIn,
  name,
  images,
  setSearchedImage,
}) => {
  let newImages = [];
  const router = useRouter();
  const [query, setQuery] = useState("");
  const toggleMenu = () => {
    if (typeof window != "undefined") {
      document.getElementById("menu").classList.toggle("hidden");
    }
  };
  const captureQuery = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };
  const handleOnSearch = (e) => {
    e.preventDefault();
    let queryArr = query.split(" ");
    for (let wordOfQuery of queryArr) {
      for (let objectOfImage of images) {
        if (
          objectOfImage.name.toLowerCase().includes(wordOfQuery.toLowerCase())
        ) {
          newImages.push(objectOfImage);
        }
      }
    }
    const uniqueSearchImages = Array.from(new Set(newImages.map((a) => a.url))).map((url) => {
        return newImages.find((a) => a.url === url);
      }
    );
    setSearchedImage(uniqueSearchImages);
    router.push("/search");
  };
  return (
    <>
      <div className="container bg-[#1F2937] text-[#CCD0D6] m-auto flex justify-between items-center flex-center p-2 font-semibold">
        <div className="flex items-center">
          <Link href={"/"}>
            <h2 className="text-xl font-bold mr-20">Dobby</h2>
          </Link>
          <nav className="md:block hidden">
            <ul className="flex justify-center items-center">
              <button className="mx-2 hover:bg-[#111827] border rounded hover:border-[#111827] border-transparent p-2 cursor-pointer">
                Dashboard
              </button>
              <button className="mx-2 hover:bg-[#111827] border rounded hover:border-[#111827] border-transparent p-2 cursor-pointer">
                Images
              </button>
              <button
                className="mx-2 hover:bg-[#111827] border rounded hover:border-[#111827] border-transparent p-2 cursor-pointer flex items-center"
                onClick={toggleUpload}
              >
                Upload <HiOutlineUpload className="text-lg ml-2" />
              </button>
            </ul>
          </nav>
        </div>
        <div className=" flex items-center ">
          <form
            onSubmit={handleOnSearch}
            className="md:flex md:w-[300px] hidden items-center bg-[#374151] text-[#8F96A3] mr-1 rounded px-2 py-1"
          >
            <CiSearch className="text-xl" />
            <input
              onChange={captureQuery}
              type="search"
              className="border-none focus:outline-none bg-transparent pl-1 w-full"
            />
          </form>
          {!isLoggedIn && (
            <>
              <Link href={"/login"}>
                <button className="mx-2 md:block hidden hover:bg-[#111827] border rounded hover:border-[#111827] border-transparent p-2 cursor-pointer flex items-center">
                  Login
                </button>
              </Link>
              <button
                className="mx-2 hover:bg-[#111827] border rounded hover:border-[#111827] border-transparent p-2 cursor-pointer md:hidden block"
                onClick={toggleMenu}
              >
                <AiOutlineMenu className="text-xl" />
              </button>
            </>
          )}
          {isLoggedIn && (
            <>
              <button onClick={toggleMenu}>
                <img
                  src={localStorage.getItem("dobby-avatar")}
                  className="w-[30px] aspect-square "
                  alt=""
                />
              </button>
              <button
                className="rounded border border-transparent hover:bg-[#111827] hover:border-[#111827] p-2 mx-1 cursor-pointer md:flex hidden items-center"
                onClick={logout}
              >
                <HiOutlineLogout className="text-lg" />
              </button>
            </>
          )}
        </div>
      </div>
      <div id="menu" className="hidden">
        <div className="container m-auto flex flex-col justify-center p-2 md:hidden bg-[#1F2937] text-[#CCD0D6]">
          <div className="flex w-full  items-center bg-[#374151] text-[#8F96A3] mr-5 rounded px-2 py-1 my-1">
            <CiSearch className="text-xl" />
            <input
              type="search"
              className="border-none focus:outline-none bg-transparent pl-1 w-full"
            />
          </div>
          <ul className="flex flex-col items-start ">
            <button className="w-full my-1 rounded border border-transparent hover:bg-[#111827] hover:border-[#111827] p-1 cursor-pointer flex items-center">
              Dashboard
            </button>
            <button className="w-full my-1 rounded border border-transparent hover:bg-[#111827] hover:border-[#111827] p-1 cursor-pointer flex items-center">
              Images
            </button>
            <button
              className="w-full my-1 rounded border border-transparent hover:bg-[#111827] hover:border-[#111827] p-1 cursor-pointer flex items-center"
              onClick={toggleUpload}
            >
              Upload <HiOutlineUpload className="text-xl ml-2" />
            </button>
            {isLoggedIn && (
              <button
                className="w-full my-1 rounded border border-transparent hover:bg-[#111827] hover:border-[#111827] p-1 cursor-pointer flex items-center"
                onClick={logout}
              >
                Logout <HiOutlineLogout className="text-lg ml-2" />
              </button>
            )}
            {!isLoggedIn && (
              <Link className="w-full" href={"/login"}>
                <button className="w-full my-1 rounded border border-transparent hover:bg-[#111827] hover:border-[#111827] p-1 cursor-pointer flex items-center">
                  Login
                </button>
              </Link>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
