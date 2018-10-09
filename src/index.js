import React from 'react';
import ReactDOM from 'react-dom';

import './assets/css/styles.css';

import { Provider } from 'react-redux';

import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import App from './App';
import Home from './components/Home';

import registerServiceWorker from './registerServiceWorker';

import { store, history } from './redux/store';

ReactDOM.render((
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/user/:user" component={App} />
            </Switch>
        </ConnectedRouter>
    </Provider>
), document.getElementById('root'));

registerServiceWorker();