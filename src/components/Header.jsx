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
