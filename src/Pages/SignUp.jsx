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
    <div className="min-h-screen mt-20">
      <h1 className="text-3xl text-center mt-6 font-extrabold underline text-blue-950 dark:text-slate-300">
        Register as a new user
      </h1>
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-10 md:gap-20">
        {/* Left side */}
        <div className="flex-1">
          <img src="Signup.png" alt="signUp" width={550} className="mx-auto" />
          <p className="text-sm font-semibold capitalize mb-5">
            Unlock a world of seamless exploration with CountryScope! Simplify
            your travel planning and embrace the joy of discovering new
            destinations. Start your journey today!
          </p>
        </div>

        {/* Right side */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <div>
              <Label value="Your Name" />
              <TextInput
                type="text"
                id="name"
                placeholder="Full Name"
                value={name}
                onChange={onChange}
              />
            </div>
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
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              ) : (
                <BsFillEyeFill
                  className="absolute right-3 top-9 text-md cursor-pointer"
                  onClick={() => setShowPassword((prevState) => !prevState)}
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
                "Sign Up"
              )}
            </Button>
            <div className="flex items-center before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-700">
              Sign In
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
