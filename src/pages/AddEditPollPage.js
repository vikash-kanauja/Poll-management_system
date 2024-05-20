
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import {
  addPoll,
  getSinglePoll,
  updatePoll,
  updatePollTitle,
} from "../redux/reducers/pollListReducer";
import { validateAddEditForm } from "../utils/validation";
import Modal from "../Components/Modal";

import {
  addOption,
  deleteOption,
  updateOption,
} from "../redux/reducers/optionReducer";

const AddEditPollPage = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [newPollData, setNewPollData] = useState({
    title: "",
    optionTitle: "",
  });
  const [pollOptions, setPollOptions] = useState([]);
  const [errors, setErrors] = useState({ title: "", optionTitle: "", optionLimit: "" });
  const [showAddEditModal, setAddEditShowModal] = useState(false);
  const [showDeletedModal, setShowDeletedModal] = useState(false);
  const [deleteSelectedIndex, setDeleteSelectedIndex] = useState(null);
  const [editOptionId, setEditOptionId] = useState(null);
  const { loading :isPollSubmitting } = useSelector((state) => state.pollList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getSinglePollDetails = async () => {
    if (state) {
      setNewPollData({ ...newPollData, title: state.title });
      setPollOptions(state.optionList);
    } else {
      const result = await dispatch(getSinglePoll(id));
      if (result?.payload?.status === 200) {
        setNewPollData({ ...newPollData, title: result?.payload?.data?.title });
        setPollOptions(result?.payload?.data?.optionList);
      }
    }
  };
  useEffect(() => {
    if (id) {
      getSinglePollDetails();
    } else {
      setNewPollData({ title: "", optionTitle: "" });
      setErrors({title: "", optionTitle: "", optionLimit: "" })
      setPollOptions([]);
    }
  }, [id]);

  const handleOptionChange = (e) => {
    setNewPollData({ ...newPollData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const addPollOptions = async () => {
    const { newErrors, isVallid } = validateAddEditForm({
      optionTitle: newPollData.optionTitle,
    });
    if (isVallid) {
      setPollOptions([...pollOptions, { optionTitle: newPollData.optionTitle }]);
      if (editOptionId) {
        const newOptions = [...pollOptions];
        newOptions[editOptionId.index].optionTitle = newPollData.optionTitle;
        setPollOptions(newOptions);
      }

      if (id && editOptionId?.id) {
        dispatch(
          updateOption({
            id: editOptionId.id,
            editedOption: newPollData.optionTitle,
          })
        );
      }

      if (id && !editOptionId?.id) {
        const result = await dispatch(
          addOption({
            id,
            optionTitle: newPollData.optionTitle,
          })
        );
        if (result?.payload?.status === 200) {
          const newOptions = [...pollOptions, result?.payload?.data.option];
          setPollOptions(newOptions);
        }
      }
      setEditOptionId(null);
      setNewPollData({ ...newPollData, optionTitle: "" });
      setErrors({...newErrors,optionLimit:""});
    } else {
      setErrors(newErrors);
    }
  };

  const deletePollOptions = () => {
    if (id) {
      const deleteOptionId = pollOptions[deleteSelectedIndex].id;
      const votedPollsOptions =
        JSON.parse(localStorage.getItem("VotedPollsOptions")) || {};
      if (votedPollsOptions[id] === deleteOptionId)
        delete votedPollsOptions[id]
      localStorage.setItem(
        "VotedPollsOptions",
        JSON.stringify(votedPollsOptions)
      );
      dispatch(deleteOption(deleteOptionId));
    }
    const newOptions = [...pollOptions];
    newOptions.splice(deleteSelectedIndex, 1);
    setPollOptions(newOptions);
    setShowDeletedModal(false);
    setDeleteSelectedIndex(null);
  };

  const updatePollOptions = (index) => {
    const option = pollOptions[index];
    setNewPollData({ ...newPollData, optionTitle: option?.optionTitle });
    setEditOptionId({ index, id: option?.id });

  };

  const handleShowModal = (data) => {
    if (data?.payload?.status === 200) {
      setAddEditShowModal(true);
    }
  };

  const onFormSubmit = async () => {
    const newPoll = {
      title: newPollData.title,
      pollOptions,
    };
    const { newErrors, isVallid } = validateAddEditForm({
      pollOptions,
      title: newPollData.title,
    });
    if (isVallid) {
      let result = {};
      if (id) {
        if (state.title !== newPollData.title) {
          result = await dispatch(updatePollTitle({ id, title: newPoll.title  }));
        }
        setAddEditShowModal(true);
      } else {
        result = await dispatch(addPoll(newPoll));
        handleShowModal(result);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className=' min-h-screen mx-auto bg-gray-200 p-4 '>
      <div className="w-[90%] md:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[30%] mx-auto mt-8 p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-center">
          {id ? "Update" : "Add"} Poll
        </h2>
        <div>
          <div className="mb-2">
            <label htmlFor="question" className="block mb-1">
              Poll title
            </label>
            <input
              type="text"
              id="question"
              name="title"
              placeholder="Enter Poll title"
              className="w-full border border-2 rounded-md p-2 mb-1 appearance-none outline-none"
              value={newPollData.title}
              onChange={handleOptionChange}
            />
            <p className="px-2 text-sm text-red-500">{errors.title}</p>
          </div>
          <div className="form-add-option ">
            <p className="add-option">Option</p>
            <div className="flex my-2 ">

              <input
                id="option"
                name="optionTitle"
                className="border border-2 border-r-0 rounded-l-md p-2 w-full outline-none"
                value={newPollData.optionTitle}
                onChange={handleOptionChange}
                placeholder="Enter Option"
              />
              <button
                className=" bg-blue-500 text-white rounded-r-md px-4 py-1"
                onClick={() => addPollOptions()}
              >
                Add
              </button>

            </div>
            <p className="px-2 text-sm text-red-500">{errors.optionTitle}</p>
          </div>
          <div className="flex flex-wrap  gap-2 p-4">
            {pollOptions.map((item, index) => (
              <div
                className="w-full flex justify-between bg-white border rounded-md p-2 mr-2 drop-shadow-md m-1"
                key={index}
              >
                {item.optionTitle}
                <div className="flex">
                  <button
                    className="mx-2"
                    onClick={() => updatePollOptions(index)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className=" text-red-500 text-lg cursor-pointer"
                    onClick={() => {
                      if (pollOptions.length > 2) {
                        setDeleteSelectedIndex(index);
                        setShowDeletedModal(true);
                        setErrors({ ...errors, optionLimit: "" });
                      } else {
                        setErrors({ ...errors, optionLimit: "Can't delete option. There must be at least two options" });
                      }
                    }}
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            ))}
            { errors.optionLimit &&  <p className="px-2 text-sm text-red-500">{errors.optionLimit}</p>}
          </div>
          <div className="w-full text-center mt-6">
            <button
              type="button"
              className=" bg-green-600 text-white text-semibold py-2 px-4 rounded transition duration-200"
              onClick={() => onFormSubmit()}
              disabled={isPollSubmitting}
            >
              {isPollSubmitting ? (
                <div className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-secondary motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              ) : (
                id ? "Update" : "Add Poll"
              )}
            </button>
          </div>
        </div>
        {showAddEditModal && (
          <Modal
            heading={"Successfully"}
            message={`Poll ${id ? "updated" : "Added"
              } successfully!!`}
            buttonText={"Ok"}
            clickOkButton={() => {
              navigate("/polling");
              setAddEditShowModal(false);
            }}
          />
        )}
        {showDeletedModal && (
          <Modal
            buttonText={"Delete"}
            cancelButtonText={"Cancel"}
            cancleButton={() => setShowDeletedModal(false)}
            heading={"Delete"}
            message={"Are You Sure? you want delete this item "}
            clickOkButton={deletePollOptions}
            buttonColor={"bg-red-500"}
          />
        )}
      </div>
    </div>
  );
};

export default AddEditPollPage;