const request = require('request-promise');

module.exports = {
    
    getAll: (req, res, next) => {
      
        res.send('all');
        next();
        
    },
    getUser: (req, res, next) => {
        
        let key         = '37c817f6-fb84-43ce-b94c-ab78745e1927',
            baseUrl     = 'https://open.faceit.com/data/v4/players',
            matchesUrl  = 'https://open.faceit.com/data/v4/matches/';
        
        // Get user
        request(baseUrl + '?nickname=' + req.params.id, { auth: { 'bearer' : key } }).then((resp) => {
            
            let parsed      = JSON.parse(resp),
                data        = {},
                player_id   = parsed.player_id;
            
            data = { ...data, ...parsed };
            
            // Player stats
            request(baseUrl + '/' + player_id + '/stats/csgo', { auth: { 'bearer' : key } }).then((resp) => {
               
                let statsParsed = JSON.parse(resp);
                
                data = { ...data, ...statsParsed };
                
                request(baseUrl + '/' + player_id + '/history?game=csgo&offset=0&limit=20', { auth: { 'bearer' : key } }).then((resp) => {
                    
                    let matchesParsed       = JSON.parse(resp),
                        matchStatsInteger   = 0,
                        matchInteger        = 0;
                
                    data = { ...data, ...matchesParsed };
                    
                    let matchStats  = [],
                        matches     = [];
                    
                    matchesParsed.items.map((item) => {
                       
                        // Match stats 
                        request(matchesUrl + item.match_id + '/stats', { auth: { 'bearer' : key } }).then((resp) => {
                           
                            let matchStatsParsed = JSON.parse(resp);
                            
                            matchStats.push(matchStatsParsed);
                            
                            matchStatsInteger++;
                            
                            // Match data
                            request(matchesUrl + item.match_id, { auth: { 'bearer' : key } }).then((resp) => {

                                let matchParsed = JSON.parse(resp);

                                matches.push(matchParsed);

                                matchInteger++;
                                
                                if(matchStatsInteger === matchesParsed.items.length && matchInteger === matchesParsed.items.length) {
                                
                                    data.matchStats = matchStats;
                                    data.matches = matches;

                                    res.send(data);
                                    next();

                                }

                            }).catch((err) => {

                                next(err);

                            });

                        }).catch((err) => {
           
                            next(err);

                        });
                        
                    });
                    
                }).catch((err) => {
           
                    next(err);

                });
                
            }).catch((err) => {
           
                next(err);

            });
            
        }).catch((err) => {
           
            next(err);
            
        });
        
    }
    
}