import React from 'react';
import {Link} from 'react-router-dom';
// import Drink from 'Drink';

class Drink extends React.Component {
	
	constructor() {
		super();
	}

    render() {
		var {drink} = this.props;
		console.log(drink);

    	return(
	    	<li className="collection-item avatar">
				<img src="img/beer.png" alt="" className="circle" />
				<span className="title">{drink.name}</span>

				<div className="secondary-content">
					£ {drink.price}
					<a><i className="material-icons">add_circle_outline</i></a>
				</div>
			</li>
    	)
    }
};

export default Drink;