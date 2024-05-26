import cn from 'classnames';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { RootState } from '../../features/store';
import styles from '../../styles/Sidebar.module.css';

const Sidebar = () => {
	const { list, isLoading } = useSelector((s: RootState) => s.categories);
	console.log(list);

	return (
		<section className={styles.sidebar}>
			<div className={styles.title}>CATEGORIES</div>
			<nav>
				<ul className={styles.menu}>
					{!isLoading && list?.map(({ id, name }) => {
						return (
							<li key={id} className={styles.linkHover}>
								<NavLink
									className={({ isActive }) =>
										cn(styles.link, {
											[styles.active]: isActive,
										})
									}
									to={`/categories/${id}`}
								>
									{name}
								</NavLink>
							</li>
						);
					})}
					{isLoading && <li>Loading...</li>}
				</ul>
			</nav>
			<div className={styles.footer}>
				<a
					href='https://github.com/normaliner'
					target='_blank'
					rel='noreferrer'
					className={styles.link}
				>
					Help
				</a>
				<a
					href='https://github.com/normaliner'
					target='_blank'
					rel='noreferrer'
					className={styles.link}
					style={{ textDecoration: 'underline' }}
				>
					Terms & Conditions
				</a>
			</div>
		</section>
	);
};

export default Sidebar;
