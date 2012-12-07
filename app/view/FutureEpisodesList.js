Ext.define('SB.view.FutureEpisodesList', {
    extend: 'Ext.dataview.List',
    
    models: [
        'Episode'
    ],

    config: {
        itemTpl: '<div class="name">{show_name}</div><div class="subline">{number} - {ep_name}</div><div class="description">{ep_plot_display}</div>',
        cls: [
            'episodes',
            'dark'
        ],
        grouped: true,
        disableSelection: true,
        //onItemDisclosure: true,
        store: 'FutureEpisodes',
        plugins: [{
            xclass: 'SB.plugin.PullRefreshCache'
        }],
        listeners: {
            itemtap: function(list, index, target, record) {
                // TODO: Call server, get description and load it into the record
                var el = target.element.down('div.description');
                if (record.get('ep_plot_display')) {
                    record.set('ep_plot_display', '');
                } else {
                    record.set('ep_plot_display', record.get('ep_plot'));
                }

                // This is hacky as hell, but it works...
                /*
                url = SB.app.buildUrl({
                    cmd:     'episode',
                    tvdbid:  record.get('tvdbid'),
                    season:  record.get('season'),
                    episode: record.get('episode')
                });
                if (!record.get('description')) {
                    // Get it from the server
                    Ext.data.JsonP.request({
                        url: url,
                        callback: function(success, response) {
                            if (response.data) {
                                description = response.data.description;
                                if (!description) {
                                    description = "No episode overview.";
                                }
                                record.set('description', description);
                                record.set('description_display', description);
                            }
                        }
                    });
                } else {
                    if (record.get('description_display')) {
                        record.set('description_display', '');
                    } else {
                        record.set('description_display', record.get('description'));
                    }
                }
                */
            }
        }
    }
});