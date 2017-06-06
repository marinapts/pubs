import React from 'react';
import {Link} from 'react-router-dom';
import Drink from 'Drink';

class DrinksCategory extends React.Component {
	
	constructor() {
		super();
	}

    render() {
		var {category, drinks, getSelectedDrinks, placeOrder} = this.props;
		var icon = category === 'beers' ? 'local_drink' : 'local_bar'; 

    	return(
	    	<li>
	    		<div className="collapsible-header"><i className="material-icons">{icon}</i>{category}</div>
	    		
	    		<div className="collapsible-body">
	    			<ul className="collection">
	    				{
	    					drinks[category].map((drink, key) => {

	    						return(
	    							<Drink key={key} category={category} drink={drink} getSelectedDrinks={getSelectedDrinks} placeOrder={placeOrder}/>
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