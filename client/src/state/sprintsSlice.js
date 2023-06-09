import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { privateInstance } from "../utils/apiInstances";
import { STATUS } from "../utils/enums";

const initialState = { activeSprint: null, sprints: [], status: STATUS.IDLE };

const sprintsSlice = createSlice({
  name: "sprints",
  initialState,
  reducers: {
    setSprints: (state, action) => ({ ...state, sprints: action.payload }),
    setActiveSprint: (state, action) => ({
      ...state,
      activeSprint: action.payload,
    }),
    setStatus: (state, action) => ({
      ...state,
      status: action.payload,
    }),
  },
});

export const { setSprints, setActiveSprint, setStatus } = sprintsSlice.actions;
export default sprintsSlice.reducer;

export const createUserSprint =
  ({ toggleLoading, name, handleClose }) =>
  (dispatch) => {
    dispatch(setStatus(STATUS.LOADING));
    privateInstance
      .post("/api/sprint", {
        name,
      })
      .then(() => {
        handleClose();
        toast.success("Created successfully!");
        dispatch(fetchUserSprints({ toggleLoading }));
      })
      .catch(() => {
        toast.error("Something went wrong. Try again..!");
      })
      .finally(() => dispatch(setStatus(STATUS.IDLE)));
  };

export const fetchUserSprints =
  ({ toggleLoading, setActive = false }) =>
  (dispatch) => {
    toggleLoading();
    privateInstance
      .get("/api/sprint")
      .then(({ data }) => {
        dispatch(setStatus(STATUS.IDLE));
        dispatch(setSprints(data.data));
        if (setActive) {
          dispatch(setActiveSprint(data?.data[0]._id));
        }
      })
      .catch((err) => {
        dispatch(setStatus(STATUS.ERROR));
      })
      .finally(toggleLoading);
  };

export const deleteSprint =
  ({ sprintId, toggleLoading, handleClose }) =>
  (dispatch) => {
    privateInstance
      .delete(`/api/sprint/${sprintId}`)
      .then(() => {
        handleClose();
        toast.success("Deleted successfully");
        dispatch(fetchUserSprints({ toggleLoading, setActive: true }));
      })
      .catch((err) => {
        const message = err?.response?.data?.message;
        toast.error(message || "Something went wrong.");
      });
  };

export const editSprint =
  ({ name, id, handleClose, toggleLoading }) =>
  (dispatch) => {
    dispatch(setStatus(STATUS.LOADING));
    privateInstance
      .patch(`/api/sprint/${id}`, { name })
      .then(() => {
        toast.success("Edited successfully");
        dispatch(fetchUserSprints({ toggleLoading }));
        handleClose();
      })
      .catch((err) => {
        const message = err?.response?.data?.message;
        toast.error(message || "Something went wrong.");
      })
      .finally(() => dispatch(setStatus(STATUS.IDLE)));
  };
