Ext.define('SB.reader.FutureEpisodeReader', {
    extend: 'Ext.data.reader.Json',
    alias: 'reader.futureepisodes',

    extractData: function (root) {
        var items = [];
        Ext.Object.each(root.data, function(type, item) {
            Ext.each(item, function(episode, index) {
                // Have to fake an ID since SB doesn't send one
                episode['id'] = episode.tvdbid+'-'+episode.season+'-'+episode.episode;
                items.push(episode);
            });
        });
        return this.callParent([items]);
    }
});