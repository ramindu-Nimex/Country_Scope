import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header"
import HomePage from "./Pages/HomePage";
import FooterComponent from "./components/FooterComponent";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import SearchCountryPage from "./Pages/SearchCountryPage";
import AboutUsPage from "./Pages/AboutUsPage";

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
    </>
  )
}

export default App