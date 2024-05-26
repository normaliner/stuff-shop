import { Link } from 'react-router-dom';
import { ICategory } from '../../features/categories/categoriesSlice';
import styles from '../../styles/Categories.module.css';

export interface CategoriesProps {
	title?: string;
	categories?: ICategory[];
	amount: number;
}

const Categories = ({ title, categories, amount }: CategoriesProps) => {
	const list = categories?.filter((_, i) => i < amount);
	return (
		<section className={styles.section}>
			<h2>{title}</h2>
			<div className={styles.list}>
				{list &&
					list.map(category => (
						<Link
							to={`/categories/${category.id}`}
							key={category.id}
							className={styles.item}
						>
							<div className = {styles.image} style={{ backgroundImage: `url(${category.image})` }} />
							<h3 className={styles.title}>{category.name}</h3>
						</Link>
					))}
			</div>
		</section>
	);
};

export default Categories;
