import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { buildUrl } from '../../components/utils/common';
import { BASE_URL } from '../../components/utils/constants';
import { IProduct } from '../products/productsSlice';

export interface IRequestParams {
	title: string;
	price_min?: number;
	price_max?: number;
	categoryId?: string;
}
export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
	tagTypes: ['Product', 'Products'],
	endpoints: builder => ({
		getProduct: builder.query<IProduct, { id: string }>({
			query: ({ id }) => `/products/${id}`,
			providesTags: ['Product'],
		}),
		getProducts: builder.query<IProduct[], IRequestParams>({
			query: params => buildUrl('/products', params),
			providesTags: ['Products'],
		}),
	}),
});

export const { useGetProductQuery, useGetProductsQuery } = apiSlice;
