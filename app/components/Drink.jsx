import React from 'react';
import {Link} from 'react-router-dom';


class Drink extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			drink: this.props.drink,
			category: this.props.category,
		};

		this.addDrink = this.addDrink.bind(this);
		this.removeDrink = this.removeDrink.bind(this);
		this.getPrice = this.getPrice.bind(this);
		// this.changeDrinkQuantity = this.changeDrinkQuantity.bind(this);
	}
	
	// changeDrinkQuantity(e) {
	// 	e.preventDefault();
	// 	var {drink, category} = this.state;
	// 	this.props.handleChangeDrinkQuantity(drink, category, value);
	// }

	addDrink(e) {
		e.preventDefault();
		var {drink, category} = this.state;
		this.props.handleChangeDrinkQuantity(drink, category, 1);
	}

	removeDrink(e) {
		e.preventDefault();
		var {drink, category} = this.state;
		this.props.handleChangeDrinkQuantity(drink, category, -1);	
	}
	
	// Display the price of a drink - initial or incremented 
	getPrice() {
		var {drink} = this.props;
		var {price, quantity, finalPrice} = drink;

		if(quantity === 0) {
			return price;
		}
		else {
			return finalPrice;
		}
	}
	

    render() {
		var {drink, category} = this.props;
		var {name, price, quantity} = drink;
		
    	return(
	    	<li className="collection-item avatar row">
				<img src="img/beer.png" alt="" className="circle" />
				
				<div className="col s4">
					<span className="title">{name}</span>
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