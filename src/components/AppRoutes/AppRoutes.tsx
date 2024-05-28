import { Route, Routes } from 'react-router-dom'
import SingleCategory from '../Categories/SingleCategory'
import Home from '../Home/Home'
import SingleProduct from '../Products/SingleProduct'
import Profile from '../Profile/Profile'
import { ROUTES } from '../utils/routes'
import Cart from '../Cart/Cart'
import Favourites from '../Favourites/Favourites'

const AppRoutes = (): JSX.Element => {
	return (
		<Routes>
			<Route index element={<Home />} />
			<Route path={ROUTES.PRODUCT} element={<SingleProduct/>}/>
			<Route path={ROUTES.PROFILE} element={<Profile/>}/>
			<Route path={ROUTES.CATEGORY} element={<SingleCategory/>} />
			<Route path={ROUTES.CART} element={<Cart/>} />
			<Route path={ROUTES.FAVOURITES} element={<Favourites/>} />
		</Routes>
	);
};

export default AppRoutes;
