import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, hashHistory, browserHistory} from 'react-router-dom';

// Load components
import Navbar from 'Navbar';
import PubsPanel from 'PubsPanel';
import DrinksPanel from 'DrinksPanel';
import DisplayOrder from 'DisplayOrder';


window.jQuery = window.$ = require('jquery');
require('../node_modules/materialize-css/dist/js/materialize.min.js');


ReactDOM.render( 
	<BrowserRouter history={hashHistory}>
		<div>
			<Navbar />
			<Route exact path="/" component={() => (<PubsPanel />)} />
			<Route exact path="/:pub" component={DrinksPanel} />
			<Route exact path="/:pub/place-order" component={DisplayOrder} />
		</div>
	</BrowserRouter>,
  	document.getElementById('app')
);
