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
        this.cardsEqualHeight = this.cardsEqualHeight.bind(this);
        
    }

    componentWillMount() {
        this.setState({
            pubs: DataAPI.pubs
        });
    }

    componentDidMount() {
        $(document).ready(() => {
            this.cardsEqualHeight('.card-panel');
        });

        $(window).resize(() => {
            this.cardsEqualHeight('.card-panel');
        });
    }

    // Set equal height for all cards 
    cardsEqualHeight(targetClass) {
        var highestBox = 0;
            $(targetClass).each(function(){  
                if($(this).height() > highestBox){  
                highestBox = $(this).height();  
            }
        });    
        $(targetClass).height(highestBox);
    }
    
    // Search pub by name
    searchPub() {
        var searchPub = this.refs.searchPub.value;
        
        this.setState({
            searchPub: searchPub.toLowerCase()
        });
    }
    
    // Filter all pubs by input text
    filterPubs(pubs, searchPub) {
        
        pubs = pubs.filter((pub) => {
            var name = pub.name.toLowerCase();

            // if there is no input text then return all pubs, else return filtered pubs
            return searchPub.length === 0   || name.indexOf(searchPub) > -1; 
        });
        
        return pubs;
    }


    render() {
        var {pubs, searchPub} = this.state;
        var filteredPubs = this.filterPubs(pubs, searchPub);

        return (
            <div className="container">
                <header>
                    <h3 className="center">Edinburgh Pubs</h3>
                </header>
                <div className="row">
                    <div className="input-field col s10 offset-s1 m6 offset-m3">
                        <input id="searchPub" ref="searchPub" type="search" onChange={this.searchPub}></input>
                        <label htmlFor="searchPub">Search for a pub</label>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col s12">
                        <div className="row">
                            { filteredPubs.length > 0 &&
                                <PubCard pubs={filteredPubs}/>
                            }

                            { filteredPubs.length === 0 &&
                                <div className="col s6 offset-s3 grey-text center">
                                    <h5>No pubs found</h5>
                                </div>
                            }
                        </div>
                                
                    </div>
                </div>
            </div>
        );
    }
};

export default PubsPanel;