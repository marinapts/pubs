import React from 'react';
import DataAPI from 'DataAPI';

class Drinks extends React.Component {
	
	constructor() {
		super();
		this.state = {
			drinks: [],
			pubInfo: {}
		};
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
									console.log(key, drinks[key]);
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
																		<a href="#add-quantity-modal"><i className="material-icons">add_circle_outline</i></a>
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
								<h4>Modal Header</h4>
								<p>A bunch of text</p>
							</div>
							<div className="modal-footer">
								<a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat ">Agree</a>
							</div>
						</div>

	        		</div>
	        	</div>
        	</div>
            
        )
    }
};

export default Drinks;