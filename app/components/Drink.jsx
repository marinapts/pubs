import React from 'react';
import {Link} from 'react-router-dom';
// import Drink from 'Drink';

class Drink extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			quantity: 0,
			drink: this.props.drink,
			category: this.props.category,
			totalCost: 0

		};
		this.addDrink = this.addDrink.bind(this);
		this.removeDrink = this.removeDrink.bind(this);
		this.getPrice = this.getPrice.bind(this);

	}
	
	addDrink() {
		var {quantity, drink} = this.state;
		var initialPrice = drink.price;

		this.setState({
			quantity: ++quantity,

		});
	}

	removeDrink() {
		
		var {quantity, drink} = this.state;
		var initialPrice = drink.price;
		
		if(quantity > 0) {
			this.setState({
				quantity: --quantity,

			});
		}
	}
	
	getPrice() {
		var {drink, quantity} = this.state;
		if(quantity === 0) {
			return drink.price;
		}
		else {
			return quantity * drink.price;
		}
	}


    render() {
		var {drink, category, quantity} = this.state;
		console.log(drink.name, quantity);

    	return(
	    	<li className="collection-item avatar row">
				<img src="img/beer.png" alt="" className="circle" />
				
				<div className="col s4">
					<span className="title">{drink.name}</span>
				</div>
				<div className="col s3">
					£ <span className="price">{this.getPrice().toFixed(2)}</span>
				</div>

				<div className="secondary-content">
					{ quantity === 0 && 
						<div>
						<div className="col s1 hide remove">
							<a><i className="material-icons">remove</i></a>
						</div>
						<div className="col s2 offset-s1 hide">
							<span className="quantity">{quantity}</span>
						</div>
						</div>
					}
					
					{ quantity > 0 && 
						<div>
						<div className="col s1 remove">
							<a onClick={this.removeDrink}><i className="material-icons">remove</i></a>
						</div>
						<div className="col s2 offset-s1">
							<span className="quantity">{quantity}</span>
						</div>
						</div>
					}

					<div className="col s1">
						<a onClick={this.addDrink}><i className="material-icons">add</i></a>
					</div>
				</div>
			</li>
    	)
    }
};

export default Drink;