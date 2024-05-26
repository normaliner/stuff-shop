import { Link } from 'react-router-dom';
import LogoIcon from '../../images/logo.svg';
import styles from '../../styles/Footer.module.css';
import { ROUTES } from '../utils/routes';
const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.logo}>
				<Link to={ROUTES.HOME}>
					<img src={LogoIcon} alt='STUFF' />
				</Link>
			</div>
			<div className={styles.rights}>
				Developed by&nbsp;
				<a
					href='https://github.com/normaliner'
					target='_blank'
					rel='noreferrer'
				>
					Viktor Prokopenko
				</a>
			</div>
			<div className={styles.socials}>
				<a
					href='https://github.com/normaliner'
					target='_blank'
					rel='noreferrer'
				>
					<svg className={styles['icon-cart']}>
						<use xlinkHref={`/sprite.svg#instagram`} />
					</svg>
				</a>
				<a
					href='https://github.com/normaliner'
					target='_blank'
					rel='noreferrer'
				>
					<svg className={styles['icon-cart']}>
						<use xlinkHref={`/sprite.svg#facebook`} />
					</svg>
				</a>
				<a
					href='https://github.com/normaliner'
					target='_blank'
					rel='noreferrer'
				>
					<svg className={styles['icon-cart']}>
						<use xlinkHref={`/sprite.svg#youtube`} />
					</svg>
				</a>
			</div>
		</footer>
	);
};

export default Footer;
