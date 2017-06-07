import React from 'react';
import {Link} from 'react-router-dom';
import DataAPI from 'DataAPI';
import DrinksCategory from 'DrinksCategory';

class DrinksPanel extends React.Component {
	
	constructor() {
		super();
		this.state = {
			drinks: [],
			pubInfo: {},
			placeOrder: false,
			totalCost: 0
		};

		this.placeOrder = this.placeOrder.bind(this);
		this.handleChangeDrinkQuantity = this.handleChangeDrinkQuantity.bind(this);
	}

	componentWillMount() {
		
		var pubURL = this.props.match.params.pub;
		var pubs = DataAPI.pubs;

		for(var pub in pubs) {

			if(pubs[pub].url === pubURL) {
				
				this.setState({
					drinks: pubs[pub].drinks,
					pubInfo: {
						name: pubs[pub].name,
						id: pubs[pub].id
					},
					finalOrder: {}
				});
			}
		}
	}

	componentDidMount() {
		$(document).ready(function(){
		    $('.collapsible').collapsible();
	     	$('.modal').modal();
	  	});
	}

	handleChangeDrinkQuantity(drink, category, value) {
		var {drinks} = this.state;
		var selectedCategory = drinks[category];
		// var initialPrice = drink.price;
		console.log(selectedCategory);
		// Update quantity and price of the selected drink
		for(var item in selectedCategory) {
			if(selectedCategory[item].id === drink.id) {
				var initialPrice = drink.price;
				selectedCategory[item].quantity += value;
				selectedCategory[item].finalPrice = parseFloat((initialPrice * (drink.quantity)).toFixed(2));
			}
		}

		this.setState({
			drinks
		});
	}	

	placeOrder() {
		var {drinks} = this.state;
		var totalCost = 0;

		// Remove any previous orders
		$('.totalDrinks').children('div').children('p').remove();
		// $('.totalCost').children('div').children('p').remove();

		Object.keys(drinks).forEach((key) => {

			for(var drink in drinks[key]) {
				var thisDrink = drinks[key][drink];

				if(thisDrink.quantity > 0) {
					totalCost = parseFloat((totalCost + thisDrink.finalPrice));

					$('.totalDrinks div:first-child').append(`<p>${thisDrink.name}</p>`);
					$('.totalDrinks div:nth-child(2)').append(`<p>X ${thisDrink.quantity}</p>`);
					$('.totalDrinks div:nth-child(3)').append(`<p>£ ${thisDrink.finalPrice}</p>`);
				}
			}

		});

		$('.totalCost').children('div').children('p').remove();
		$('.totalCost div').append(`<p>Total: £ ${totalCost} </p>`);
	}



    render() {
    	var {drinks, pubInfo, placeOrder} = this.state;
		console.log('grandpa state:', drinks);

        return (
        	<div className="container">
	        	<header>
	        	    <h2 className="center">{pubInfo.name}</h2>
	        	</header>

	        	<div className="row">
	        		<div className="col s12">
						<ul className="collapsible popout" data-collapsible="accordion">
							{
								Object.keys(drinks).map((key) => {
									return(
										<DrinksCategory 
											key={key} 
											category={key} 
											drinks={drinks}
											handleChangeDrinkQuantity={this.handleChangeDrinkQuantity}
											// handleRemoveDrink={this.handleRemoveDrink}
										/>
									)
								})
							}
						</ul>
	        		</div>
	        	</div>

	        	<div className="row">
	        		<div className="col s4 offset-s4">
	        			<button className="btn waves-light waves-blue" onClick={this.placeOrder}>
	        				Place order
	        			</button>
	        		</div>
	        	</div>

	        	<div className="row totalDrinks">
	        		<div className="col s4 offset-s1"></div>
	        		<div className="col s2"></div>
	        		<div className="col s3 offset-s1"></div>

	        	</div>

	        	<div className="row totalCost">
	        		<div className="col s6 offset-s3 m4 offset-m6"></div>
	        	</div>
        	</div>
            
        )
    }
};

export default DrinksPanel;