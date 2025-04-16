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
    <div className="min-h-screen mt-20">
      <h1 className="text-3xl text-center mt-6 font-extrabold underline text-blue-950 dark:text-slate-300">
        Login to your account
      </h1>
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-10 md:gap-20">
        {/* Left Side */}
        <div className="flex-1">
          <img src="Login.png" alt="signIn" width={550} className="mx-auto" />
          <p className="text-sm font-semibold capitalize mb-5 mt-3">
            Explore the world your way. Sign in to CountryScope and unlock
            travel made simple. Your journey, your story — seamlessly mapped.
            Ready to embark?
          </p>
        </div>

        {/* Right Side */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <div>
              <Label value="Your Email" />
              <TextInput
                type="email"
                id="email"
                placeholder="name@gmail.com"
                value={email}
                onChange={onChange}
              />
            </div>
            <div className="relative">
              <Label value="Your Password" />
              <TextInput
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="*************"
                value={password}
                onChange={onChange}
              />
              {showPassword ? (
                <BsFillEyeSlashFill
                  className="absolute right-3 top-9 text-md cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              ) : (
                <BsFillEyeFill
                  className="absolute right-3 top-9 text-md cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              )}
            </div>
            <Button
              type="submit"
              gradientDuoTone="purpleToBlue"
              className="uppercase"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <div className="flex items-center before:border-t before:flex-1 before:border-gray-300  after:border-t after:flex-1 after:border-gray-300">
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't have an account?</span>
            <Link to="/sign-up" className="text-blue-700">
              Sign Up
            </Link>
          </div>
          {errorMsg && (
            <Alert className="mt-7 py-3 bg-gradient-to-r from-red-100 via-red-300 to-red-400 shadow-md text-center text-red-600 text-base animate-bounce">
              {errorMsg}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
