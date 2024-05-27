import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../features/store';
import { createUser } from '../../features/user/userSlice';
import styles from '../../styles/User.module.css';

export interface IUserForm {
	closeForm: () => void;
	toggleUserForm: (type: string) => void;
}

const UserSingUpForm = ({ closeForm, toggleUserForm }: IUserForm) => {
	const dispatch = useDispatch<AppDispatch>();
	const [values, setValues] = useState({
		name: '',
		email: '',
		password: '',
		avatar: '',
	});
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });
	};
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		const isNotEmpty = Object.values(values).some(val => val);
		console.log(Object.values(values).forEach(val => val));

		if (!isNotEmpty) return;

		dispatch(createUser(values));
		closeForm();
	};
	return (
		<div className={styles.wrapper}>
			<div className={styles.close} onClick={closeForm}>
				<svg className='icon'>
					<use xlinkHref={`/sprite.svg#close`} />
				</svg>
			</div>
			<div className={styles.title}> Sign Up </div>
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
						type='name'
						name='name'
						placeholder='Your name'
						value={values.name}
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
				<div className={styles.group}>
					<input
						type='avatar'
						name='avatar'
						placeholder='Your avatar'
						value={values.avatar}
						autoComplete='off'
						required
						onChange={handleChange}
					/>
				</div>
				<div className={styles.link} onClick={() => toggleUserForm('login')}>
					I already have an account
				</div>
				<button type='submit' className={styles.submit}>
					Create an account
				</button>
			</form>
		</div>
	);
};

export default UserSingUpForm;
