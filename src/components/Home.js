import React, { Component } from 'react';

import Search from './Search';

class Home extends Component {
    
    render() {
        
        return (
            
            <main className="home-container container">
            
                <Search />
            
            </main>
            
        );
    
    }
}

export default Home;