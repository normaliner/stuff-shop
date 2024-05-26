import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByPrice } from '../../features/products/productsSlice';
import { AppDispatch, RootState } from '../../features/store';
import Banner from '../Banner/Banner';
import Categories from '../Categories/Categories';
import Poster from '../Poster/Poster';
import Products from '../Products/Products';

const Home = () => {
	const { products, categories } = useSelector((s: RootState) => s);
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		if (!products.list?.length) {
			return;
		}
		dispatch(filterByPrice(50));
	}, [dispatch, products.list?.length]);
	return (
		<>
			<Poster />
			<Products products={products.list} amount={5} title='Trending' />
			<Categories
				categories={categories.list}
				amount={5}
				title='Worth seeing'
			/>
			<Banner />
			<Products products={products.filtered} amount={5} title='Less than 50$' />
		</>
	);
};

export default Home;
