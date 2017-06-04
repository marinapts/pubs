import React from 'react';
import PubCard from 'PubCard';
import DataAPI from 'DataAPI';


class PubsPanel extends React.Component {
    constructor() {
        super();
        this.state = {
            pubs: [],
            searchPub: ''
        };

        this.searchPub = this.searchPub.bind(this);
        this.filterPubs = this.filterPubs.bind(this);

    }

    componentWillMount() {
        
        this.setState({
            pubs: DataAPI.pubs
        });
    }
    
    // Search pub by name
    searchPub() {
        var searchPub = this.refs.searchPub.value;
        
        this.setState({
            searchPub: searchPub.toLowerCase()
        });
    }

    filterPubs(pubs, searchPub) {

        // Filter all pubs by input text
        pubs = pubs.filter((pub) => {
            var name = pub.name.toLowerCase();

            // if there is no input text return all pubs, else return filtered pubs
            return searchPub.length === 0   || name.indexOf(searchPub) > -1; 
        });
        
        return pubs;
    }


    render() {
        var {pubs, searchPub} = this.state;
        var filteredPubs = this.filterPubs(pubs, searchPub);
        // console.log(searchPub, filteredPubs);

        return (
            <div className="container grey lighten-3">
                <header>
                    <h2 className="center">Edinburgh Pubs</h2>
                </header>
                <div className="row">
                    <div className="input-field col s10 offset-s1 m6 offset-m3">
                        <input id="searchPub" ref="searchPub" type="search" onChange={this.searchPub}></input>
                        <label htmlFor="searchPub">Search for a pub</label>
                    </div>
                </div>

                <div className="row">
                    <div className="col s5 offset-s1 m4">
                        <PubCard pubs={filteredPubs}/>
                    </div>
                </div>
            </div>
        );
    }
};

export default PubsPanel;