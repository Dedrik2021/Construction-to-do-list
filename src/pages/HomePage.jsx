import { useSelector } from 'react-redux';
import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import {
	doc,
	updateDoc,
	arrayRemove,
} from 'firebase/firestore/lite';

import SortBtn from '../components/SortBtn';
import CreateForm from '../components/CreateForm';
import { database } from '../firebase/firebaseConfig';
import logo from '../assets/images/content/construct.gif';
import HomePageSkeleton from '../skeletons/homePageSkeleton';
import NameSkeleton from '../skeletons/nameSkeleton';
import { setBtnSort } from '../redux/slices/usersSlice';

const HomePage = () => {
	const auth = getAuth();
	const [filterData, setFilterData] = useState([])
	const [btnName, setBtnName] = useState('')

	const { usersStatus, users, btnSort } = useSelector((state) => state.user);
	const getUser =
		auth.currentUser !== null &&
		users !== undefined &&
		users.find((item) => item.emailId === auth.currentUser.email);

	const getWall =
		auth.currentUser !== null &&
		getUser !== undefined &&
		getUser.works.filter((item) => item.sortName === 'Стена');
	const getTile =
		auth.currentUser !== null &&
		getUser !== undefined &&
		getUser.works.filter((item) => item.sortName === 'Плитка');
	const getGips =
		auth.currentUser !== null &&
		getUser !== undefined &&
		getUser.works.filter((item) => item.sortName === 'Гипс-кр.');

	let priceTile = 0;
	let valueTile = 0;
	let timeTile = 0;

	let priceGips = 0;
	let valueGips = 0;
	let timeGips = 0;

	let priceWall = 0;
	let valueWall = 0;
	let timeWall = 0;

	useEffect(() => {
		setBtnName(btnName)
	}, [btnName])
	
	const onFilter = (btnName) => {
		const data = getUser.works.filter(item => item.sortName === btnName)
		setFilterData(data)
	}

	const sumWall = (priceWall, valueWall, timeWall) => {
		const wallPrice =
			auth.currentUser !== null &&
			getUser !== undefined &&
			getWall.map((item) => item.price);
		const wallValue =
			auth.currentUser !== null &&
			getUser !== undefined &&
			getWall.map((item) => item.value);
		const wallTime =
			auth.currentUser !== null &&
			getUser !== undefined &&
			getWall.map((item) => item.time);

		for (
			let i = 0;
			i < wallPrice.length && wallValue.length && wallTime.length;
			i++
		) {
			priceWall += wallPrice[i];
			valueWall += wallValue[i];
			timeWall += wallTime[i];
		}

		return { priceWall, valueWall, timeWall };
	};

	const sumTile = (priceTile, valueTile, timeTile) => {
		const tilePrice =
			auth.currentUser !== null &&
			getUser !== undefined &&
			getTile.map((item) => item.price);
		const tileValue =
			auth.currentUser !== null &&
			getUser !== undefined &&
			getTile.map((item) => item.value);
		const tileTime =
			auth.currentUser !== null &&
			getUser !== undefined &&
			getTile.map((item) => item.time);

		for (
			let i = 0;
			i < tilePrice.length && tileValue.length && tileTime.length;
			i++
		) {
			priceTile += tilePrice[i];
			valueTile += tileValue[i];
			timeTile += tileTime[i];
		}

		return { priceTile, valueTile, timeTile };
	};

	const sumGips = (priceGips, valueGips, timeGips) => {
		const gipsPrice =
			auth.currentUser !== null &&
			getUser !== undefined &&
			getGips.map((item) => item.price);
		const gipsValue =
			auth.currentUser !== null &&
			getUser !== undefined &&
			getGips.map((item) => item.value);
		const gipsTime =
			auth.currentUser !== null &&
			getUser !== undefined &&
			getGips.map((item) => item.time);

		for (
			let i = 0;
			i < gipsPrice.length && gipsValue.length && gipsTime.length;
			i++
		) {
			priceGips += gipsPrice[i];
			valueGips += gipsValue[i];
			timeGips += gipsTime[i];
		}

		return { priceGips, valueGips, timeGips };
	};

	const wall = sumWall(priceWall, valueWall, timeWall);
	const tile = sumTile(priceTile, valueTile, timeTile);
	const gips = sumGips(priceGips, valueGips, timeGips);

	const onDelete = (id) => {
		const docToDelete = doc(database, 'users', getUser.ID);
		const foundWork = getUser.works.find((item) => item.id == id);
		updateDoc(docToDelete, {
			works: arrayRemove(foundWork),
		});
	};

	const nameSkeleton = () => {
		if (auth.currentUser !== null) {
			if (usersStatus === 'loading' || usersStatus === 'error') {
				return <NameSkeleton />;
			} else {
				return getUser !== undefined && getUser.name;
			}
		} else {
			if (usersStatus === 'loading' || usersStatus === 'error') {
				return <NameSkeleton />;
			} else {
				return '(имя работника)';
			}
		}
	};

	const content = () => {
		if (auth.currentUser !== null) {
			if (usersStatus === 'loading' || usersStatus === 'error') {
				return <HomePageSkeleton />;
			} else {
				return (
					<ul className="home__list">
						<li className="home__thing">
							<div className="home__content">
								<span className="home__item">Список работ</span>
								<span className="home__item">
									Площадь (объем)
								</span>
								<span className="home__item">
									Затраченое время
								</span>
								<span className="home__item">Цена услуг</span>
								<span className="home__item">Дата</span>
								<span className="home__item">Удалить</span>
							</div>
						</li>
						{getUser !== undefined &&
							(btnSort === 0 ? getUser.works : filterData).map(
								({
									id,
									price,
									sortName,
									time,
									value,
									date,
								}) => {
									return (
										<li className="home__thing" key={id}>
											<article className="home__content">
												<span
													className={`${
														date[8] + date[9] >
														new Date().toLocaleDateString()
															? 'active'
															: ''
													}`}
												>
													{' '}
													{sortName}
												</span>
												<span
													className={`home__span ${
														date[8] + date[9] >
														new Date().toLocaleDateString()
															? 'active'
															: ''
													}`}
												>
													{value} m{' '}
													<span className="home__square">
														2
													</span>
												</span>
												<span
													className={`${
														date[8] + date[9] >
														new Date().toLocaleDateString()
															? 'active'
															: ''
													}`}
												>
													{time} часа (ов)
												</span>
												<span
													className={`${
														date[8] + date[9] >
														new Date().toLocaleDateString()
															? 'active'
															: ''
													}`}
												>
													{price} kč
												</span>
												<span
													className={`home__date ${
														date[8] + date[9] >
														new Date().toLocaleDateString()
															? 'active'
															: ''
													}`}
												>
													<time dateTime="DD.MM.YYYY">
														{date}
													</time>
												</span>
												<button
													className="home__delete-btn btn btn--red btn--universal"
													onClick={() => onDelete(id)}
													type="button"
												>
													Delete
												</button>
											</article>
										</li>
									);
								},
							)
						}
					</ul>
				);
			}
		} else {
			if (usersStatus === 'loading' || usersStatus === 'error') {
				return <HomePageSkeleton />;
			} else {
				return (
					<div className="home__img-wrapper">
						<img
							src={logo}
							alt="logo"
							height={'400px'}
							width={'300px'}
						/>
					</div>
				);
			}
		}
	};

	return (
		<section className="home">
			<div className="container">
				<div className="home__inner">
					<div className="home__edit">
						<CreateForm getUser={getUser} />
						<SortBtn onFilter={onFilter} btnSort={btnSort} setBtnSort={setBtnSort} setBtnName={setBtnName} />
					</div>
				</div>
				<h1 className="home__title">
					Объём работ:
					<span>{nameSkeleton()}</span>
				</h1>
				<div className="home__box">{content()}</div>
				<h2 className="home__title">Общая сумма работ</h2>

				<ul className="home__list">
					<li className="home__thing">
						<div className="home__summ">
							<span className="home__item">Список работ</span>
							<span className="home__item">Площадь (объем)</span>
							<span className="home__item">Затраченое время</span>
							<span className="home__item">Цена услуги</span>
						</div>
					</li>
					<li className="home__thing">
						<article className="home__summ">
							<span>Стена</span>
							<span className="home__span">
								{wall.valueWall} m{' '}
								<span className="home__square">2</span>
							</span>
							<span> {wall.timeWall} часа (ов)</span>
							<span>{wall.priceWall} kč</span>
						</article>
					</li>
					<li className="home__thing">
						<article className="home__summ">
							<span>Плитка</span>
							<span className="home__span">
								{tile.valueTile} m{' '}
								<span className="home__square">2</span>
							</span>
							<span> {tile.timeTile} часа (ов)</span>
							<span>{tile.priceTile} kč</span>
						</article>
					</li>
					<li className="home__thing">
						<article className="home__summ">
							<span>Гипс-кр.</span>
							<span className="home__span">
								{gips.valueGips} m{' '}
								<span className="home__square">2</span>
							</span>
							<span>{gips.timeGips} часа (ов)</span>
							<span>{gips.priceGips} kč</span>
						</article>
					</li>
					<li className="home__thing">
						<article className="home__summ">
							<span></span>
							<span className="home__span">
								{tile.valueTile +
									wall.valueWall +
									gips.valueGips}{' '}
								m <span className="home__square">2</span>
							</span>
							<span>
								{wall.timeWall + tile.timeTile + gips.timeGips}{' '}
								часа (ов)
							</span>
							<span>
								{wall.priceWall +
									tile.priceTile +
									gips.priceGips}{' '}
								kč
							</span>
						</article>
					</li>
				</ul>
			</div>
		</section>
	);
};

export default HomePage;
