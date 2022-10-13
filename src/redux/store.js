import { configureStore } from '@reduxjs/toolkit' 
import thunk from 'redux-thunk'

import user from './slices/usersSlice'

// const stringMiddleware = () => (next) => (action) => {
//     if (typeof action === 'string') {
//         return next({
//             type: action
//         })
//     }
//     return next(action)
// }

export const store = configureStore({
    reducer: {
        user
    },
    middleware: [thunk]
})