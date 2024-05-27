import cn from 'classnames';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { IProduct } from '../../features/products/productsSlice';
import { addItemToCart } from '../../features/user/userSlice';
import styles from '../../styles/Product.module.css';
import { parseImageUrl } from '../utils/common';
import { ROUTES } from '../utils/routes';
const SIZES = [4, 4.5, 5];

const Product = (product: IProduct) => {
	const { images, title, price, description } = product;
	const [currentImage, setCurrentImage] = useState<string>('');
	const [currentSize, setCurrentSize] = useState<number>();
	const dispatch = useDispatch();
	useEffect(() => {
		if (!images.length) {
			return;
		}
		setCurrentImage(images[0]);
	}, [images]);

	const addToCart = () => {
		dispatch(addItemToCart(product));
	};

	return (
		<section className={styles.product}>
			<div className={styles.images}>
				<div
					className={styles.current}
					style={{ backgroundImage: `url(${currentImage})` }}
				/>
				<div className={styles['images-list']}>
					{images.map((image, i) => (
						<div
							key={i}
							className={styles.image}
							style={{ backgroundImage: `url(${image})` }}
							onClick={() => setCurrentImage(parseImageUrl(image))}
						/>
					))}
				</div>
			</div>
			<div className={styles.info}>
				<h1 className={styles.title}> {title}</h1>
				<div className={styles.price}>{price}$</div>
				<div className={styles.color}>
					<span>Color:</span> Green
				</div>
				<div className={styles.sizes}>
					<span>Sizes:</span>
					<div className={styles.list}>
						{SIZES.map((size, i) => (
							<div
								key={i}
								className={cn(styles.size, {
									[styles.active]: currentSize === size,
								})}
								onClick={() => setCurrentSize(size)}
							>
								{size}
							</div>
						))}
					</div>
				</div>
				<p className={styles.description}> {description}</p>
				<div className={styles.actions}>
					<button
						onClick={addToCart}
						className={styles.add}
						disabled={!currentSize}
					>
						Add to cart
					</button>
					<button className={styles.favourite}>Add to favourites</button>
				</div>
				<div className={styles.bottom}>
					<div className={styles.purchase}>19 people purchased</div>
					<Link to={ROUTES.HOME}>Return to store</Link>
				</div>
			</div>
		</section>
	);
};

export default Product;
