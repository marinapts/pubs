import React from 'react';

class Navbar extends React.Component {
	
	componentDidMount () {
		$( document ).ready(function(){
			$(".button-collapse").sideNav();
		});
	}

	render () {
		return(
			<div>
				<nav>
					<div className="nav-wrapper">
						<a href="/" className="brand-logo">Pubs App</a>
						<a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
						
						<ul className="right hide-on-med-and-down">
							<li className="active"><a href="sass.html">Pubs</a></li>
						</ul>

						<ul className="side-nav" id="mobile-demo">
							<li className="active"><a href="sass.html">Pubs</a></li>
						</ul>
					</div>
					</nav>
			</div>
		);
	}
};

export default Navbar;