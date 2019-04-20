import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';
import rootReducer from './reducers/index';

import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    version: 2.5,
    storage,
    migrate: (state) => {
        return (
            Promise.resolve({
                ...state,
                favorites: {
                    ...state.favorites,
                    moves: {
                        ...state.favorites.moves,
                        julia: {},
                        negan: {},
                    }
                }
            })
        )
    },
    whitelist: [
        'settings',
        'favorites'
    ],
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = createStore(
    persistedReducer,
    {},
    composeEnhancers(
        applyMiddleware(
            thunk,
            // logger
        ),
    ),
);


let persistor = persistStore(store);

export default { store, persistor };
