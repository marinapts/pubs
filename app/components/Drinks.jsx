import React from 'react';
import DataAPI from 'DataAPI';

class Drinks extends React.Component {
	
	constructor() {
		super();
		this.state = {
			drinks: [],
			pubInfo: {}
		};
		this.addQuantity = this.addQuantity.bind(this);
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
					}
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

	openModal(drink) {
		$('select').material_select();
		
		$('#add-quantity-modal').modal('open');
		$('select').val('1');
		
		$('#add-quantity-modal h5').html(drink.name);
		$('#add-quantity-modal .price').html(drink.price);

		console.log($('select :selected'));

		$('select').change(() => {
	  		
			var selectedQuantity = $('select :selected').val();
			// var currentPrice = $('#add-quantity-modal .price').html();
	  		console.log(selectedQuantity);

	  		// Update price according to the quantity selected
	  		$('#add-quantity-modal .price').html(selectedQuantity * drink.price);

		});
	}

	addQuantity() {
		// var currentQuantity = $('#add-quantity-modal p').html();
			
		// $('#add-quantity-modal p').html(currentQuantity++);
		// console.log('addQuantity', typeof $('select :selected').text(), typeof $('select :selected').val());
		var quantity = parseInt($('select :selected').val());
		console.log('quantity', quantity);

	}

    render() {
    	var {drinks, pubInfo} = this.state;
		
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
									// console.log(key, drinks[key]);
									var icon = key === 'beers' ? 'local_drink' : 'local_bar'; 
									var defaultQuantity = 1;

									return(
										<li key={key}>
											<div className="collapsible-header"><i className="material-icons">{icon}</i>{key}</div>
											<div className="collapsible-body">
												<ul className="collection">
													{
														drinks[key].map((drink, key) => {
															return(
																<li className="collection-item avatar" key={key}>
																	<img src="img/beer.png" alt="" className="circle" />
																	<span className="title">{drink.name}</span>
																	
																	<div className="secondary-content">
																		£ {drink.price}
																		<a onClick={() => {this.openModal(drink)}} ><i className="material-icons">add_circle_outline</i></a>
																	</div>
																</li>
															)
														})
													}
											    </ul>
											</div>
										</li>
									)
								})
							}
						</ul>
    			      	

						
						<div id="add-quantity-modal" className="modal modal-fixed-footer">
							<div className="modal-content">
								<h5></h5>
								<div className="row">
									<div className="col s6">
										<div className="row">
											<div className="col s10">
												£ <span className="price"></span>	
											</div>
										</div>
									</div>
									<div className="col s6">
										<div className="input-field col s12">
											<select>
												<option value="" disabled>Choose quantity</option>
												<option value="1" defaultValue>1</option>
												<option value="2">2</option>
												<option value="3">3</option>
											</select>
											<label>Quantity</label>
										</div>
									</div>
									
								</div>
							</div>
							<div className="modal-footer">
								<a onClick={this.addQuantity} className="modal-action modal-close waves-effect waves-green btn-flat ">Add to order</a>
							</div>
						</div>

	        		</div>
	        	</div>
        	</div>
            
        )
    }
};

export default Drinks;