import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './components/Header';
import MatchHistory from './components/MatchHistory';

import { getUser } from './redux/actions/actions';

class App extends Component {
    
    componentWillMount () {
        
        this.props.dispatch(getUser(this.props.match.params.user));
        
    }
    
    render() {
        
        return (
            
            <div>
                <Header />
                <MatchHistory />
            </div>
            
        );
    
    }
}

const mapStateToProps = state => ({
   
    user: state.users.user,
    loading: state.users.loading,
    error: state.users.error
    
});

export default connect(mapStateToProps)(App);