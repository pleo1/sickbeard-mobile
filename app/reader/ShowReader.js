Ext.define('SB.reader.ShowReader', {
    extend: 'Ext.data.reader.Json',
    alias: 'reader.showreader',

    extractData: function (root) {
        var items = [];
        Ext.Object.each(root.data, function(season_num, season) {
            Ext.Object.each(season, function(episode_num, episode) {
                
                season_name = "Season " + season_num;
                if (season_num == '0') {
                    season_name = "Specials";
                }
                
                episode['season'] = season_num;
                episode['season_name'] = season_name;
                episode['episode'] = episode_num;
                items.push(episode);
            });
        });
        return this.callParent([items]);
    }
});