import React, { Component } from 'react';

import Search from './Search';
import User from './User';

class Header extends Component {
    
    render () {
        
        return (
            
            <header>
                
                <Search />
                <User />
            
            </header>
            
        );
        
    }
    
}

export default Header;