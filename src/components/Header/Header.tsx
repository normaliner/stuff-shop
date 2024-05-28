import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useGetProductsQuery } from '../../features/api/apiSlice';
import { RootState } from '../../features/store';
import { toggleForm } from '../../features/user/userSlice';
import AvatarIcon from '../../images/avatar.jpg';
import LogoIcon from '../../images/logo.svg';
import styles from '../../styles/Header.module.css';
import { ROUTES } from '../utils/routes';
import cn from 'classnames'
const Header = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { currentUser, cart, favourites } = useSelector((s: RootState) => s.user);
	const [searchValue, setSearchValue] = useState('');
	const [values, setValues] = useState({ name: 'Guest', avatar: AvatarIcon });
	const { data, isLoading } = useGetProductsQuery({ title: searchValue });

	useEffect(() => {
		if (!currentUser) return;
		setValues(currentUser);
	}, [currentUser]);

	const handleClick = () => {
		if (!currentUser) dispatch(toggleForm(true));
		else {
			navigate(ROUTES.PROFILE);
		}
	};

	const handleSeatch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};
	return (
		<header className={styles.header}>
			<div className={styles.logo}>
				<Link to={ROUTES.HOME}>
					<img src={LogoIcon} alt='STUFF' />
				</Link>
			</div>
			<div className={styles.info}>
				<div className={styles.user} onClick={handleClick}>
					<div
						className={styles.avatar}
						style={{ backgroundImage: `url(${values.avatar})` }}
					/>
					<div className={styles.username}>{values.name}</div>
				</div>
				<form className={styles.form}>
					<div className={styles.icon}>
						<svg className='icon'>
							<use xlinkHref={`/sprite.svg#search`} />
						</svg>
					</div>
					<div className={styles.input}>
						<input
							type='search'
							name='search'
							placeholder='Search...'
							autoComplete='off'
							onChange={handleSeatch}
							value={searchValue}
						/>
					</div>
					{searchValue && (
						<div className={styles.box}>
							{isLoading ? (
								<div>Loading...</div>
							) : !data?.length ? (
								<div>No result</div>
							) : (
								data.map(product => (
									<Link
										onClick={() => setSearchValue('')}
										className={styles.item}
										to={`/products/${product.id}`}
										key={product.id}
									>
										<div
											className={styles.image}
											style={{ backgroundImage: `url(${product.images[0]})` }}
										/>
										<div className={styles.title}>{product.title}</div>
									</Link>
								))
							)}
						</div>
					)}
				</form>
				<div className={styles.account}>
					<Link to={ROUTES.FAVOURITES} className={styles.favourites}>
						<svg className={styles['icon-fav']}>
							<use xlinkHref={`/sprite.svg#heart`} />
						</svg>
						<span className={cn(styles.count, styles['fav-count'])}>
						{favourites.reduce((acc, c) => acc + c.favourites, 0)}
						</span>
					</Link>
					<Link to={ROUTES.CART} className={styles.cart}>
						<svg className={styles['icon-cart']}>
							<use xlinkHref={`/sprite.svg#bag`} />
						</svg>
						<span className={styles.count}>
							{cart.reduce((acc, c) => acc + c.quantity, 0)}
						</span>
					</Link>
				</div>
			</div>
		</header>
	);
};

export default Header;
