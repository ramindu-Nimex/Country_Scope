import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { FaMoon, FaSun } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { AiOutlineSearch } from "react-icons/ai";
import { signOutSuccess } from "../redux/user/userSlice";
import { useEffect, useState } from "react";

const Header = () => {
  const [term, setTerm] = useState("");
  const path = useLocation().pathname;
  const { theme } = useSelector((state) => state.theme);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = term.trim();
    if (trimmed) {
      navigate(`/searchCountries?searchTerm=${encodeURIComponent(trimmed)}`);
    }
    setTerm("");
  };

  return (
    <Navbar className="border-b-2 sticky top-0 bg-slate-200 shadow-md z-40">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-lime-500 via-green-500 to-blue-700 rounded-lg text-white">
          Country
        </span>
        Scope
      </Link>
      <form onSubmit={handleSubmit}>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </form>
      <div className="flex gap-2 md:order-2">
        <Button
          className="w-12 h-10 inline text-indigo-800"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaSun /> : <FaMoon />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar img={currentUser.profilePicture} alt="user" rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            {/* <Link to="/dashboard?tab=profile">
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link> */}
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign Out</Dropdown.Item>
          </Dropdown>
        ) : (
          <div className="flex flex-row gap-2">
            <Link to="/sign-in">
              <Button gradientDuoTone="purpleToBlue" outline>
                Sign In
              </Button>
            </Link>
          </div>
        )}
        <Navbar.Toggle className="text-sm" />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link
            to="/"
            className="text-blue-900 font-semibold hover:text-indigo-900 dark:text-gray-400 dark:hover:text-indigo-500 hover:underline"
          >
            Home
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link
            to="/about"
            className="text-blue-900 font-semibold hover:text-indigo-900 dark:text-gray-400 dark:hover:text-indigo-500 hover:underline"
          >
            About Us
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;