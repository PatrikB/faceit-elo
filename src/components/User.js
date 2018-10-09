import React, { Component } from 'react';
import { connect } from 'react-redux';

const levels = {
    1: {
        start: 0,
        end: 800,
        color: 'silver'
    },
    2: {
        start: 801,
        end: 950,
        color: 'green'
    },
    3: {
        start: 951,
        end: 1100,
        color: 'green'
    },
    4: {
        start: 1101,
        end: 1250,
        color: 'yellow'
    },
    5: {
        start: 1251,
        end: 1400,
        color: 'yellow'
    },
    6: {
        start: 1401,
        end: 1550,
        color: 'yellow'
    },
    7: {
        start: 1551,
        end: 1700,
        color: 'yellow'
    },
    8: {
        start: 1701,
        end: 1850,
        color: 'orange'
    },
    9: {
        start: 1851,
        end: 2000,
        color: 'orange'
    },
    10: {
        start: 2001,
        end: false,
        color: 'red'
    }
}

const max = 2000;

class User extends Component {
    
    getNextLevel (currentLevel, currentElo) {
        
        if(currentLevel === 10) {
            
            return;
            
        }
        
        return <p><strong>{ (levels[currentLevel].end - currentElo) }</strong> more points for level { (currentLevel + 1) }</p>
        
    }
        
    eloScale (elo) {
        
        let width = 0;
        
        width = this.calcWidthProgress(elo);
        
        if(elo >= max)
            width = 100;
        
        return  (
                <div>
                    <progress value={ width } max="100">{ width }</progress>
                    <div className="marker" style={{ width: '16%' }}><h4>1</h4><p>{ this.eloRange(1) }</p></div>
                    <div className="marker" style={{ width: '8.5%' }}><h4>2</h4><p>{ this.eloRange(2) }</p></div>
                    <div className="marker" style={{ width: '8.5%' }}><h4>3</h4><p>{ this.eloRange(3) }</p></div>
                    <div className="marker" style={{ width: '8.5%' }}><h4>4</h4><p>{ this.eloRange(4) }</p></div>
                    <div className="marker" style={{ width: '8.5%' }}><h4>5</h4><p>{ this.eloRange(5) }</p></div>
                    <div className="marker" style={{ width: '8.5%' }}><h4>6</h4><p>{ this.eloRange(6) }</p></div>
                    <div className="marker" style={{ width: '8.5%' }}><h4>7</h4><p>{ this.eloRange(7) }</p></div>
                    <div className="marker" style={{ width: '8.5%' }}><h4>8</h4><p>{ this.eloRange(8) }</p></div>
                    <div className="marker" style={{ width: '8.5%' }}><h4>9</h4><p>{ this.eloRange(9) }</p></div>
                    <div className="marker" style={{ width: '16%' }}><h4>10</h4><p>{ this.eloRange(10) }</p></div>
                </div>
        )
        
    }
        
    calcWidthProgress (elo) {
        
        let width = 0,
            floor = 0;
        
        if(elo >= max)
            return 100;
        
        if(elo <= 800) {
            
            width += (elo - floor) / 800 * 16;
            
        }
        
        if(elo > 800) {
            
            width += 16;
            
            floor = 800;
            
            if(elo > 950) {
                
                width += 8.5;
                floor = 950;
                
            }
            
            if(elo > 1100) {
                
                width += 8.5;
                floor = 1100;
                
            }
            
            if(elo > 1250) {
                
                width += 8.5;
                floor = 1250;
                
            }
            
            if(elo > 1400) {
                
                width += 8.5;
                floor = 1400;
                
            }
            
            if(elo > 1550) {
                
                width += 8.5;
                floor = 1550;
                
            }
            
            if(elo > 1700) {
                
                width += 8.5;
                floor = 1700;
                
            }
            
            if(elo > 1850) {
                
                width += 8.5;
                floor = 1850;
                
            }
            
            width += (elo - floor) / 150 * 8.5;
            
        }
        
        return width;
        
    }
    
    calcWidth (level) {
        
        let width = ((levels[level].end - levels[level].start) / max) * 100;
        
        return width + '%';
        
    }

    eloRange (level) {
        
        if(level === 10)
            return levels[level].start + '+';
        
        return levels[level].start + ' - ' + levels[level].end;
        
    }
    
    render () {
        
        const { error, loading, user } = this.props;
        
        if (error) {
            return <div className="errorMsg"><strong>Error!</strong> { error.message }</div>;
        }
        
        if (loading || !user.data) {
            return <div className="loadingMsg">Loading user data<span className="dot">.</span><span className="dot">.</span><span className="dot">.</span></div>;
        }
        
        if(user.data) {
            
            if(!user.data.games.csgo)
                return <div>Error! You do not have CS:GO connected to your Faceit account</div>;
            
            return (
                
                <div className={ 'profile-container color-' + levels[user.data.games.csgo.skill_level].color }>
            
                    <div className="container">

                        <div className="row">

                            <div className="col">

                                <div className="avatar">

                                    <img src={ user.data.avatar } alt="Avatar" />

                                </div>

                            </div>

                            <div className="col">

                                <div className="nickname">

                                    <h1>{ user.data.nickname }</h1>

                                    <h3><strong>{ user.data.games.csgo.faceit_elo }</strong> ELO</h3>

                                    { this.getNextLevel(user.data.games.csgo.skill_level, user.data.games.csgo.faceit_elo) }

                                </div>

                            </div>

                            <div className="col">

                                <div className="level">

                                    <h1>{ user.data.games.csgo.skill_level }</h1>

                                </div>

                            </div>

                        </div>
        
                        <div className="elo-scale">
                                
                            { this.eloScale(user.data.games.csgo.faceit_elo) }
                            
                        </div>
        
                        <div className="row stats">
                                    
                                <div className="col">
                                    
                                    <div className="inner">
                                        
                                        <p>K/D</p>
                                        
                                        <h4>{ user.data.lifetime['Average K/D Ratio'] }</h4>
                                        
                                    </div>
                                    
                                </div>
        
                                <div className="col">
                                    
                                    <div className="inner">
                                        
                                        <p>Matches won</p>
                                        
                                        <h4>{ user.data.lifetime['Wins'] }</h4>
                                        
                                    </div>
                                    
                                </div>
        
                                <div className="col">
                                    
                                    <div className="inner">
                                        
                                        <p>Average HS</p>
                                        
                                        <h4>{ user.data.lifetime['Average Headshots %'] }</h4>
                                        
                                    </div>
                                    
                                </div>
        
                                <div className="col">
                                    
                                    <div className="inner">
                                        
                                        <p>Win rate</p>
                                        
                                        <h4>{ user.data.lifetime['Win Rate %'] }</h4>
                                        
                                    </div>
                                    
                                </div>
        
                                <div className="col">
                                    
                                    <div className="inner">
                                        
                                        <p>Longest win streak</p>
                                        
                                        <h4>{ user.data.lifetime['Longest Win Streak'] }</h4>
                                        
                                    </div>
                                    
                                </div>
                            
                        </div>

                    </div>
        
                </div>

            );
            
        }
        
    }
    
}

const mapStateToProps = state => ({
   
    user: state.users.user,
    loading: state.users.loading,
    error: state.users.error
    
});

export default connect(mapStateToProps)(User);