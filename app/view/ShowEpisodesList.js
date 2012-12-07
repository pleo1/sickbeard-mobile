Ext.define('SB.view.ShowEpisodesList', {
    extend: 'Ext.dataview.List',

    config: {
        //ui: 'round',
        //pinHeaders: false,
        grouped: true,
        cls: [
          'episodes',
          'dark'
        ],
        url: '',
        disableSelection: true,
        showRecord: {},
        //pressedCls: '',
        plugins: [{
            xclass: 'SB.plugin.PullRefreshCache'
        }],
        itemTpl: '<div class="info {[values.status.toLowerCase()]}">'+
                    '<div style="display: none" class="x-button-normal x-button x-layout-box-item {[values.status.toLowerCase()]}">'+
                        '<span class="x-button-icon cloud_download x-icon-mask"></span>'+
                    '</div>'+
                    '<div class="name">{number} - {name}</div>'+
                    '<div class="subline">{airdate:date("M d, Y")}</div>'+
                    '<div class="subline">{status}</div>'+
                    '<div class="description">{description}</div>'+
                '</div>',
        store: {
            model: 'SB.model.Episode',
            proxy: {
                type: 'sbproxy',
                cacheKey: 'showEpisodes',
                url: '',
                reader: 'showreader'
            },
            grouper: {
                groupFn: function(record) {
                    return record.get('season_name');
                },
                sortProperty: 'season'
            },
            groupDir: 'DESC',
            sorters: [{
                sorterFn: function(record1, record2) {
                    var season1  = record1.get('season'),
                        season2  = record2.get('season'),
                        episode1 = record1.get('episode'),
                        episode2 = record2.get('episode');
                    
                    return (season1 <= season2 && episode1 > episode2 ) ? 1 : -1;
                },
                direction: "DESC"
            }]
        },
        listeners: {
            initialize: function(list) {
                var store = list.getStore(),
                    proxy = store.getProxy();

                proxy.setUrl(list.getUrl());
                store.load();
            },
            itemtap: function(list, index, item, record, e) {
                /*
                var el = item.down('.description'),
                    show = this.up('showdetail').getRecord();
                
                if (e.target.classList.contains('x-button') || e.target.classList.contains('x-button-icon')) {
                    // Handle episode download
                    Ext.Msg.confirm("Search for Episode", "Would you like to search for episode:<br />"+
                        record.get('season')+'x'+record.get('episode_human')+' - '+record.get('name'), function(answer) {
                             if ( answer == 'yes') {
                                 Ext.Viewport.setMasked({
                                     xtype: 'loadmask',
                                     message: 'Searching...'
                                 });
                                 
                                 url = SBM.app.getUrl('episode.search', {
                                      tvdbid:   show.get('tvdbid'),
                                      season:   record.get('season'),
                                      episode:  record.get('episode')
                                  });
                                 
                                 Ext.data.JsonP.request({
                                     url: url,
                                     callback: function(success, response) {
                                         Ext.Viewport.setMasked(false);
                                         Ext.Msg.alert("Result", response.message);
                                     }
                                 })
                             }
                        });
                } else {                    
                    // Show/hide the episode details
                    if (el.hasCls('selected')) {
                        el.removeCls('selected');
                    } else {
                        el.addCls('selected');
                    }
                }
                */
            }
        }
    }
});