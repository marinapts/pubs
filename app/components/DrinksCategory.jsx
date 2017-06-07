import React from 'react';
import {Link} from 'react-router-dom';
import Drink from 'Drink';

class DrinksCategory extends React.Component {
	
    render() {
		var {category, drinks, handleChangeDrinkQuantity} = this.props;
		var icon = '';
		// Different icon for each category 
		switch(category.toLowerCase()) {
			case 'beers':
				icon = '127866';
				break;
			case 'wines':
				icon = '127863';
				break;
			case 'cocktails':
				icon = '127864';
				break;
			
		}

    	return(
	    	<li>
	    		<div className="collapsible-header"><i className="material-icons" dangerouslySetInnerHTML={{__html: `&#${icon};`}}></i>{category}</div>
	    		
	    		<div className="collapsible-body">
	    			<ul className="collection">
	    				{
	    					drinks[category].map((drink, key) => {

	    						return(
	    							<Drink 
	    								key={key} 
	    								category={category} 
	    								drink={drink}
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