import { FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../../features/api/apiSlice';
import { ICategory } from '../../features/categories/categoriesSlice';
import { IProduct } from '../../features/products/productsSlice';
import { RootState } from '../../features/store';
import styles from '../../styles/Category.module.css';
import Products from '../Products/Products';

const Category = () => {
	const { id } = useParams();
	const { list } = useSelector((s: RootState) => s.categories);

	const defaultValues = {
		title: '',
		price_min: 0,
		price_max: 0,
	};

	const defaultParams = {
		categoryId: id,
		limit: 5,
		offset: 0,
		...defaultValues,
	};

	const [params, setParams] = useState(defaultParams);
	const { data = [], isLoading, isSuccess } = useGetProductsQuery(params);
	const [values, setValues] = useState(defaultValues);
	const [cat, setCat] = useState('');
	const [items, setItems] = useState<IProduct[]>([]);
	const [isEnd, setEnd] = useState(false);

	useEffect(() => {
		if (!id) return;
		setParams({ ...defaultParams, categoryId: id });
		setItems([]);
		setEnd(false);
		setParams({ ...defaultParams, ...values });
		setValues(defaultValues);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	useEffect(() => {
		if (isLoading) return;
		if (!data.length) return setEnd(true);
		setItems(prev => [...prev, ...data]);
	}, [isLoading, data]);

	useEffect(() => {
		if (!id || !list?.length) return;
		const category = list.find(el => el.id === Number(id)) as ICategory;
		if(!category) return
		setCat(category.name);
	}, [list, id]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		setItems([]);
		setEnd(false);
		setParams({ ...defaultParams, ...values });
	};
	return (
		<section className={styles.wrapper}>
			<h2 className={styles.title}>{cat}</h2>
			<form className={styles.filters} onSubmit={handleSubmit}>
				<div className={styles.filter}>
					<input
						type='text'
						name='title'
						placeholder='Product name'
						onChange={handleChange}
						value={values.title}
					/>
				</div>
				<div className={styles.filter}>
					<input
						type='number'
						name='price_min'
						placeholder='0'
						onChange={handleChange}
						value={values.price_min}
					/>
					<span>Price from</span>
				</div>
				<div className={styles.filter}>
					<input
						type='number'
						name='price_max'
						placeholder='0'
						onChange={handleChange}
						value={values.price_max}
					/>
					<span>Price to</span>
				</div>
				<button type='submit' hidden></button>
			</form>
			{isLoading ? (
				<div className={styles.preloader}>Loading...</div>
			) : !isSuccess || !items.length ? (
				<div className={styles.back}>
					<span>No results</span>
					<button>Reset</button>
				</div>
			) : (
				<Products title='' products={items} amount={items.length} />
			)}
			{!isEnd && (
				<div className={styles.more}>
					<button
						onClick={() =>
							setParams({ ...params, offset: params.offset + params.limit })
						}
					>
						See more
					</button>
				</div>
			)}
		</section>
	);
};
export default Category;
