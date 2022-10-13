import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, query, orderBy } from "firebase/firestore/lite";

import { database } from "../../firebase/firebaseConfig";

export const fetchUsersData = createAsyncThunk('usersData/fetchUsersStatus', async () => {
	const collectionRef = collection(database, 'users')
	const collectionQuery = query(collectionRef, orderBy('id', 'asc'));
	const data = await getDocs(collectionQuery);
	const usersData = data.docs.map((item) => {
		return {...item.data(), ID: item.id};
	});
	return usersData
});

const initialState = {
    users: [],
    usersStatus: 'loading',
	getUser: {},
	modal: false,
	switcherBtn: 0,
    btnSort: 0
}

const usersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setGetUsers(state, action) {
            state.users = action.payload
        },
        setGetUser(state, action) {
            state.getUser = action.payload
        },
        setCloseModal(state, action) {
            state.modal = action.payload
        },
        setSwitcherBtn(state, action) {
            state.switcherBtn = action.payload
        },
        setBtnSort(state, action) {
            state.btnSort = action.payload
        }
    },
    extraReducers: {
		[fetchUsersData.pending]: (state) => {
			state.usersStatus = 'loading';
		},
		[fetchUsersData.fulfilled]: (state) => {
			state.usersStatus = 'success';
		},
		[fetchUsersData.rejected]: (state) => {
			state.usersStatus = 'error';
		},
	},
})

export const {
    setGetUsers, setGetUser, setCloseModal, setSwitcherBtn, setBtnSort
} = usersSlice.actions

export default usersSlice.reducer
