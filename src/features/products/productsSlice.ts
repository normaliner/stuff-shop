import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { shuffle } from '../../components/utils/common';
import { BASE_URL } from '../../components/utils/constants';
import { ICategory } from '../categories/categoriesSlice';

export interface IProduct {
	id: number;
	title: string;
	price: number;
	description: string;
	category: ICategory;
	images: string[];
	quantity?: number;
	favourites?: number;
}

export const getProducts = createAsyncThunk(
	'products/getProducts',
	async () => {
		try {
			const res = await axios<IProduct[]>(`${BASE_URL}/products`);
			return res.data;
		} catch (e) {
			if (e instanceof AxiosError) {
				throw new Error(e.response?.data.message);
			}
		}
	}
);

interface IInitialState {
	list?: IProduct[];
	isLoading: boolean;
	filtered?: IProduct[];
	related?: IProduct[];
}

const initialState: IInitialState = {
	list: [],
	isLoading: false,
	filtered: [],
	related: [],
};

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		filterByPrice: (state, action) => {
			state.filtered = state.list?.filter(p => p.price < action.payload);
		},
		getRelatedProducts: (state, action) => {
			const list = state.list?.filter(
				({ category: { id } }) => id === action.payload
			);
			state.related = shuffle(list as IProduct[]);
		},
	},
	extraReducers: builder => {
		builder.addCase(getProducts.pending, state => {
			{
				state.isLoading = true;
			}
		});
		builder.addCase(getProducts.fulfilled, (state, action) => {
			{
				state.list = action.payload;
				state.isLoading = false;
			}
		});
		builder.addCase(getProducts.rejected, state => {
			{
				state.isLoading = false;
			}
		});
	},
});

export default productsSlice.reducer;
export const { filterByPrice, getRelatedProducts } = productsSlice.actions;
