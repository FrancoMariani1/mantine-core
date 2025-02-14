import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice'; // Importa el slice

const store = configureStore({
 reducer: {
 user: userReducer, // Agrega el slice en el store
 },
});

export default store;