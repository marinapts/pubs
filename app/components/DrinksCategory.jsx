import React from 'react';
import {Link} from 'react-router-dom';
import Drink from 'Drink';

class DrinksCategory extends React.Component {
	
	constructor() {
		super();

		// this.handleAddDrink = this.handleAddDrink.bind(this);
		// this.handleRemoveDrink = this.handleRemoveDrink.bind(this);
		// this.handleChangeDrinkQuantity = this.handleChangeDrinkQuantity.bind(this);

	}

	// handleAddDrink(drink, category) {
		
	// 	this.props.handleAddDrink(drink, category);
	// }

	// handleChangeDrinkQuantity(drink, category, value) {
		
	// 	this.props.handleChangeDrinkQuantity(drink, category, value);
	// }
	
	// handleRemoveDrink(drink, category) {
		
	// 	this.props.handleRemoveDrink(drink, category);
	// }

    render() {
		var {category, drinks, handleChangeDrinkQuantity} = this.props;
		var icon = category === 'beers' ? 'local_drink' : 'local_bar'; 

    	return(
	    	<li>
	    		<div className="collapsible-header"><i className="material-icons">{icon}</i>{category}</div>
	    		
	    		<div className="collapsible-body">
	    			<ul className="collection">
	    				{
	    					drinks[category].map((drink, key) => {

	    						return(
	    							<Drink 
	    								key={key} 
	    								category={category} 
	    								drink={drink}
	    								// handleAddDrink={this.handleAddDrink}
	    								// handleRemoveDrink={this.handleRemoveDrink}
	    								handleChangeDrinkQuantity={handleChangeDrinkQuantity}
    								/>
	    						)
	    					})
	    				}
	    		    </ul>
	    		</div>
	    	</li>
    	)
    }
};

export default DrinksCategory;