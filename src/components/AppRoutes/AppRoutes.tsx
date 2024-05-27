import { Route, Routes } from 'react-router-dom'
import SingleCategory from '../Categories/SingleCategory'
import Home from '../Home/Home'
import SingleProduct from '../Products/SingleProduct'
import Profile from '../Profile/Profile'
import { ROUTES } from '../utils/routes'

const AppRoutes = (): JSX.Element => {
	return (
		<Routes>
			<Route index element={<Home />} />
			<Route path={ROUTES.PRODUCT} element={<SingleProduct/>}/>
			<Route path={ROUTES.PROFILE} element={<Profile/>}/>
			<Route path={ROUTES.CATEGORY} element={<SingleCategory/>} />
		</Routes>
	);
};

export default AppRoutes;
