import React from 'react';
import {Link} from 'react-router-dom';


class Drink extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			quantity: 0,
			drink: this.props.drink,
			category: this.props.category,
			totalCost: 0,
			totalDrinks: [],
			finalPrice: 0

		};
		this.addDrink = this.addDrink.bind(this);
		this.removeDrink = this.removeDrink.bind(this);
		this.getPrice = this.getPrice.bind(this);

	}

	componentDidUpdate() {
		// console.log(this.props);
	}
	
	addDrink() {
		var {quantity, drink, totalDrinks} = this.state;
		var initialPrice = drink.price;
		var finalPrice = parseFloat((initialPrice * (quantity+1)).toFixed(2));
		var newDrink;
			
		if(totalDrinks.length === 0) {
			newDrink = {
				id: drink.id,
				name: drink.name,
				quantity: ++quantity,
				finalPrice
			};

			this.setState({
				// quantity: ++quantity,
				// finalPrice,
				totalDrinks: [newDrink]
			});
		}
		else {
			for(var d in totalDrinks) {
				console.log('dsf');
				// If this drinks has already been ordered at least once, update it, else add a new one
				if(totalDrinks[d].id === drink.id) {
					totalDrinks[d].finalPrice = finalPrice;
					totalDrinks[d].quantity = quantity;
					totalDrinks[d].id = drink.id;
					totalDrinks[d].quantity = quantity;
					newDrink = totalDrinks[d];
					// console.log(newDrink);
				}
				else {
					newDrink = {
						id: drink.id,
						name: drink.name,
						quantity: ++quantity,
						finalPrice
					};
					
					this.setState({
						quantity: ++quantity,
						finalPrice,
						totalDrinks: [newDrink]
					});

				}
			}

			this.setState({
				quantity: ++quantity,
				finalPrice,
				totalDrinks: [
					...totalDrinks,
					newDrink
				]
			});
		}

	}

	removeDrink() {
		
		var {quantity, drink} = this.state;
		var initialPrice = drink.price;
		var finalPrice = parseFloat((initialPrice * (quantity-1)).toFixed(2));

		if(quantity > 0) {
			this.setState({
				quantity: --quantity,
				finalPrice
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
		var {drink, category, quantity, totalCost, totalDrinks, finalPrice, totalDrinks} = this.state;
		console.log('finalPrice', totalDrinks);

		if(this.props.placeOrder) {
			var finalPrice;

			if(quantity > 0) {
				finalPrice = parseFloat((quantity * drink.price).toFixed(2));
				
				this.props.getSelectedDrinks(drink, finalPrice);

				// this.setState({
				// 	totalDrinks: [
				// 		...totalDrinks,
				// 		{
				// 			name: drink.name,
				// 			finalPrice: totalCost 
				// 		}
				// 	]
				// });
			}
			// this.props.getSelectedDrinks(drink, quantity);
		}
		
		// if(Object.keys(totalDrinks).length > 0) {
		// 	console.log(Object.keys(totalDrinks).length);
		// }
		
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