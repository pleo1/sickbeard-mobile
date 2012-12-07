Ext.define('SB.model.Episode', {
    extend: 'Ext.data.Model',

    config: {
        fields: [{
            name: 'ep_name'
        },{
            name: 'show_name'
        },{
            name: 'show_status'
        },{
            name: 'airs'
        },{
            name: 'ep_plot'
        },{
            name: 'episode',
            type: 'int'
        },{
            name: 'network'
        },{
            name: 'quality'
        },{
            name: 'tvdbid',
            type: 'int'
        },{
            name: 'weekday',
            type: 'int'
        },{
            name: 'airdate',
            type: 'date',
            dateFormat: 'Y-m-d'
        },{
            name: 'date',
            type: 'date',
            dateFormat: 'Y-m-d G:i'
        },{
            name: 'paused',
            type: 'boolean'
        },{
            name: 'season',
            type: 'int'
        },{
            name: 'provider'
        },{
            name: 'resource'
        },{
            name: 'resource_path'
        },{
            name: 'status'
        },{
            name: 'season_name'
        },{
            name: 'name'
        },{
            name: 'ep_plot_display'
        },{
            name: 'id',
            convert: function(v, r) {
                var tvdbid  = r.get('tvdbid'),
                    season  = r.get('season'),
                    episode = r.get('episode'),
                    id = '';

                if (tvdbid) {
                    id += tvdbid+'-';
                }

                id += season+'-'+episode;

                return id;
            }
        },{
            name: 'airtime',
            convert: function(v, r) {
                var airdate = r.get('airdate'),
                    airs    = r.get('airs'),
                    airtime;
                
                if (airdate && airs) {
                    airtime = Ext.Date.parse(Ext.Date.format(airdate, 'Y-m-d')+' '+airs, 'Y-m-d l g:i A');
                }

                if (!airtime) {
                    return airdate;
                }
                return airtime;
            }
        },{
            name: 'number',
            type: 'string',
            convert: function(v, record) {
                var episode = record.get('episode'),
                    season  = record.get('season'),
                    value   = String(season)+"x";

                if (episode < 10) {
                    value += "0"+String(episode);
                } else {
                    value += String(episode);
                }
                return value;
            }
        }]
    }
});