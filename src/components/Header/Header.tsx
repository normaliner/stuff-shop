import { Link } from 'react-router-dom';
import AvatarIcon from '../../images/avatar.jpg';
import LogoIcon from '../../images/logo.svg';
import styles from '../../styles/Header.module.css';
import { ROUTES } from '../utils/routes';
const Header = () => {
	return (
		<header className={styles.header}>
			<div className={styles.logo}>
				<Link to={ROUTES.HOME}>
					<img src={LogoIcon} alt='STUFF' />
				</Link>
			</div>
			<div className={styles.info}>
				<div className={styles.user}>
					<div
						className={styles.avatar}
						style={{ backgroundImage: `url(${AvatarIcon})` }}
					/>
					<div className={styles.username}>Guest</div>
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
							onChange={() => {}}
							value=''
						/>
					</div>
					{false && <div className={styles.box}></div>}
				</form>
				<div className={styles.account}>
					<Link to={ROUTES.HOME} className={styles.favourites}>
						<svg className={styles['icon-fav']}>
							<use xlinkHref={`/sprite.svg#heart`} />
						</svg>
					</Link>
					<Link to={ROUTES.CART} className={styles.cart}>
						<svg className={styles['icon-cart']}>
							<use xlinkHref={`/sprite.svg#bag`} />
						</svg>
						<span className={styles.count}>2</span>
					</Link>
				</div>
			</div>
		</header>
	);
};

export default Header;
