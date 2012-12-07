Ext.define('SB.controller.Shows', {
    extend: 'Ext.app.Controller',

    config: {

        refs: {
            favoritesNavigation: 'navigationview[xclass="SB.view.ShowNavigation"]',
            favoritesList: 'navigationview[xclass="SB.view.ShowNavigation"] list',
            showEpisodesList: 'list[xclass="SB.view.ShowEpisodesList"]'
        },

        control: {
            favoritesList: {
                show: function(list) {
                    var store = list.getStore();
                    if (store.getCount() < 1) {
                        store.load();
                    }
                    Ext.defer(list.deselectAll, 600, list);
                },

                select: function(list, record) {
                    var nav = this.getFavoritesNavigation();
                        bar = nav.getNavigationBar();
                    
                    nav.push({
                        layout: 'vbox',
                        items: [{
                            xclass:     'SB.view.ShowDetails',
                            data:       record.getData()
                        },{
                            xclass:     'SB.view.ShowEpisodesList',
                            url:        '?cmd=show.seasons&tvdbid='+record.get('tvdbid'),
                            flex:       1,
                            showRecord: record
                        }]
                    });

                    bar.down('button[name="slidebutton"]').hide({
                        type: 'fade',
                        out: true
                    });
                }
            },

            favoritesNavigation: {
                back: function(nav) {
                    if (nav.getInnerItems().length == 2) {
                        bar = nav.getNavigationBar();
                        bar.down('button[name="slidebutton"]').show({
                            type: 'fade',
                            out: false
                        });
                    }
                }
            },

            showEpisodesList: {
                itemtap: function(list, index, target, record) {
                    if (!list._actionSheet) {
                        list._actionSheet = Ext.create('SB.view.EpisodeActionSheet', {
                            list:   list,
                            record: record
                        });
                        Ext.Viewport.add(list._actionSheet);
                    }
                    //list._actionSheet.record = record;
                    list._actionSheet.record = record;
                    list._actionSheet.show();
                }
            }
        }
    }
});