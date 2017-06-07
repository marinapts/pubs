import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, HashRouter, Route, hashHistory, browserHistory} from 'react-router-dom';

// Load components
import Navbar from 'Navbar';
import PubsPanel from 'PubsPanel';
import DrinksPanel from 'DrinksPanel'

window.jQuery = window.$ = require('jquery');
window.$.velocity = require('velocity-animate/velocity.js')
import 'Materialize';


ReactDOM.render( 
	<HashRouter history={hashHistory}>
		<div>
			<Navbar />
			<Route exact path="/" component={() => (<PubsPanel />)} />
			<Route exact path="/:pub" component={DrinksPanel} />
		</div>
	</HashRouter>,
  	document.getElementById('app')
);
