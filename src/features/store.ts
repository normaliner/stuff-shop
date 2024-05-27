import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import categoriesSlice from './categories/categoriesSlice';
import productsSlice from './products/productsSlice';
import userSlice from './user/userSlice';

export const store = configureStore({
	reducer: {
		categories: categoriesSlice,
		products: productsSlice,
		[apiSlice.reducerPath]: apiSlice.reducer,
		user: userSlice,
	},
	middleware: getMiddleware => getMiddleware().concat(apiSlice.middleware),
	devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
