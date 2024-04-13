import { useState } from "react";
import logo from "../assets/images/logo.png";
import profile from "../assets/images/b4.jpg";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineMenu } from "react-icons/ai";
import { useAuth } from "../../hooks/AuthProvider";
import DropdownUser from "./DropdownUser";

interface NavItem {
  id: number;
  name: string;
  path: string;
}

export const Header = () => {
  const activeNavLink = ({ isActive }: { isActive: boolean }) =>
    isActive ? "active" : "NavLink";
  const [isMenu, setIsMenu] = useState(false);
  const [resSearch, setResSearch] = useState<string>("");
  const auth = useAuth();

  const navBar: NavItem[] = [
    {
      id: 1,
      name: "Home",
      path: "/",
    },
    {
      id: 2,
      name: "Albums",
      path: "/browser",
    },
    {
      id: 3,
      name: "Songs",
      path: "/charts",
    },
    {
      id: 4,
      name: "Artists",
      path: "/artists",
    },
  ];

  return (
    <>
      <header className="fixed left-0 top-0 z-50 h-[8vh] w-screen bg-white md:shadow-sm">
        {/* desktop */}
        <div className="hidden justify-between p-2 px-7 md:flex">
          <div className="logo flex">
            <div className="">
              <img src={logo} alt="" width="40px" height="40px" />
            </div>
            <h2 className="ml-3 text-2xl font-semibold">pluse</h2>
          </div>
          {/* navlinks */}
          <div className="menu">
            <ul className="flex">
              {navBar.map((list, i) => (
                <li className={`mx-5 py-2 ${activeNavLink}`} key={i}>
                  <NavLink to={list.path}>{list.name}</NavLink>
                </li>
              ))}
            </ul>
          </div>
          {/* profile */}
          <div className="profile flex items-center">
            {/* search */}
            <div className=" xl:w-80 flex items-center">
              <div className="relative flex w-full flex-wrap items-stretch">
                <input
                  type="search"
                  className="relative m-0 block flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.2rem] text-base font-normal leading-[1.4] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-green-500 focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="button-addon2"
                  value={resSearch}
                  onChange={(event) => setResSearch(event.target.value)}
                />

                {/* <!--Search icon--> */}
                <Link
                  className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
                  id="basic-addon2"
                  to={`/songs/search?q=${resSearch}`}
                >
                  <AiOutlineSearch size={20} />
                </Link>
              </div>
            </div>
            {/* end-search */}
            {/* <button className="mx-3 rounded-full bg-green-500 px-6 py-1.5 text-whiten" onClick={() => auth.logOut()}>
              Logout
            </button>
            <div className="img h-10 w-10 rounded-full">
              <img
                src={profile}
                alt="profile"
                className="img h-10 w-10 cursor-pointer rounded-full bg-red-300 object-cover"
              />
            </div> */}
            <div className="flex items-center gap-3 2xsm:gap-7">
              <ul className="flex items-center gap-2 2xsm:gap-4"></ul>

              {/* <!-- User Area --> */}
              <DropdownUser />
              {/* <!-- User Area --> */}
            </div>
          </div>
        </div>
        {/* mobile */}
        <div className="flex h-full items-center justify-between pl-2 pr-8 md:hidden">
          <div className="logo flex">
            <div className="">
              <img src={logo} alt="" width="40px" height="40px" />
            </div>
            <h2 className="ml-3 text-2xl font-semibold">pluse</h2>
          </div>
          <div className="">
            {isMenu && (
              <div className="absolute left-0 top-16 flex w-full flex-col rounded-lg bg-gray shadow-xl">
                <ul className="flex flex-col">
                  {navBar.map((list, i) => (
                    <li className={`mx-5 py-2 ${activeNavLink}`} key={i}>
                      <NavLink to={list.path}>{list.name}</NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <AiOutlineMenu
              size={20}
              onClick={() => {
                setIsMenu(!isMenu);
              }}
            />
          </div>
        </div>
      </header>
    </>
  );
};
