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

//Request leave
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

export const updateLeaveStatus = (leaveData) => (dispatch) => {
  var promise = axios
    .post("/api/users/updateLeaveStatus", leaveData)
    .then((res) => {
      console.log("Leave updated");
      console.log(res);
      return true;
    })
    .catch((err) => {
      console.log("Leave update failed");
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
      return false;
    });
  return promise;
};

//Update Annual leave balance
export const updateAnnualLeaveBalance = (leaveBalanceData) => (dispatch) => {
  var promise = axios
    .post("/api/users/updateAnnualLeaveBalance", leaveBalanceData)
    .then((res) => {
      console.log("Leave balance updated");
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

//Update Carers leave balance
export const updateCarersLeaveBalance = (leaveBalanceData) => (dispatch) => {
  var promise = axios
    .post("/api/users/updateCarersLeaveBalance", leaveBalanceData)
    .then((res) => {
      console.log("Leave balance updated");
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

//Update BloodDonor leave balance
export const updateBloodDonorLeaveBalance = (leaveBalanceData) => (dispatch) => {
  var promise = axios
    .post("/api/users/updateBloodDonorLeaveBalance", leaveBalanceData)
    .then((res) => {
      console.log("Leave balance updated");
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

//Update SickLeaveWC leave balance
export const updateSickLeaveWCBalance = (leaveBalanceData) => (dispatch) => {
  var promise = axios
    .post("/api/users/updateSickLeaveWCBalance", leaveBalanceData)
    .then((res) => {
      console.log("Leave balance updated");
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

//Update SickLeaveWOC leave balance
export const updateSickLeaveWOCBalance = (leaveBalanceData) => (dispatch) => {
  var promise = axios
    .post("/api/users/updateSickLeaveWOCBalance", leaveBalanceData)
    .then((res) => {
      console.log("Leave balance updated");
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

//Update ParentalLeave leave balance
export const updateParentalLeaveBalance = (leaveBalanceData) => (dispatch) => {
  var promise = axios
    .post("/api/users/updateParentalLeaveBalance", leaveBalanceData)
    .then((res) => {
      console.log("Leave balance updated");
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

//Update UnpaidLeave leave balance
export const updateUnpaidLeaveBalance = (leaveBalanceData) => (dispatch) => {
  var promise = axios
    .post("/api/users/updateUnpaidLeaveBalance", leaveBalanceData)
    .then((res) => {
      console.log("Leave balance updated");
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

export const findUserDetails = (userEmail) => (dispatch) => {
  var promise = axios
    .get(`/api/users/getUserDetails/${userEmail}`)
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

//Get leave request
export const getLeaveRequest = (managerEmail) => (dispatch) => {
  console.log(managerEmail);
  var promise = axios
    .get(`/api/users/getLeaveRequest/${managerEmail}`)
    .then((res) => {
      console.log("Getting leave data" + res);
      return res;
    })
    .catch((err) => {
      console.log("Getting leave data failed");
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
      return false;
    });
  return promise;
};

// Update Leave request
export const updateLeaveRequest = (leaveRequestID) => (dispatch) => {
  var promise = axios
    .post("/api/users/updateLeaveRequest", leaveRequestID)
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

export const updateReduxStore = (newData) => (dispatch) => {
  console.log("Displaying the update redux data" + newData);
  //dispatch(setCurrentUser(newData));
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
