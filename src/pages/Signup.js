import React, { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import { validateSignup } from "../utils/validation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signupUser } from "../redux/reducers/authSlice";
import { useDispatch, useSelector } from "react-redux"
import Modal from "../Components/Modal";
import { fetchRoles } from '../redux/reducers/rollListSlice';

const Signup = () => {
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        roleId: "",
        password: "",
        confirmPassword: "",
    });
    const [showpasswords, setShowPasswords] = useState({
        showpassword: false,
        showConfirmPassword: false
    })
    const [successMessage, setSuccessMessage] = useState("");
    const [error, setError] = useState({});
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.auth);
    const role = useSelector((state) => state.roles.role);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setError({ ...error, [e.target.name]: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { errors, isValid } = validateSignup(formData);
        setError(errors)
        if (isValid) {
            const { confirmPassword, ...formDataWithoutConfirmPassword } = formData;
            const res = await dispatch(signupUser(formDataWithoutConfirmPassword));
            if (res.payload.status === 200) {
                setShowModal(true)
            } else if(res.payload.status === 500){
                setSuccessMessage(res.payload.data );
            }
        } else {
            setError(errors);
            setSuccessMessage("")
        }
    };
    const modalHandleNavigate = () => {
        setShowModal(false);
          navigate("/");
      };

    useEffect(() => {
        dispatch(fetchRoles());
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">
            <div className="md:max-w-sm 2xl:max-w-md w-full space-y-8 bg-white p-4 rounded-lg">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Sign Up
                </h2>
                <form onSubmit={handleSubmit} className="mt-8 space-y-2">
                    <div className="rounded-md  -space-y-px">
                        <div className="py-2">
                            <label htmlFor="email-address" className="font-semibold ">
                                First Name
                            </label>
                            <input
                                type="text"
                                id="First Name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="First Name"
                                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${error.firstName? "border-red-500" : "border-gray-300"
                                    } placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                            />
                            {error.firstName && (
                                <p className="mt-2 text-sm text-red-500">{error.firstName}</p>
                            )}
                        </div>
                        <div className="py-2">
                            <label htmlFor="password" className=" font-semibold">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="Last Name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Last Name"
                                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${error.lastName ? "border-red-500" : "border-gray-300"
                                    } placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                            />
                            {error.lastName && (
                                <p className="mt-2 text-sm text-red-500">
                                    {error.lastName}
                                </p>
                            )}
                        </div>
                        <div className="py-2">
                            <label htmlFor="password" className=" font-semibold">
                                Email address
                            </label>
                            <input
                                type="text"
                                id="Email address"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${error.email ? "border-red-500" : "border-gray-300"
                                    } placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                            />
                            {error.email && (
                                <p className="mt-2 text-sm text-red-500">
                                    {error.email}
                                </p>
                            )}
                        </div>
                        <div className="py-2">
                            <label htmlFor="password" className=" font-semibold">
                                Role
                            </label>
                            <select
                                name="roleId"
                                id="roleId"
                                className={`w-full py-1 sm:py-2 pl-2 outline-none border ${error.roleId ? "border-red-500" : "border-gray-300"
                                    }`}
                                onChange={handleChange}
                                value={formData.roleId}>
                                <option value="">Select Role</option>
                                {role.data?.map((role, index) => {
                                    return (
                                        <option key={index} value={`${role.id}`}>
                                            {role.name.toLowerCase()}
                                        </option>
                                    );
                                })}
                            </select>
                            {error.roleId && (
                                <p className="mt-2 text-sm text-red-500">
                                    {error.roleId}
                                </p>
                            )}
                        </div>
                        <div className="py-2">
                            <label htmlFor="password" className=" font-semibold">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showpasswords.showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${error.password ? "border-red-500" : "border-gray-300"
                                        } placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                                />
                                <div className="absolute right-2 top-[30%] z-10">
                                    <button type="button" className=" right-0 top-[50%]" onClick={() => setShowPasswords({ ...showpasswords, showPassword: !showpasswords.showPassword })}>
                                        {showpasswords.showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button></div>

                            </div>
                            {error.password && (
                                <p className="mt-2 text-sm text-red-500">
                                    {error.password}
                                </p>
                            )}
                        </div>
                        <div className="py-2">
                            <label htmlFor="password" className=" font-semibold">
                                Confirm Password
                            </label>
                            <div className=" relative">
                                <input
                                    type={showpasswords.showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm Password"
                                    className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${error.confirmPassword ? "border-red-500" : "border-gray-300"
                                        } placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                                />
                                <div className="absolute right-2 top-[30%] z-10">
                                    <button type="button" onClick={() => setShowPasswords({ ...showpasswords, showConfirmPassword: !showpasswords.showConfirmPassword })}>
                                        {showpasswords.showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>
                            {error.confirmPassword && (
                                <p className="mt-2 text-sm text-red-500">
                                    {error.confirmPassword}
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
                                "SignUp"
                            )}
                        </button>
                    </div>
                </form>
                <div className="">
                    <p className="text-base text-center font-semibold">Already have an account? <Link className="text-blue-600" to="/">Login</Link></p>
                </div>

                {successMessage && (
                    <div className="mt-4 bg-red-200 text-black-800 p-2 text-center rounded">
                        {successMessage}
                    </div>
                )}
        
               {showModal && ( <Modal 
                    heading={"Successfully"}
                    message={"User signup Succesfully!"}
                    modalHandleNavigate={modalHandleNavigate}
                    buttonText={"Ok"}
                    col
                />)}
            </div>
        </div>
    );
};

export default Signup;
