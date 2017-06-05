import React from 'react';
import {Link} from 'react-router-dom';
import Drink from 'Drink';

class DrinksCategory extends React.Component {
	
	constructor() {
		super();
	}

    render() {
		var {category, drinks} = this.props;
		// console.log(category, drinks[category]);
		var icon = category === 'beers' ? 'local_drink' : 'local_bar'; 

    	return(
	    	<li>
	    		<div className="collapsible-header"><i className="material-icons">{icon}</i>{category}</div>
	    		
	    		<div className="collapsible-body">
	    			<ul className="collection">
	    				{
	    					drinks[category].map((drink, key) => {

	    						return(
	    							<Drink key={key} drink={drink}/>
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