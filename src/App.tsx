import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AppRoutes from './components/AppRoutes/AppRoutes';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import { getCategories } from './features/categories/categoriesSlice';
import { getProducts } from './features/products/productsSlice';
import { AppDispatch } from './features/store';
import './styles/global.css';
import UserForm from './components/User/UserForm'

const App = () => {
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		dispatch(getCategories());
		dispatch(getProducts());
	}, [dispatch]);
	return (
		<div className='app'>
			<Header />
			<UserForm/>
			<div className='container'>
				<Sidebar />
				<AppRoutes />
			</div>
			<Footer />
		</div>
	);
};

export default App;
