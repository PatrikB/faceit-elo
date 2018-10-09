import React, { Component } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';

class MatchHistory extends Component {
    
    showMatches () {
        
        const matches = this.props.user.data.matchStats;
        
        const matchArr = matches.map((item) => { 
            
            let mObj = {};
            
            mObj.stats = item.rounds[0];
            
            this.props.user.data.matches.map((match) => {
                   
                if(match.match_id === item.rounds[0].match_id)
                    mObj.match = match;

            });
            
            return mObj;
            
        });
        
        matchArr.sort((a, b) => (a.match.finished_at < b.match.finished_at) ? 1 : ((b.match.finished_at < a.match.finished_at) ? -1 : 0));
        
        const listMatches = matchArr.map((item) => {
            
            if(item.stats && item.match) {
                
                let player      = null,
                    team        = null;
            
                item.stats.teams.map((teams) => {
                    
                    teams.players.map((p) => {
                       
                        if(p.player_id === this.props.user.data.player_id) {
                        
                            player  = p.player_stats;
                            team    = teams;

                        }
                        
                    });

                });
                
                let result = null;
                
                if(item.stats.round_stats.Winner === team.team_id)
                    result = 'won';
                else
                    result = 'lost';
                
                let kd          = (player.Kills / player.Deaths).toFixed(2),
                    kdClass     = null;
                
                if(kd >= this.props.user.data.lifetime['Average K/D Ratio'])
                    kdClass = 'positive';
                else
                    kdClass = 'negative';
                
                if(kd === 1.00)
                    kd = 1;
                
                let score           = null,
                    teamOneScore    = Number(item.stats.round_stats.Score.slice(0, 2).trim()),
                    teamTwoScore    = Number(item.stats.round_stats.Score.slice(4).trim());
                
                if(result === 'won')
                    score = (teamOneScore > teamTwoScore) ? teamOneScore + ' - ' + teamTwoScore : teamTwoScore + ' - ' + teamOneScore;
                else if(result === 'lost')
                    score = (teamOneScore > teamTwoScore) ? teamTwoScore + ' - ' + teamOneScore : teamOneScore + ' - ' + teamTwoScore;
                
                let finished = null;
                
                finished = new Date(item.match.finished_at * 1000);

                return <tr key={ item.stats.match_id } className={ 'match-' + result }><td><p>{ result }</p></td><td><p className={ kdClass }><strong>{ player.Kills }-{ player.Assists }-{ player.Deaths }</strong> ({ kd })</p></td><td>{ score }</td><td><p>{ item.stats.round_stats.Map.slice(3) }</p></td><td><p><Moment format="MMMM DD, HH:mm">{ finished }</Moment></p></td></tr>
                
            }
            
        });
        
        return listMatches;
        
    }
    
    render () {
        
        const { error, loading, user } = this.props;
        
        if (error) {
            return null;
        }
        
        if (loading || !user.data) {
            return <div className="loadingMsg">Loading match history<span className="dot">.</span><span className="dot">.</span><span className="dot">.</span></div>;
        }
        
        if(user.data) {
            
            if(!user.data.games.csgo)
                return <div>Error! You do not have CS:GO connected to your Faceit account</div>;
        
            return (

                <main className="match-history">

                    <h4><span>Match history</span></h4>

                    <div className="container">

                        <table className="table matches">
                            <thead>
                                <tr>
                                    <th>Result</th>
                                    <th>K-A-D (K/D)</th>
                                    <th>Score</th>
                                    <th>Map</th>
                                    <th>Game ended</th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.showMatches() }
                            </tbody>
                        </table>

                    </div>

                </main>

            );
            
        }
        
    }
    
}

const mapStateToProps = state => ({
   
    user: state.users.user,
    match: state.matches,
    loading: state.users.loading,
    error: state.users.error
    
});

export default connect(mapStateToProps)(MatchHistory);