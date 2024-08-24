import { createAsyncThunk } from "@reduxjs/toolkit";
import APIs, { apiCaller, endpoints } from "../../configs/APIs";

// Thunk để gọi API
export const POST_ACTION_GETALL = createAsyncThunk(
  "POST/GETALL",
  async (thunkAPI) => {
    var api = apiCaller(endpoints["posts"])
    var response = await api.get();
    return response.data.data;
  }
);

