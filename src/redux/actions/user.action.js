import { createAsyncThunk } from "@reduxjs/toolkit";
import APIs, { apiCaller, endpoints } from "../../configs/APIs";

// Thunk để gọi API
export const USER_ACTION_LOGIN = createAsyncThunk(
  "USER/LOGIN",
  async (args, thunkAPI) => {
    const { studentID, password } = args

    if(!(studentID && password)) {
      return null
    }
  
    var api = apiCaller(endpoints["login"])
    var response = await api.post({
      studentID: studentID,
      password: password,
    });
    return response.data.data;
  }
);
