import BannerIcon from '../../images/banner.png';
import styles from '../../styles/Home.module.css';
const Banner = () => {
	return (
		<section className={styles.banner}>
			<div className={styles.left}>
				<p className={styles.content}>
					NEW YEAR <span>SALE</span>
				</p>
				<button className={styles.more}>See more</button>
			</div>
			<div
				className={styles.left}
				style={{ backgroundImage: `url(${BannerIcon})` }}
			>
				<p className={styles.discount}>
					save up to <span>50%</span>off
				</p>
			</div>
		</section>
	);
};

export default Banner;
