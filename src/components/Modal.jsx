import { memo, useState, useRef } from 'react';
import { addDoc, collection } from 'firebase/firestore/lite';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';

import logo from '../assets/images/content/logo.png';
import { database } from '../firebase/firebaseConfig';
import Keyboard from '../assets/images/sprite/keyboard-icon.svg';
import { setBtnSort } from '../redux/slices/usersSlice';

const Modal = memo(({ closeModal, btnSwitcher }) => {
	const [nameInput, setNameInput] = useState('');
	const [emailInput, setEmailInput] = useState('');
	const [passwordInput, setPasswordInput] = useState('');
	const [secondPasswordInput, setSecondPasswordInput] = useState('');
	const users = useSelector((state) => state.user.users);
	const collectionRef = collection(database, 'users');
	const auth = getAuth();
	const secondPasswordReff = useRef();
	const passwordRef = useRef();
	const nameRef = useRef();
	const emailRef = useRef();
	const dispatch = useDispatch();

	const onRegister = (e) => {
		e.preventDefault();
		if (passwordInput == secondPasswordInput) {
			createUserWithEmailAndPassword(auth, emailInput, passwordInput)
				.then(addData)
				.then(setEmailInput(''), setNameInput(''), setPasswordInput(''), setSecondPasswordInput(''))
				.then(dispatch(closeModal(false)))
				.then(dispatch(setBtnSort(0)))
		} else {
			alert('Сheck your password!');
			secondPasswordReff.current.focus();
		}
	};

	const addData = () => {
		addDoc(collectionRef, {
			emailId: emailInput,
			id: users.length + 1,
			name: nameInput,
			email: emailInput,
			password: passwordInput,
			dateOfRegister: new Date().toLocaleString(),
			works: [],
		}).catch((err) => {
			alert(err.message);
		});
	};

	const onLogIn = (e) => {
		e.preventDefault();
		signInWithEmailAndPassword(auth, emailInput, passwordInput)
			.then(setEmailInput(''), setPasswordInput(''), dispatch(closeModal(false)))
			.then(dispatch(setBtnSort(0)))
			.catch(() => {
                alert('Данный пользователь не существует! Проверьте логин или пароль!')
                dispatch(closeModal(true))
                emailRef.current.focus()
			});
	};

	return (
		<div className="modal">
			<div className="modal__inner">
				<button
					className="modal__close-btn btn btn--red btn--universal"
					type="button"
					onClick={() => dispatch(closeModal(false))}
				>
					x
				</button>
				<div className="modal__box">
					<img src={logo} alt="logo" height={'60px'} width={'150px'} />
					<span>{btnSwitcher === 0 ? 'Регистрация' : 'Вход'} </span>
				</div>
				<form className="modal__form" onSubmit={(e) => (btnSwitcher === 0 ? onRegister(e) : onLogIn(e))}>
					{btnSwitcher === 0 && (
						<div className="modal__wrapper">
							<label className="modal__label" htmlFor="name">
								Name
							</label>
							<input
								className="modal__input"
								type="text"
								id="name"
								name="name-input"
								required
								ref={nameRef}
								onChange={(e) => setNameInput(e.target.value)}
								value={nameInput}
							/>
							{nameInput ? (
								<button
									className="modal__clean-btn btn"
									type="button"
                                    tabIndex={1}
									onClick={() => (setNameInput(''), nameRef.current.focus())}
								>
									x
								</button>
							) : (
								<svg
									className="keyboard"
									onClick={() => nameRef.current.focus()}
									width="20"
									height="20"
								>
									<use href={`${Keyboard}#keyboard`}></use>
								</svg>
							)}
						</div>
					)}
					<div className="modal__wrapper">
						<label className="modal__label" htmlFor="email">
							Email
						</label>
						<input
							className="modal__input"
							type={'email'}
							id="email"
							name="email-input"
							required
							ref={emailRef}
							onChange={(e) => setEmailInput(e.target.value)}
							value={emailInput}
						/>
						{emailInput ? (
							<button
								className="modal__clean-btn btn"
								type="button"
                                tabIndex={1}
								onClick={() => (setEmailInput(''), emailRef.current.focus())}
							>
								x
							</button>
						) : (
							<svg className="keyboard" onClick={() => emailRef.current.focus()} width="20" height="20">
								<use href={`${Keyboard}#keyboard`}></use>
							</svg>
						)}
					</div>
					<div className="modal__wrapper">
						<label className="modal__label" htmlFor="password">
							Password
						</label>
						<input
							className="modal__input"
							type={'password'}
							id="password"
							name="password-input"
							required
							ref={passwordRef}
							onChange={(e) => setPasswordInput(e.target.value)}
							value={passwordInput}
						/>
						{passwordInput ? (
							<button
								className="modal__clean-btn btn"
								type="button"
                                tabIndex={1}
								onClick={() => (setPasswordInput(''), passwordRef.current.focus())}
							>
								x
							</button>
						) : (
							<svg
								className="keyboard"
								onClick={() => passwordRef.current.focus()}
								width="20"
								height="20"
							>
								<use href={`${Keyboard}#keyboard`}></use>
							</svg>
						)}
					</div>
					{btnSwitcher === 0 && (
						<div className="modal__wrapper">
							<label className="modal__label" htmlFor="second-password">
								Password
							</label>
							<input
								ref={secondPasswordReff}
								className="modal__input"
								type={'password'}
								id="second-password"
								name="second-password-input"
								required
								onChange={(e) => setSecondPasswordInput(e.target.value)}
								value={secondPasswordInput}
							/>
							{secondPasswordInput ? (
								<button
									className="modal__clean-btn btn"
									type="button"
                                    tabIndex={1}
									onClick={() => (setSecondPasswordInput(''), secondPasswordReff.current.focus())}
								>
									x
								</button>
							) : (
								<svg
									className="keyboard"
									onClick={() => secondPasswordReff.current.focus()}
									width="20"
									height="20"
								>
									<use href={`${Keyboard}#keyboard`}></use>
								</svg>
							)}
						</div>
					)}

					<button type="submit" className="modal__btn btn btn--red btn--universal">
						{btnSwitcher === 0 ? 'Зарегистрироваться' : 'Войти'}
					</button>
				</form>
			</div>
		</div>
	);
});

export default Modal;
