

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserList } from '../redux/reducers/userListReducer'
import { NumberOfUserPerPage } from "../utils/constantValue";

const UserList = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const dispatch = useDispatch();
  const { userList, loading } = useSelector((state) => state.userList);

  useEffect(() => {
    dispatch(getUserList({ page: pageNumber, limit: pageLimit }));
  }, [pageNumber, pageLimit]);

  return (
    <div className="w-[90%] max-w-4xl mx-auto mt-8 p-0 py-4 px-2 sm:p-8  rounded">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">User List</h2>
      
      <table className="w-full text-left">
        <thead>
          <tr>
            <th>
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
          {loading ? (
            <tr>
              <td colSpan="3" className="text-center py-4">
                <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-secondary motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              </td>
            </tr>
          ) : (
            userList &&
            userList?.map((user, index) => (
              <tr key={index}>
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
                  {user.roleId === 1 ? "USER" : "ADMIN"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;