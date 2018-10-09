import React, { Component } from 'react';
import { connect } from 'react-redux';

import { history } from './../redux/store';

import { getUser } from './../redux/actions/actions';

class Search extends Component {
    
    constructor () {
        
        super();
        
        this.state = {
            search: ''
        }
        
        this.searchUser = this.searchUser.bind(this);
        
    }
    
    searchChange (evt) {
        
        this.setState({ search: evt.target.value });
        
    }
    
    searchUser () {
        
        history.push({
            pathname: `/user/${ this.state.search }`,
            state: { user: this.state.search }
        });
        
        this.props.dispatch(getUser(this.state.search));
        
        this.setState({ search: '' });
        this.refs.search.blur();
        
    }
    
    handleKeyPress = (evt) => {
        
        if(evt.key === 'Enter') {
            
            this.searchUser();
            
        }
        
    }
    
    render () {
        
        return (
            
            <div className="search">

                <input type="search" name="search" placeholder="Search for users..." ref="search" value={ this.state.search } onChange={ this.searchChange.bind(this) } onKeyPress={ this.handleKeyPress } />
            
            </div>
            
        );
        
    }
    
}

const mapStateToProps = state => ({
   
    user: state.users.user,
    loading: state.users.loading,
    error: state.users.error
    
});

export default connect(mapStateToProps)(Search);