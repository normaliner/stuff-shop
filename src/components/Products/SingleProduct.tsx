import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProductQuery } from '../../features/api/apiSlice';
import { getRelatedProducts } from '../../features/products/productsSlice';
import { RootState } from '../../features/store';
import { ROUTES } from '../utils/routes';
import Product from './Product';
import Products from './Products';

const SingleProduct = () => {
	const { id } = useParams<string>();
	if (!id) {
		throw new Error('No product ID provided');
	}
	const { data, isLoading, isFetching, isSuccess } = useGetProductQuery({ id });
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { list, related } = useSelector((s: RootState) => s.products);

	useEffect(() => {
		if (!isFetching && !isLoading && !isSuccess) {
			navigate(ROUTES.HOME);
		}
	}, [isLoading, isFetching, isSuccess, navigate]);

	useEffect(() => {
		if (!data || !list?.length) return;
		dispatch(getRelatedProducts(data.category.id));
	}, [data, list, dispatch]);
	return !data ? (
		<section className='preloader'>Loading...</section>
	) : (
		<>
			<Product {...data} />
			<Products products={related} amount={5} title='Related products' />
		</>
	);
};

export default SingleProduct;
