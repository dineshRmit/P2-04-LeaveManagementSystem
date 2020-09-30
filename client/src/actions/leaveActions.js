import axios from "axios";

export const requestLeave = (leaveData) => {
  console.log("Printing the body of the req \n");
  console.log(leaveData);
  var promise = axios
    .post("api/users/applyLeave", leaveData)
    .then((res) => {
      console.log("New leave registered successfully");
      return true;
    })
    .catch((err) => {
      console.log("Error creating a leave request");
      console.log(err);
      return false;
    });

  return promise;
};
