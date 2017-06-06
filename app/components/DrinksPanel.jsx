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
		this.getSelectedDrinks = this.getSelectedDrinks.bind(this);
		this.calculateTotalCost = this.calculateTotalCost.bind(this);
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

	
	placeOrder() {
		// console.log('placeOrder button');
		this.setState({
			placeOrder: true
		});
	}

	getSelectedDrinks(drink, finalPrice) {
		$('.collapsible').collapsible('close');

		// var {totalCost} = this.state;
		var {name, id, price} = drink;
		console.log('drinkspanel', name, finalPrice);
		this.calculateTotalCost(finalPrice);
		
	}

	calculateTotalCost(finalPrice) {
		var {totalCost} = this.state;
		totalCost += finalPrice;

		// this.setState({
		// 	totalCost
		// });	
		console.log('total', totalCost += finalPrice);
	}

    render() {
    	var {drinks, pubInfo, placeOrder} = this.state;
		
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
										<DrinksCategory key={key} category={key} drinks={drinks} getSelectedDrinks={this.getSelectedDrinks} placeOrder={placeOrder} />
									)
								})
							}
						</ul>
	        		</div>
	        	</div>

	        	<div className="row">
	        		<div className="col s4 offset-s4">
		        		<Link to="/place-order">
		        			<button className="btn waves-light waves-blue" onClick={this.placeOrder}>
		        				Place order
		        			</button>
	        			</Link>
	        		</div>
	        	</div>
        	</div>
            
        )
    }
};

export default DrinksPanel;