import { createSlice } from "@reduxjs/toolkit";
import { baseApi } from "../../helpers/baseApi";

const imageSlice = createSlice({
    name: 'images',
    initialState: {
        list: [],
    },
    reducers: {
        setImagesData: (state, action) => {
            state.list = action.payload;
        }
    }
});

export const { setImagesData } = imageSlice.actions;

export const fetchMyImages = () => async (dispatch) => {
    try {
      const {data}  = await baseApi.get('/image', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
    //   console.log(data ,"ini data ");
      dispatch(setImagesData(data));
    } catch (err) {
      console.error(err);
    }
};

export default imageSlice.reducer;