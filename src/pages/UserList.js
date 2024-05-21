import React, { useState, useEffect } from "react";
import { MdArrowCircleLeft, MdArrowCircleRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getUserList } from '../redux/reducers/userListReducer'
import { pageLimitRange } from "../utils/constantValue";
import { ADMIN_ID } from "../utils/constantValue";

const UserList = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const dispatch = useDispatch();
  const { userList, loading:isUserListLoaded } = useSelector((state) => state.userList);

  const handlePageLimit = (e) => {
    setPageNumber(1)
    setPageLimit(e.target.value)
  }
  useEffect(() => {
    dispatch(getUserList({ page: pageNumber, limit: pageLimit }));
  }, [pageNumber, pageLimit]);

  return (
    <div className="min-h-screen mx-auto bg-gray-200 p-4">
      <div className=" max-w-4xl mx-auto mt-8 p-0 py-4 px-2 sm:p-8 rounded bg-white ">
        <h2 className="text-lg sm:text-xl font-bold mb-4 text-center">User List</h2>
        <table className=" w-full text-left border">
          <thead>
            <tr className="bg-sky-700 text-white">
              <th className="text-sm sm:text-base px-4 sm:px-4 py-2">
                Id
              </th>
              <th className=" text-sm sm:text-base px-4 sm:px-4 py-2">
                Name
              </th>
              <th className="text-sm sm:text-base px-1 sm:px-4 py-2">
                Email
              </th>
              <th className=" text-sm sm:text-base px-1 sm:px-4 py-2">
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            {isUserListLoaded ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-secondary motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                </td>
              </tr>
            ) : (
              userList &&
              userList?.map((user, index) => (
                <tr key={index} className="hover:bg-gray-100 ">
                  <td className="border-b text-xs sm:text-sm md:text-base px-1 sm:px-4 py-2">
                    {user.id}
                  </td>
                  <td className="border-b text-xs sm:text-sm md:text-base px-1 sm:px-4 py-2">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="border-b text-xs sm:text-sm md:text-base px-1 sm:px-4 py-2">
                    {user.email}
                  </td>
                  <td className="border-b text-xs sm:text-sm md:text-base px-1 sm:px-4 py-2">
                    {user.roleId === ADMIN_ID ? "admin" : "user"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="flex items-center justify-between items-center mt-8">
          <div className=" text-sm sm:text-base flex items-center">
            <label htmlFor="perPage " className="font-bold ">Entries per page:</label>
            <select
              id="perPage"
              value={pageLimit}
              onChange={handlePageLimit}
              className="ml-2 border rounded px-1 py-1">
              {pageLimitRange.map((value, index) => {
                return (
                  <option key={index} value={value}>
                    {value}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex ">
          <button
            onClick={() => setPageNumber(pageNumber - 1)}
            disabled={pageNumber === 1 || isUserListLoaded}
            className={`${pageNumber === 1 || isUserListLoaded ? "text-gray-500" : "text-blue-800"} sm:text-3xl text-xl p-1  rounded
            transition duration-200 border hover:bg-blue-200`} >
            <MdArrowCircleLeft />
          </button>
          <div className="text-md p-2 font-bold">Page {pageNumber}</div>
          <button
            onClick={() => setPageNumber(pageNumber + 1)}
            disabled={userList?.length < pageLimit || isUserListLoaded}
            className={` ${userList?.length < pageLimit || isUserListLoaded ? "text-gray-500" : "text-blue-800"
              } md:text-3xl  p-1 rounded
             text-xl p-1 border transition duration-200 hover:bg-blue-200`}>
            <MdArrowCircleRight />
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;