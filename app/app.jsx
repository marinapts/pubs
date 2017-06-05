import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, hashHistory, browserHistory} from 'react-router-dom';

// Load components
import Navbar from 'Navbar';
import PubsPanel from 'PubsPanel';
import Drinks from 'Drinks';


window.jQuery = window.$ = require('jquery');
// require('Materialize');
require('../node_modules/materialize-css/dist/js/materialize.min.js');
// require('JqueryValidate');


ReactDOM.render( 
	<BrowserRouter history={hashHistory}>
		<div>
			<Navbar />
			<Route exact path="/" component={() => (<PubsPanel />)} />
			<Route exact path="/:pub" component={Drinks} />
		</div>
	</BrowserRouter>,
  	document.getElementById('app')
);
