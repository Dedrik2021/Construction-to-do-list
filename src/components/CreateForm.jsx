import { useState, memo, useRef, createClass } from 'react';
import { updateDoc, doc, arrayUnion } from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth';
import { useDispatch } from 'react-redux';

import { database } from '../firebase/firebaseConfig';
import { setSwitcherBtn, setCloseModal } from '../redux/slices/usersSlice';
import Keyboard from '../assets/images/sprite/keyboard-icon.svg';

const CreateForm = memo(({ getUser }) => {
	const selectValue = [
		{ id: 0, name: 'Стена' },
		{ id: 1, name: 'Плитка' },
		{ id: 2, name: 'Гипс-кр.' },
	];

	const dispatch = useDispatch();
	const [sortValue, setSortValue] = useState('Стена');
	const [valueInput, setValueInput] = useState('');
	const [timeInput, setTimeInput] = useState('');
	const [priceInput, setPriceInput] = useState('');
	const [date, setDate] = useState('');
	const auth = getAuth();
	const priceRef = useRef();
	const valueRef = useRef();
	const timeRef = useRef();
	const dateRef = useRef();
    
	const addItem = (e) => {
		e.preventDefault();
		if (auth.currentUser !== null) {
			const docToUpdate = doc(database, 'users', getUser.ID);

			if (
				!isNaN(priceInput) &&
				!isNaN(valueInput) &&
				!isNaN(timeInput) &&
				priceInput !== 0 &&
				valueInput !== 0 &&
				timeInput !== 0
			) {
				updateDoc(docToUpdate, {
					works: arrayUnion({
						date: date,
						timeToAdd: new Date().toLocaleTimeString(),
						sortName: sortValue,
						value: Number(valueInput),
						price: Number(priceInput),
						time: Number(timeInput),
						id: getUser.works.length + 1,
					}),
				})
					.then(setPriceInput(0), setValueInput(0), setSortValue('Стена'), setTimeInput(0), setDate(''))
					.catch((err) => {
						alert(err.message);
					});
			} else if (date === '') {
				alert('Выберите дату!');
				dateRef.current.focus();
			} else if (isNaN(valueInput) || valueInput === 0) {
				valueRef.current.focus();
				alert('В поле введите число!');
			} else if (isNaN(timeInput) || timeInput === 0) {
				timeRef.current.focus();
				alert('В поле введите число!');
			} else if (isNaN(priceRef) || priceInput === 0) {
				priceRef.current.focus();
				alert('В поле введите число!');
			}
		} else {
			dispatch(setSwitcherBtn(1));
			dispatch(setCloseModal(true));
		}
	};

	return (
		<form className="create-form" onSubmit={(e) => addItem(e)}>
			<div className="create-form__wrapper">
				<label className="create-form__label" htmlFor="sort-select">
					Выбор работы
				</label>
				<select
					className="create-form__select"
					name="create-select"
					id="sort-select"
					onChange={(e) => setSortValue(e.target.value)}
				>
					{selectValue.map(({ id, name }) => {
						return (
							<option
								className={`create-form__option ${sortValue === name ? 'selected' : ''}`}
								value={name}
								key={id}
							>
								{name}
							</option>
						);
					})}
				</select>
			</div>

			<div className="create-form__wrapper">
				<label className="create-form__label" htmlFor="create-value">
					Площадь м<span>2</span>
				</label>
				<input
					className="create-form__input"
					ref={valueRef}
					name="value-input"
					id="create-value"
					type="text"
					required
					onChange={(e) => setValueInput(e.target.value)}
					value={valueInput}
				/>
				{valueInput !== '' ? (
					<button
						className="create-form__clean btn"
						tabIndex={1}
						onClick={() => (setValueInput(''), valueRef.current.focus())}
						type="button"
					>
						x
					</button>
				) : (
					<svg className="keyboard" onClick={() => valueRef.current.focus()} width="18" height="18">
						<use href={`${Keyboard}#keyboard`}></use>
					</svg>
				)}
			</div>

			<div className="create-form__wrapper">
				<label className="create-form__label" htmlFor="create-value">
					Затраченое время
				</label>
				<input
					className="create-form__input"
					ref={timeRef}
					name="value-input"
					id="create-value"
					type="text"
					required
					onChange={(e) => setTimeInput(e.target.value)}
					value={timeInput}
				/>
				{timeInput !== '' ? (
					<button
						className="create-form__clean btn"
						type="button"
						tabIndex={1}
						onClick={() => (setTimeInput(''), timeRef.current.focus())}
					>
						x
					</button>
				) : (
					<svg className="keyboard" onClick={() => timeRef.current.focus()} width="18" height="18">
						<use href={`${Keyboard}#keyboard`}></use>
					</svg>
				)}
			</div>

			<div className="create-form__wrapper">
				<label className="create-form__label" htmlFor="create-price">
					стоимость
				</label>
				<input
					className="create-form__input"
					ref={priceRef}
					name="price-input"
					id="create-price"
					type="text"
					required
					onChange={(e) => setPriceInput(e.target.value)}
					value={priceInput}
				/>
				{priceInput !== '' ? (
					<button
						className="create-form__clean btn"
						type="button"
						tabIndex={1}
						onClick={() => (setPriceInput(''), priceRef.current.focus())}
					>
						x
					</button>
				) : (
					<svg className="keyboard" onClick={() => priceRef.current.focus()} width="18" height="18">
						<use href={`${Keyboard}#keyboard`}></use>
					</svg>
				)}
			</div>

			<div className="create-form__wrapper">
				<label className="create-form__label" htmlFor="create-date">
					Дата
				</label>
				<input
					className="create-form__input"
					ref={dateRef}
					name="date-input"
					id="create-date"
					type={'date'}
					onChange={(e) => setDate(e.target.value)}
					value={date}
					required
				/>
			</div>

			<button className="create-form__btn btn btn--red btn--universal" type="submit">
				Добавить
			</button>
		</form>
	);
});

export default CreateForm;
