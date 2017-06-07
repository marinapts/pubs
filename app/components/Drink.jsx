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
	}

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
		var {name, price, quantity, img} = drink;
		
    	return(
	    	<li className=" avatar row">
	    		<div className="col s2 m1">
	    			<img src={img} alt="" className="circle" />	
	    		</div>
				
				
				<div className="col s3 m3">
					<div className="title">{name}</div>
				</div>
				<div className="col s2 m2">
					<div className="price">£ <span >{this.getPrice().toFixed(2)}</span></div>
				</div>

				<div className="modifyQuantity">
					{ quantity === 0 && 
						<div className="col s3 m2 offset-m2">
							<div className="col s2 hide remove">
								<a><i className="material-icons">remove</i></a>
							</div>
							<div className="col s2 offset-s1 hide">
								<span className="quantity">{quantity}</span>
							</div>
						</div>
					}
					
					{ quantity > 0 && 
						<div className="col s3 m2 offset-m2">
							<div className="col s2 remove">
								<a onClick={this.removeDrink}><i className="material-icons">remove</i></a>
							</div>
							<div className="col s2 offset-s5">
								<span className="quantity">{quantity}</span>
							</div>
						</div>
					}

					<div className="col s2 m2 modifyQuantity">
						<a onClick={this.addDrink}><i className="material-icons">add</i></a>
					</div>
				</div>
				
			</li>
    	)
    }
};

export default Drink;