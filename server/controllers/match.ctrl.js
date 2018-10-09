const request = require('request');

module.exports = {
    
    getMatches: (req, res, next) => {
        
        let key         = '37c817f6-fb84-43ce-b94c-ab78745e1927',
            baseUrl     = 'https://open.faceit.com/data/v4/matches/';
        
        
        
    },
    getMatch: (req, res, next) => {
        
        let key         = '37c817f6-fb84-43ce-b94c-ab78745e1927',
            baseUrl     = 'https://open.faceit.com/data/v4/matches/';
        
        request(baseUrl + req.params.id, { auth: { 'bearer' : key } }, (err, resp, body) => {
            
            let parsed  = JSON.parse(body),
                data    = {};
            
            data = { ...data, ...parsed };
            
            res.send(data);
            next();
            
        });
        
    }
    
}