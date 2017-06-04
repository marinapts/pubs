import React from 'react';
import {Link} from 'react-router-dom';

class PubCard extends React.Component {
	
	constructor() {
		super();
	}

    render() {
    	let {pubs} = this.props;

        return (
        	<div>
        	{
	        	pubs.map((pub, key) => {
					return(
						<Link to={`/${pub.url}`} key={pub.id}>
							<div className="card-panel grey-text center">
								<h5>{pub.name}</h5>
							    <p>{pub.address}</p>
							</div>
						</Link>
					)
	        	})
        	}
        	</div>
            
        )
    }
};

export default PubCard;