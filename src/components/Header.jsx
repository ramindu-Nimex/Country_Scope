import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";

const Header = () => {
  const [term, setTerm] = useState("");
  const [user, setUser] = useState(null);
  const path = useLocation().pathname;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = term.trim();
    if (trimmed) {
      navigate(`/searchCountries?searchTerm=${encodeURIComponent(trimmed)}`);
    }
    setTerm("");
  };

  const handleSignOut = async () => {
    try {
      await signOut(getAuth());
      setUser(null);
      navigate("/sign-in");
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Navbar className="border-b-2 sticky top-0 bg-slate-200 shadow-md z-40">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <div className="flex items-center">
          <div className="w-10 h-10 mr-2 relative overflow-hidden">
            {/* Creative logo representing world continents */}
            <div className="absolute inset-0 bg-gradient-to-br from-lime-500 to-teal-600 rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Stylized continent shapes */}
              <div className="w-6 h-6 bg-lime-300 dark:bg-lime-400 opacity-80 rounded-tr-full rounded-bl-full transform rotate-45 translate-x-1 translate-y-0.5"></div>
              <div className="absolute w-5 h-5 bg-teal-400 dark:bg-teal-300 opacity-90 rounded-tl-full rounded-br-full transform -rotate-12 -translate-x-1.5 -translate-y-1"></div>
              <div className="absolute w-2 h-2 bg-green-300 dark:bg-green-200 rounded-full transform translate-x-2 translate-y-2"></div>
            </div>
          </div>
          <div className="font-bold tracking-tight text-base md:text-2xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-green-500 dark:from-lime-400 dark:to-green-400">
              Country
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-teal-700 dark:from-green-400 dark:to-teal-400">
              Scope
            </span>
          </div>
        </div>
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
        {user ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                img={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1EbhMbqdCA85UXXAxxXvcc0PN9xvHOZF6yYVUVRAYSlQC_B9aPU-tEdU&s"
                }
                alt="user"
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">
                @{user.displayName || "User"}
              </span>
              <span className="block text-sm font-medium truncate">
                {user.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button gradientDuoTone="purpleToBlue" outline>
              Sign In
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
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
