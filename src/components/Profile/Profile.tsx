import { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../features/store';
import { IUser, updateUser } from '../../features/user/userSlice';
import styles from '../../styles/Profile.module.css';
const Profile = () => {
	const dispatch = useDispatch<AppDispatch>();
	const currentUser = useSelector((s: RootState) => s.user.currentUser);
	const [values, setValues] = useState<IUser>({
		id: 0,
    name: '',
    email: '',
    password: '',
    role: '',
    avatar: '',
	});

	useEffect(() => {
		if (!currentUser) return;

		setValues(currentUser);
	}, [currentUser]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });
	};
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		const isNotEmpty = Object.values(values).some(val => val);

		if (!isNotEmpty) return;

		dispatch(updateUser(values));
	};
	return (
		<section className={styles.profile}>
			{!currentUser ? (
				<span>You need to login</span>
			) : (
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

					<button type='submit' className={styles.submit}>
						Update
					</button>
				</form>
			)}
		</section>
	);
};

export default Profile;
