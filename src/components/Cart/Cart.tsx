import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../features/store';
import {
	ICart,
	addItemToCart,
	removeItemFromCart,
} from '../../features/user/userSlice';
import styles from '../../styles/Cart.module.css';
import { sumBy } from '../utils/common';
const Cart = () => {
	const { cart } = useSelector((s: RootState) => s.user);
	const dispatch = useDispatch();
	const changeQuantity = (item: ICart, quantity: number) => {
		dispatch(addItemToCart({ ...item, quantity }));
	};
	const removeItem = (item: ICart, id: number) => {
		dispatch(removeItemFromCart({ ...item, id }));
	};
	return (
		<section className={styles.cart}>
			<h2 className={styles.title}>Your cart</h2>

			{!cart.length ? (
				<div className={styles.empty}>Here is empty</div>
			) : (
				<>
					<div className={styles.list}>
						{cart.map(item => (
							<div className={styles.item} key={item.id}>
								<div
									className={styles.image}
									style={{ backgroundImage: `url(${item.images[0]})` }}
								/>
								<div className={styles.info}>
									<h3 className={styles.name}> {item.title}</h3>
									<div className={styles.category}> {item.category.name}</div>
								</div>
								<div className={styles.price}>{item.price}$</div>
								<div className={styles.quantity}>
									<div
										className={styles.minus}
										onClick={() =>
											changeQuantity(item, Math.max(1, item.quantity - 1))
										}
									>
										<svg className='icon'>
											<use xlinkHref='/sprite.svg#minus' />
										</svg>
									</div>
									<span>{item.quantity}</span>
									<div
										className={styles.plus}
										onClick={() => changeQuantity(item, item.quantity + 1)}
									>
										<svg className='icon'>
											<use xlinkHref='/sprite.svg#plus' />
										</svg>
									</div>
								</div>
								<div className={styles.total}>
									{item.price * item.quantity}$
								</div>
								<div
									className={styles.close}
									onClick={() => removeItem(item, item.id)}
								>
									<svg className='icon'>
										<use xlinkHref='/sprite.svg#close' />
									</svg>
								</div>
							</div>
						))}
					</div>
					<div className={styles.actions}>
						<div className={styles.total}>
							TOTAL PRICE:&nbsp;
							<span>
								{sumBy(cart.map(item => item.quantity * item.price))}$
							</span>
						</div>
						<button className={styles.proceed}>Proceed to checkout</button>
					</div>
				</>
			)}
		</section>
	);
};
export default Cart;
