import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPollList, votedPollOption, deleteSinglePoll } from "../redux/reducers/pollListReducer";
import PollItems from "../Components/PollItems";
import Modal from "../Components/Modal";
import ChartModal from "../Components/ChartModal";
const Poll = () => {
  const [pageNo, setPageNo] = useState(1);
  const [polls, setPolls] = useState([])
  const [showDeletedNodal, setShowDeletedModal] = useState(false)
  const [showPollChart,setShowPollChart] = useState(false)
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
  const showPollChartModal = (poll) => {
    setShowPollChart(true);
    setSelectedPoll(poll);
  };
  return pollList?.length === 0 ? (
    <div className="text-center w-full min-h-screen mx-auto flex bg-gray-200 justify-center items-center ">
      <div className="border-gray-300 h-10 w-10 animate-spin rounded-full border-8 border-t-blue-600" />
    </div>
  ) : ( <div className=' min-h-screen mx-auto bg-gray-200 p-4 '>
    <h1 className="text-4xl font-semibold text-center py-4">Poll List</h1>
    <div className="flex gap-8 md:gap-12 xl:gap-8 xl:gap-14 flex-wrap items-center ">
      {
        polls.map((poll, index) => {
          return <PollItems
            poll={poll}
            key={index}
            increaseVoteCount={increaseVoteCount}
            showDeleteModal={showDeleteModal} 
            showPollChartModal={showPollChartModal}/>
        })
      }
    </div>
    <div className="text-center m-4">
      <button
      onClick={() =>
        setPageNo((prevPageNumber) => prevPageNumber + 1)
      }
      className={`mx-auto w-[120px] py-2 m-5 px-4 ${pollListLength !== 10 ? "bg-gray-400" : "bg-blue-400"
        } rounded-md  flex justify-center`}
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
    {showPollChart && (
        <ChartModal data={selectedPoll} setShowPollChart={setShowPollChart} />
      )}
    {showDeletedNodal && (
      <Modal
        buttonText={"Delete"}
        cancelButtonText={"Cancel"}
        cancleButton={() => setShowDeletedModal(false)}
        heading={"Delete"}
        message={"Are You Sure? you want delete this item "}
        clickOkButton={deletePoll}
        buttonColor={"bg-red-500"}
      />
    )}

  </div>
  )
}

export default Poll
