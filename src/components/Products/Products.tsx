import { Link } from 'react-router-dom';
import { IProduct } from '../../features/products/productsSlice';
import styles from '../../styles/Products.module.css';

export interface ProductsProps {
	title?: string;
	products?: IProduct[];
	amount: number;
}

const Products = ({ title, products, amount }: ProductsProps) => {
	const list = products?.filter((_, i) => i < amount);
	return (
		<section className={styles.products}>
			{title && <h2>{title}</h2>}

			<div className={styles.list}>
				{list &&
					list.map(product => {
						return (
							<Link
								to={`/products/${product.id}`}
								key={product.id}
								className={styles.product}
							>
								<div
									className={styles.image}
									style={{
										backgroundImage: `url(${product.images[0]})`,
									}}
								/>
								<div className={styles.wrapper}>
									<h3 className={styles.title}>{product.title}</h3>
									<div className={styles.cat}>{product.category.name}</div>
									<div className={styles.info}>
										<div className={styles.prices}>
											<div className={styles.price}>{product.price}$</div>
											<div className={styles.oldPrice}>
												{Math.floor(product.price * 0.8)}$
											</div>
										</div>
										<div className={styles.purchases}>
											{Math.floor(Math.random() * 20 + 1)} purchased
										</div>
									</div>
								</div>
							</Link>
						);
					})}
			</div>
		</section>
	);
};

export default Products;
