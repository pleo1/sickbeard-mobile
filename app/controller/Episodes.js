Ext.define('SB.controller.Episodes', {
    extend: 'Ext.app.Controller',

    config: {

        refs: {
            futureList: 'list[xclass="SB.view.FutureEpisodesList"]',
            historyList: 'list[xclass="SB.view.HistoryList"]',
            episodeActionSheet: 'episodeactionsheet'
        },

        control: {
            futureList: {
                show: function(list) {
                    var store = list.getStore();
                    if (store.getCount() < 1) {
                        store.load();
                    }
                }
            },

            historyList: {
                show: function(list) {
                    var store = list.getStore();
                    if (store.getCount() < 1) {
                        store.load();
                    }
                }
            },

            episodeActionSheet: {
                search: function(sheet, episode) {
                    var list = sheet.getList(),
                        show = list.getShowRecord(),
                        url  = SB.app.buildUrl({
                            cmd:     'episode.search',
                            tvdbid:  show.get('tvdbid'),
                            season:  episode.get('season'),
                            episode: episode.get('episode')
                        });

                    sheet.hide();

                    Ext.Viewport.setMasked({
                        xtype: 'loadmask',
                        message: 'Searching...'
                    });

                    Ext.data.JsonP.request({
                        url: url,
                        timeout: 60000, // one minute
                        callback: function(success, response) {
                            Ext.Viewport.setMasked(false);
                            
                            if (success) {
                                message = response.message;
                                if (response.result == "success") {

                                }
                            } else {
                                message = "Error communicating with server.";
                            }

                            Ext.Msg.alert('Search Results', message);
                        },
                        scope: this
                    })
                }
            }
        }
    }
});