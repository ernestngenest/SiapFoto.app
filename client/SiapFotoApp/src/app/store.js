import { configureStore } from '@reduxjs/toolkit';
import imageReducer from '../features/fetchImage/fetchImage'; // Import the correct slice

const store = configureStore({
  reducer: {
    images: imageReducer, // Add your image slice reducer here
  },
});

export default store;