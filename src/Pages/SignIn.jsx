import React, { useState } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import OAuth from "../components/OAuth";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const { email, password } = formData;
  const navigate = useNavigate();

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        navigate("/");
        toast.success("Successfully logged in");
      }
    } catch (error) {
      setErrorMsg("Invalid User Credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-900 dark:text-lime-600">
            Discover CountryScope
          </h1>
          <p className="mt-2 text-lg text-green-700 dark:text-lime-800">
            Your Global Journey Begins Here
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto rounded-2xl shadow-2xl dark:border dark:border-teal-600 overflow-hidden backdrop-blur-sm">
          {/* Left Side - Map Image */}
          <div className="lg:w-[55%] relative">
            <img
              src="/signIn.jpeg"
              alt="World Map"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-green-900/50 to-emerald-800/50">
              <div className="absolute bottom-16 left-16 text-white max-w-lg">
                <h2 className="text-xl md:text-4xl font-bold mb-4">"Find the Globe</h2>
                <p className="text-sm md:text-lg leading-relaxed">
                  Explore the world your way. Sign in to CountryScope and unlock
                  travel made simple. Your journey, your story — seamlessly
                  mapped. Ready to embark?nd economic data. Get real-time
                  updates about countries around the world.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:w-[45%] p-8 lg:p-12 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-green-900 dark:text-lime-600 mb-6">
              Sign In to Your Account
            </h2>

            <form onSubmit={onSubmit} className="space-y-6">
              <div>
                <Label className="block text-sm font-medium text-green-800 dark:text-lime-700">
                  Email
                </Label>
                <TextInput
                  type="email"
                  id="email"
                  value={email}
                  onChange={onChange}
                  placeholder="name@example.com"
                  className="mt-1 w-full rounded-lg border border-green-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                />
              </div>

              <div className="relative">
                <Label className="block text-sm font-medium text-green-800 dark:text-lime-700">
                  Password
                </Label>
                <div className="relative">
                  <TextInput
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={onChange}
                    placeholder="Enter your password"
                    className="mt-1 w-full rounded-lg border border-green-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-4 text-md cursor-pointer text-green-600 dark:text-lime-600 hover:text-green-700"
                  >
                    {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-teal-200 to-lime-200 text-gray-900 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-lime-200 dark:focus:ring-teal-700"
              >
                {loading ? "Signing in..." : "SIGN IN"}
              </Button>

              <div className="flex items-center before:border-t before:flex-1 before:border-gray-300  after:border-t after:flex-1 after:border-gray-300">
                <p className="text-center font-semibold mx-4 dark:text-lime-600">OR</p>
              </div>

              <OAuth />

              <div className="text-center mt-4">
                <p className="text-sm text-green-700 dark:text-lime-700">
                  Don't have an account?{" "}
                  <Link
                    to="/sign-up"
                    className="text-green-600 hover:text-green-800 dark:text-lime-600 font-medium"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>

            {errorMsg && (
              <Alert className="mt-7 py-3 bg-gradient-to-r from-red-100 via-red-300 to-red-400 shadow-md text-center text-red-600 text-base animate-bounce">
                {errorMsg}
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
