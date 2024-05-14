import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPollList, votedPollOption, deleteSinglePoll } from "../redux/reducers/pollListReducer";
import PollItems from "../Components/PollItems";
import Modal from "../Components/Modal";
const Poll = () => {
  const [pageNo, setPageNo] = useState(1);
  const [polls, setPolls] = useState([])
  const [showDeletedNodal, setShowDeletedModal] = useState(false)
  const [selectedPoll, setSelectedPoll] = useState(null)

  const dispatch = useDispatch()
  const { pollList, loading, pollListLength } = useSelector(
    (state) => state.pollList
  );
  useEffect(() => {
    dispatch(getPollList(pageNo));
  }, [pageNo])

  useEffect(() => {
    if (pageNo === 1) {
      setPolls(pollList);
    } else {
      setPolls([...polls, ...pollList]);
    }
  }, [pollList]);

  const increaseVoteCount = (pollId, optionId) => {
    const updatedPolls = polls?.map((poll) => {
      if (poll.id === pollId) {
        const updatedOptions = poll.optionList?.map((option) => {
          if (option.id === optionId) {
            return {
              ...option,
              voteCount: [...option.voteCount, { optionId }],
            };
          }
          return option;
        });
        return { ...poll, optionList: updatedOptions };
      }
      return poll;
    });
    setPolls(updatedPolls);
    dispatch(votedPollOption(optionId));
  };

  const showDeleteModal = (poll) => {
    setSelectedPoll(poll);
    setShowDeletedModal(true);
  };
  const deletePoll = () => {
    dispatch(deleteSinglePoll(selectedPoll.id));
    setShowDeletedModal(false);
    setSelectedPoll(null);
    setPolls(polls.filter((poll) => poll.id !== selectedPoll.id));
  };

  return pollList?.length === 0 ? (
    <div className="text-center w-full min-h-screen mx-auto w-full flex justify-center items-center ">
      <div class="border-gray-300 h-10 w-10 animate-spin rounded-full border-8 border-t-blue-600" />
    </div>
  ) : ( <div className='min-h-screen  mx-auto bg-gray-200 '>
    <h1 className="text-4xl font-semibold text-center py-4">Poll List</h1>
    <div className="flex gap-6 justify-center flex-wrap items-center ">
      {
        polls.map((poll, index) => {
          return <PollItems
            poll={poll}
            key={index}
            increaseVoteCount={increaseVoteCount}
            showDeleteModal={showDeleteModal} />
        })
      }
    </div>
    <div className="text-center">
      <button
      onClick={() =>
        setPageNo((prevPageNumber) => prevPageNumber + 1)
      }
      className={`mx-auto w-[120px] py-2 mt-10 px-4 ${pollListLength !== 10 ? "bg-gray-400" : "bg-blue-400"
        } rounded-md mb-10`}
      disabled={pollListLength !== 10}
      >
        {loading ? (
          <div className="flex items-center">
            <div className="relative w-5 h-5">
              <div className="w-full h-full rounded-full absolute "></div>
              <div className="w-full h-full rounded-full animate-spin absolute border-4 border-solid border-green-500 border-t-transparent"></div>
            </div>
          </div>
        ) : (
          "Load More"
        )}
      </button>
    </div>
    {showDeletedNodal && (
      <Modal
        buttonText={"Delete"}
        cancelButtonText={"Cancel"}
        cancleButton={() => setShowDeletedModal(false)}
        heading={"Delete"}
        message={"Are You Sure? you want delete this item "}
        clickOkButton={deletePoll}
        btnColor={"bg-red-500"}
      />
    )}

  </div>
  )
}

export default Poll
