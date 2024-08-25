import { createAsyncThunk } from "@reduxjs/toolkit";
import APIs, { apiCaller, endpoints } from "../../configs/APIs";

// Thunk để gọi API
export const USER_ACTION_LOGIN = createAsyncThunk(
  "USER/LOGIN",
  async (args, thunkAPI) => {
    const { studentID, password } = args;

    if (!(studentID && password)) {
      return null;
    }

    try {
      var api = apiCaller(endpoints["login"]);
      var response = await api.post({
        studentID: studentID,
        password: password,
      });
      return response.data.data;
    } catch (error) {
      let errorMessage = "An error occurred during login.";
      let errors = error.response.data;


      let ERROR_BOX = {
        status: error.response.status,
        response: error.response.data
      }


      console.log("ERROR_BOX", ERROR_BOX)



      // if (error.response) {
      //   // Nếu server trả về lỗi (ví dụ: 400, 401, 500)
      //   errorMessage = error.response.data?.message || "Login failed.";
      // } else if (error.request) {
      //   // Nếu không nhận được phản hồi từ server
      //   errorMessage = "No response received from server.";
      // } else {
      //   // Nếu có lỗi xảy ra trong quá trình xử lý yêu cầu
      //   errorMessage = error.message;
      // }
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
