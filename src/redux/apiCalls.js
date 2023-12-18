import {
  loginFailure,
  loginStart,
  loginSuccess,
  logout,
  updateFailure,
  updateStart,
  updateSuccess,
} from "./userRedux";
import { userRequest } from "./requestMethod";
import { toast } from "react-toastify";
import { processFailure, processStart, processSuccess } from "./processRedux";

export const loginRegister = async (
  dispatch,
  url,
  user,
  setMessage,
  setModalTxt
) => {
  dispatch(loginStart());
  try {
    const res = await userRequest.post(url, user);
    dispatch(loginSuccess(res.data));
    window.location.reload();
    setMessage("Registration successful!");
    setModalTxt("Registration successful!");
  } catch (err) {
    dispatch(loginFailure());
    setMessage(err.response.data);
  }
};

export const update = async (dispatch, url, user, setMessage, setModalTxt) => {
  dispatch(updateStart());
  try {
    const res = await userRequest.put(url, user);
    dispatch(updateSuccess(res.data));
    setModalTxt("save");
    toast.success("Data updated successfully, kindly referesh.");
  } catch (err) {
    dispatch(updateFailure());
    return setMessage(err.response.data);
  }
};

export const userLogout = async (dispatch) => {
  dispatch(logout());
};

export const makePost = async (dispatch, url, data, setMessage) => {
  dispatch(processStart());
  try {
    const res = await userRequest.post(url, data);
    dispatch(processSuccess());
    toast.success("Data uploaded successfully.");
    setMessage("Data uploaded successfully.");
    res.data && window.location.reload();
  } catch (err) {
    setMessage(err?.response?.data);
    dispatch(processFailure());
  }
};

export const makeGet = async (dispatch, url, setMessage) => {
  dispatch(processStart());
  try {
    const res = await userRequest.get(url);
    dispatch(processSuccess());
    setMessage(res.data);
  } catch (err) {
    dispatch(processFailure());
    toast.error(err?.response?.data);
  }
};

export const makeEdit = async (dispatch, url, inputs) => {
  dispatch(processStart());
  try {
    const res = await userRequest.put(url, inputs);
    dispatch(processSuccess());
    toast.success("Data uploaded successfully.");
    alert("Data uploaded successfully.");
    res.data && window.location.reload();
  } catch (err) {
    dispatch(processFailure());
  }
};
