import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

// Register User
export const registerUser = (userData) => (dispatch) => {
  var promise = axios
    .post("/api/users/register", userData)
    .then((res) => {
      console.log("Api successful");
      return true;
    })
    .catch((err) => {
      console.log("Api un-successful");
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
      return false;
    });

  return promise;
};

export const requestLeave = (leaveData) => (dispatch) => {
  console.log("Printing the body of the req \n");
  console.log(leaveData);
  var promise = axios
    .post("/api/users/applyLeave", leaveData)
    .then((res) => {
      console.log("New leave registered successfully");
      return true;
    })
    .catch((err) => {
      console.log("Error creating a leave request");
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
      console.log(err);
      return false;
    });

  return promise;
};

export const updateUser = (userData) => (dispatch) => {
  var promise = axios
    .post("/api/users/updateUser", userData)
    .then((res) => {
      console.log("User updated");
      console.log(res);
      return true;
    })
    .catch((err) => {
      console.log("Update user failed");
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
      return false;
    });
  return promise;
};

export const findUserDetails = (userData) => (dispatch) => {
  var promise = axios
    .get("/api/users/getUserDetails", userData)
    .then((res) => {
      console.log("Getting user data" + res);
      return res;
    })
    .catch((err) => {
      console.log("Getting user data failed");
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
      return false;
    });
  return promise;
};

// Login - get user token
export const loginUser = (userData) => (dispatch) => {
  axios
    .post("/api/users/login", userData)
    .then((res) => {
      console.log(res);
      // Save to localStorage

      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      console.log("seeing decoded");
      console.log(decoded);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

// Log user out
export const logoutUser = () => (dispatch) => {
  console.log("Logout function called");
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
