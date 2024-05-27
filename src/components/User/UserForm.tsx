import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../features/store';
import { toggleForm, toggleFormType } from '../../features/user/userSlice';
import styles from '../../styles/User.module.css';
import UseLoginForm from './UseLoginForm';
import UserSingUpForm from './UserSingUpForm';
const UserForm = () => {
	const { showForm, formType } = useSelector((s: RootState) => s.user);
	const dispatch = useDispatch();

	
	const closeForm = () => {
		dispatch(toggleForm(false));
	};
	const toggleUserForm = (type:string) => {
		dispatch(toggleFormType(type));
	};
	return showForm ? (
		<>
			<div className={styles.overlay} onClick={closeForm}></div>
			{formType === 'signup' ? (
				<UserSingUpForm  closeForm={closeForm} toggleUserForm = {toggleUserForm}/>
			) : (
				<UseLoginForm   closeForm={closeForm} toggleUserForm={toggleUserForm}/>
			)}
		</>
	) : (
		<></>
	);
};

export default UserForm;
