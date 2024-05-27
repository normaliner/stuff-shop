import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../features/store';
import { loginUser } from '../../features/user/userSlice';
import styles from '../../styles/User.module.css';
import { IUserForm } from './UserSingUpForm'



const UseLoginForm = ({  closeForm, toggleUserForm }: IUserForm) => {
	const dispatch = useDispatch<AppDispatch>();
	const [values, setValues] = useState({
		email: '',
		password: '',
	});
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });
	};
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		const isNotEmpty = Object.values(values).some(val => val);

		if (!isNotEmpty) return;

		dispatch(loginUser(values));
		closeForm();
	};
	return (
		<div className={styles.wrapper}>
			<div className={styles.close} onClick={closeForm}>
				<svg className='icon'>
					<use xlinkHref={`/sprite.svg#close`} />
				</svg>
			</div>
			<div className={styles.title}> Login </div>
			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.group}>
					<input
						type='email'
						name='email'
						placeholder='Your email'
						value={values.email}
						autoComplete='off'
						required
						onChange={handleChange}
					/>
				</div>
				<div className={styles.group}>
					<input
						type='password'
						name='password'
						placeholder='Your password'
						value={values.password}
						autoComplete='off'
						required
						onChange={handleChange}
					/>
				</div>
				<div className={styles.link} onClick={() => toggleUserForm('signup')}>
					Create account
				</div>
				<button type='submit' className={styles.submit}>
					Login
				</button>
			</form>
		</div>
	);
};

export default UseLoginForm;
