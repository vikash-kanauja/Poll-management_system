import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../redux/reducers/authSlice";
import { validateLogin } from "../utils/validation";

import { Link } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    emailError: "",
    passwordError: "",
  });

  const { loading } = useSelector((state) => state.auth);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { errors, isValid } = validateLogin(formData);
    if (isValid) {

      try {
        const res = await dispatch(loginUser(formData));
        if (res.payload.status === 200) {
          navigate("/polling");
        } else if (res.payload && res.payload.status === 401) {
          setError({ passwordError: res.payload.data.message });
        } else {
          setError({ passwordError: res.payload.data.message });
        }
      } catch (error) {
        setError({ ...error, passwordError: "An error occurred. Please try again later." });
      }

    } else {
      setError({
        emailError: errors.email,
        passwordError: errors.password,
      });
    }
  };

  useEffect(() => {
    setError(error);
  }, [error]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="md:max-w-sm 2xl:max-w-md w-full space-y-8 bg-white p-4 rounded-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md  -space-y-px">
            <div className="py-2">
              <label htmlFor="email-address" className="font-semibold ">
                Email address
                {formData.emailError}
              </label>
              <input
                id="email-address"
                name="email"
                type="text"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${formData.emailError ? "border-red-500" : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder="Enter email "
              />
              {error.emailError && (
                <p className="mt-2 text-sm text-red-500">{error.emailError}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className=" font-semibold">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${formData.passwordError ? "border-red-500" : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder="Enter password"
              />
              {error.passwordError && (
                <p className="mt-2 text-sm text-red-500">
                  {error.passwordError}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none "
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="relative w-5 h-5">
                    <div className="w-full h-full rounded-full absolute "></div>
                    <div className="w-full h-full rounded-full animate-spin absolute border-4 border-solid border-green-500 border-t-transparent"></div>
                  </div>
                </div>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
        <div className="">
          <p className="text-base text-center font-semibold">Don't have an account? <Link className="text-blue-600" to="/signup">Register</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
