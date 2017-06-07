import React from 'react';

class Navbar extends React.Component {

	render () {
		return(
			<div>
				<nav>
					<div className="nav-wrapper">
						<a href="/" className="brand-logo">Pubs App</a>
					</div>
				</nav>
			</div>
		);
	}
};

export default Navbar;