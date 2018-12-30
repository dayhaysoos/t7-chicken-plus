import { createStore, applyMiddleware, compose } from 'redux';
import { createMigrate, persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';
import rootReducer from './reducers/index';

import storage from 'redux-persist/lib/storage';

const migrations = {
    0: (state) => ({
        ...state,
        shaheen: {}
    }),
    1: (state) => ({
        shaheen: state.favorites.moves.shaheen
    })
};

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    migrate: createMigrate(migrations, { debug: false }),
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
