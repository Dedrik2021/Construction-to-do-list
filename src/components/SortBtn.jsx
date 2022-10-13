import { useDispatch } from "react-redux";
import { getAuth } from "firebase/auth";

const SortBtn = ({onFilter, btnSort, setBtnSort, setBtnName}) => {
	const dispatch = useDispatch()
	const auth = getAuth()

    const sortBtn = [
		{
			id: 0,
			name: 'Все',
		},
		{
			id: 1,
			name: 'Стена',
		},
		{
			id: 2,
			name: 'Плитка',
		},
		{
			id: 3,
			name: 'Гипс-кр.',
		},
	];

	return (
		<ul className="sort__list">
			{sortBtn.map(({ id, name }) => {
				return (
					<li className="sort__item" key={id}>
						<button
							className={`sort__btn btn btn--red btn--universal ${btnSort === id && auth.currentUser !== null ? 'active' : ''}`}
							type="button"
							onClick={() => (dispatch(setBtnSort(id)), onFilter(name), setBtnName(name))}
						>
							{name}
						</button>
					</li>
				);
			})}
		</ul>
	);
};

export default SortBtn;
