import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
	apiKey: 'AIzaSyCKM1EfpWANit1Zb3W4m8-W3nIf3oho1Xo',
	authDomain: 'construction-to-do-list.firebaseapp.com',
	projectId: 'construction-to-do-list',
	storageBucket: 'construction-to-do-list.appspot.com',
	messagingSenderId: '172389229810',
	appId: '1:172389229810:web:7895cb408cf74b68535c6b',
};

const app = initializeApp(firebaseConfig);
export const database = getFirestore()