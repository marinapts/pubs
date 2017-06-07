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
			showButton: false
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
	  	});
	}
	
	// Handle add or remove drinks event. If value === 1 add a drink, if -1 remove it
	handleChangeDrinkQuantity(drink, category, value) {
		var {drinks} = this.state;
		var selectedCategory = drinks[category];

		// Update the quantity and price of the selected drink
		for(var item in selectedCategory) {
			if(selectedCategory[item].id === drink.id) {
				var initialPrice = drink.price;
				selectedCategory[item].quantity += value;
				selectedCategory[item].finalPrice = parseFloat((initialPrice * (drink.quantity)).toFixed(2));
			}
		}
		
		this.setState({
			drinks,
			showButton: true
		});
	}	

	placeOrder() {
		var {drinks} = this.state;
		var totalCost = 0;

		// Remove any previous orders
		$('.totalDrinks').children('div').children('p').remove();
		
		// Style the box surrounding the order
		$('.totalDrinks').css({
			border: '1px solid lightblue',
			margin: '0 20px 0 20px'
		});


		Object.keys(drinks).forEach((key) => {

			for(var drink in drinks[key]) {
				var thisDrink = drinks[key][drink];

				if(thisDrink.quantity > 0) {
					totalCost = parseFloat((totalCost + thisDrink.finalPrice).toFixed(2));

					$('.totalDrinks div:first-child').append(`<p>${thisDrink.name}</p>`);
					$('.totalDrinks div:nth-child(2)').append(`<p>X ${thisDrink.quantity}</p>`);
					$('.totalDrinks div:nth-child(3)').append(`<p>£ ${thisDrink.finalPrice}</p>`);
				}
				else {
					$('.totalDrinks').css({border: '0px'});
				}
			}

		});
		
		$('.totalCost').children('div').children('p').remove();
		$('.totalCost div').append(`<p style="font-weight: bold;">Total: £ ${totalCost} </p>`);
	}



    render() {
    	var {drinks, pubInfo, placeOrder, showButton} = this.state;
		// console.log(showButton);

        return (
        	<div className="container">
	        	<header>
	        	    <h3 className="center">{pubInfo.name}</h3>
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
										/>
									)
								})
							}
						</ul>
	        		</div>
	        	</div>

				{ showButton &&
		        	<div className="row padTopBottom20">
		        		<div className="col s4 offset-s4 m4 offset-m5">
		        			<button className="btn waves-light waves-blue" id="order" onClick={this.placeOrder}>
		        				Place order
		        			</button>
		        		</div>
		        	</div>
	        	}

	        	<div className="row totalDrinks">
	        		<div className="col s4 offset-s1 m5 offset-m1"></div>
	        		<div className="col s2 m2"></div>
	        		<div className="col s3 offset-s1 m3 <offset-m1></offset-m1>"></div>

	        	</div>

	        	<div className="row totalCost padTop20">
	        		<div className="col s6 offset-s3 m4 offset-m7"></div>
	        	</div>
        	</div>
            
        )
    }
};

export default DrinksPanel;