import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./Pages/HomePage";
import FooterComponent from "./components/FooterComponent";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import SearchCountryPage from "./Pages/SearchCountryPage";
import AboutUsPage from "./Pages/AboutUsPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/searchCountries" element={<SearchCountryPage />} />
            <Route path="/about" element={<AboutUsPage />} />
          </Routes>
        </div>
        <FooterComponent />
      </Router>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default App;
