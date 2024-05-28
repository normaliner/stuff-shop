import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../features/store';
import {
  IFavourites,
  addItemsToCart,
  removeItemFromFav,
} from '../../features/user/userSlice';
import styles from '../../styles/Cart.module.css';
import { sumBy } from '../utils/common';
import cn from 'classnames';

const Favourites = () => {
  const { favourites } = useSelector((s: RootState) => s.user);
  const dispatch = useDispatch();

  const removeItem = (item: IFavourites, id: number) => {
    dispatch(removeItemFromFav({ ...item, id }));
  };

  const handleAddCart = () => {
    // Добавление в корзину и удаление из избранного
    dispatch(addItemsToCart(favourites));
  };

  return (
    <section className={styles.cart}>
      <h2 className={styles.title}>Your Favourites</h2>

      {!favourites.length ? (
        <div className={styles.empty}>Here is empty</div>
      ) : (
        <>
          <div className={styles.list}>
            {favourites.map(item => (
              <div className={cn(styles.item, styles['fav-item'])} key={item.id}>
                <div
                  className={styles.image}
                  style={{ backgroundImage: `url(${item.images[0]})` }}
                />
                <div className={styles.info}>
                  <h3 className={styles.name}> {item.title}</h3>
                  <div className={styles.category}> {item.category.name}</div>
                </div>
                <div className={styles.total}>
                  {item.price * item.favourites}$
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
                {sumBy(favourites.map(item => item.favourites * item.price))}$
              </span>
            </div>
            <button className={styles.proceed} onClick={handleAddCart}>Add to cart</button>
          </div>
        </>
      )}
    </section>
  );
};

export default Favourites;
