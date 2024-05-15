import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUser } from '../redux/reducers/authSlice';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaChartArea } from "react-icons/fa";


import { ADMIN_ID } from '../utils/constantValue';

const PollItems = ({ poll, increaseVoteCount,showDeleteModal,showPollChartModal}) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [voted, setVoted] = useState(false);

    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser());
    }, []);

    useEffect(() => {
        const votedPollStatus =
            JSON.parse(localStorage.getItem("VotedPollsOptions")) || {};
        const userVotedOption = votedPollStatus[poll.id];
        if (userVotedOption) {
            setSelectedOption(userVotedOption);
            setVoted(true);
        } else {
            setSelectedOption(null);
            setVoted(false);
        }
    }, [poll.id]);

    const submitVote = (e) => {
        e.preventDefault();
        if (!voted && selectedOption) {
            const votedPollStatus =
                JSON.parse(localStorage.getItem("VotedPollsOptions")) || {};
            votedPollStatus[poll.id] = selectedOption;
            localStorage.setItem(
                "VotedPollsOptions",
                JSON.stringify(votedPollStatus)
            );
            increaseVoteCount(poll.id, selectedOption);
            setVoted(true);
        }
    };

    return (
        

            <div className=" py-4 px-4 md:pb-8 border w-[100%] md:w-[45%]  lg:w-[30%] xl:w-[22%] rounded-lg drop-shadow-md bg-white">
            {user?.roleId === ADMIN_ID && (
                    <div className="flex gap-4 justify-end mb-3 mr-2 drop-shadow-md">
                        <MdDelete
                            onClick={()=>showDeleteModal(poll)}
                            className=" text-red-500 text-lg cursor-pointer"
                        />
                        <Link to={`/editpoll/${poll.id}`} state={poll}>
                            <FaEdit className="text-green-600 text-lg cursor-pointer drop-shadow-md" />
                        </Link>
                        <FaChartArea
                            onClick={()=>showPollChartModal(poll)}
                            className=" text-blue-400 text-lg cursor-pointer drop-shadow-md"
                        />
                    </div>
                )}
                <div className="text-center mb-4">
                    <h2 className="text-lg lg:text-2xl font-semibold drop-shadow-md">{poll.title}</h2>
                </div>
                <form onSubmit={submitVote}>
                    {poll.optionList?.map((option, index) => (

                        <div key={index} className="flex">
                            <input
                                type="radio"
                                id={`option${option.id}`}
                                name="pollOption"
                                value={option.id}
                                checked={option.id === selectedOption}
                                onChange={() => {
                                    setSelectedOption(option.id)
                                }}
                                disabled={voted}
                            />
                            <label htmlFor={`option${option.id}`} className="w-full ml-3 flex bg-gray-100 text-gray-700 rounded-md px-3 py-2 my-3  hover:bg-indigo-300 cursor-pointer drop-shadow-md">
                                {option.optionTitle}
                            </label>
                        </div>
                    ))}
                    <div className=" w-full mx-auto flex justify-center drop-shadow-md ">
                        <button
                            type="submit"
                            className={` ${voted ? "bg-gray-400" : "bg-blue-700"
                                } text-white mt-5  py-2 px-4 rounded ${!voted && "hover:bg-blue-600"
                                } transition duration-200`}
                            disabled={voted}>
                            {voted ? "Voted" : "Submit"}
                        </button>
                    </div>
                </form>
                
            </div>

    )
}

export default PollItems
