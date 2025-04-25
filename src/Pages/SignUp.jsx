import React, { useState } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import OAuth from "../components/OAuth";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const { name, email, password } = formData;
  const navigate = useNavigate();

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
      const user = userCredential.user;
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);
      toast.success("Successfully registered!");
      navigate("/sign-in");
    } catch (error) {
      setErrorMsg("Something went wrong with the registration");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-900 dark:text-lime-600">
            Join CountryScope
          </h1>
          <p className="mt-2 text-lg text-green-700 dark:text-lime-800">
            Create Your Global Explorer Account
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto rounded-2xl shadow-2xl dark:border dark:border-teal-600 overflow-hidden backdrop-blur-sm">
          {/* Left Side - Image */}
          <div className="lg:w-[55%] relative">
            <img
              src="/register.jpeg"
              alt="World Explorer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-green-900/50 to-emerald-800/50">
              <div className="absolute bottom-16 left-16 text-white max-w-lg">
                <h2 className="text-xl md:text-4xl font-bold mb-4">"Find the Globe</h2>
                <p className="text-sm md:text-lg leading-relaxed">
                  Unlock a world of seamless exploration with CountryScope!
                  Simplify your travel planning and embrace the joy of
                  discovering new destinations. Start your journey today!
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:w-[45%] p-8 lg:p-12 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-green-900 dark:text-lime-600 mb-6">
              Create Your Account
            </h2>

            <form onSubmit={onSubmit} className="space-y-6">
              <div>
                <Label className="block text-sm font-medium text-green-800 dark:text-lime-700">
                  Full Name
                </Label>
                <TextInput
                  type="text"
                  id="name"
                  value={name}
                  onChange={onChange}
                  placeholder="Enter your full name"
                  className="mt-1 w-full rounded-lg border border-green-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                />
              </div>

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
                    placeholder="Create a password"
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
                {loading ? "Creating Account..." : "SIGN UP"}
              </Button>

              <div className="flex items-center before:border-t before:flex-1 before:border-gray-300  after:border-t after:flex-1 after:border-gray-300">
                <p className="text-center font-semibold mx-4 text-green-600 dark:text-lime-600">OR</p>
              </div>

              <OAuth />

              <div className="text-center mt-4">
                <p className="text-sm text-green-700 dark:text-lime-700">
                  Already have an account?{" "}
                  <Link
                    to="/sign-in"
                    className="text-green-600 hover:text-green-800 dark:text-lime-600 font-medium"
                  >
                    Sign In
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
