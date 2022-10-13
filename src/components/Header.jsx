import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDocs, collection, orderBy, query } from 'firebase/firestore/lite';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';

import logo from '../assets/images/content/logo.png';
import Modal from './Modal';
import { fetchUsersData, setGetUsers, setGetUser, setCloseModal, setSwitcherBtn, setBtnSort } from '../redux/slices/usersSlice';
import { database } from '../firebase/firebaseConfig';
import NameSkeleton from '../skeletons/nameSkeleton';

const Header = () => {
	const enterBtn = [
		{
			id: 0,
			name: 'Регистрация',
		},
		{
			id: 1,
			name: 'Войти',
		},
	];

	const dispatch = useDispatch();
	const auth = getAuth();
	const [scroll, setScroll] = useState(false);
	const { users, getUser, switcherBtn, modal, usersStatus } = useSelector((state) => state.user);
	const collectionRef = collection(database, 'users');
	const collectionQuery = query(collectionRef, orderBy('id', 'asc'));
	const user =
		auth.currentUser !== null &&
		users !== undefined &&
		users.find((item) => item.emailId === auth.currentUser.email);

	useEffect(() => {
		dispatch(fetchUsersData());
	}, []);

	useEffect(() => {
		dispatch(setGetUser(user !== undefined && user));
	}, [user]);

	useEffect(() => {
		onAuthStateChanged(auth, (snapshot) => {
			if (snapshot) {
				getDocs(collectionQuery).then((res) => {
					const data = res.docs.map((item) => {
						return { ...item.data(), ID: item.id };
					});
					dispatch(setGetUsers(data));
				});
			}
		});
	}, [users]);

	useEffect(() => {
		const checkScroll = () => {
			let scrollPos = window.scrollY;
			if (scrollPos > 0) {
				setScroll(true);
			} else {
				setScroll(false);
			}
		};
		document.addEventListener('scroll', checkScroll);
	}, []);

	const getDate = () => {
		const date = new Date().getHours();

		switch (date) {
			case 6:
				return 'Доброе утро!';
			case 7:
				return 'Доброе утро!';
			case 8:
				return 'Доброе утро!';
			case 9:
				return 'Доброе утро!';
			case 10:
				return 'Доброе утро!';
			case 11:
				return 'Доброе утро!';
			case 12:
				return 'Добрый день!';
			case 13:
				return 'Добрый день!';
			case 14:
				return 'Добрый день!';
			case 15:
				return 'Добрый день!';
			case 16:
				return 'Добрый день!';
			case 17:
				return 'Добрый день!';
			case 18:
				return 'Добрый вечер!';
			case 19:
				return 'Добрый вечер!';
			case 20:
				return 'Добрый вечер!';
			case 21:
				return 'Добрый вечер!';
			case 22:
				return 'Добрый вечер!';
			case 23:
				return 'Добрый вечер!';
			case 0:
				return 'Доброй ночи!';
			case 1:
				return 'Доброй ночи!';
			case 2:
				return 'Доброй ночи!';
			case 3:
				return 'Доброй ночи!';
			case 4:
				return 'Доброй ночи!';
			case 5:
				return 'Доброй ночи!';
			default:
				return 'Добрый день!';
		}
	};

	const logOut = () => {
		if (window.confirm('Вы уверены, что хотите покинуть свой профиль?')) {
			signOut(auth);
			dispatch(setBtnSort(0))
		}
	};

	const changeContent = () => {
		if (auth.currentUser !== null) {
			if (usersStatus === 'loading' || usersStatus === 'error') {
				return <NameSkeleton />;
			} else {
				return (
					<div className="user">
						<div className="user__box">
							<span className="user__date">{getDate()}</span>
							<span className="user__name">{getUser.name}</span>
						</div>
						<button className="user__out-btn btn btn--red btn--universal" onClick={logOut}>
							Выйти
						</button>
					</div>
				);
			}
		} else {
			if (usersStatus === 'loading' || usersStatus === 'error') {
				return <NameSkeleton />;
			} else {
				return (
					<ul className="signin__list">
						{enterBtn.map(({ id, name }) => {
							return (
								<li className="signin__item" key={id}>
									<button
										className="signin__btn btn btn--green btn--universal"
										type="button"
										onClick={() => (dispatch(setSwitcherBtn(id)), dispatch(setCloseModal(true)))}
									>
										{name}
									</button>
								</li>
							);
						})}
					</ul>
				);
			}
		}
	};

	return (
		<header className={`header ${scroll ? 'sticky' : ''}`}>
			<div className="container">
				{modal && <Modal closeModal={setCloseModal} btnSwitcher={switcherBtn} />}
				<div className={`header__inner ${modal ? 'active' : ''}`}>
					<div className="header__logo-wrapper">
						<Link to={'/'} onClick={() => window.scroll(0, 0)} className="header__logo-link">
							<img src={logo} alt="logo" />
						</Link>
					</div>
					{changeContent()}
				</div>
			</div>
		</header>
	);
};

export default Header;
