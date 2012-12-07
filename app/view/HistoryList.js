Ext.define('SB.view.HistoryList', {
    extend: 'Ext.dataview.List',
    
    requires: [
        'Ext.SegmentedButton'
    ],
    
    config: {
        itemTpl: '<div class="name">{show_name}</div>'+
                 '<div class="subline">Episode: {number}</div>'+
                 '<div class="subline status">Status: {status}, {date:date("D M jS g:i a")}</div>',
        cls: [
            'episodes',
            'view_all',
            'dark'
        ],
        disableSelection: true,
        store: {
            model: 'SB.model.Episode',
            proxy: {
                type: 'sbproxy',
                url: '?cmd=history',
                cacheKey: 'historyList',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },
        plugins: [{
            xclass: 'SB.plugin.PullRefreshCache'
        }],
        items: [{
            xtype: 'toolbar',
            docked: 'top',
            ui: 'black',
            items: [{
                xtype: 'segmentedbutton',
                centered: true,
                items: [{
                    text: 'all',
                    pressed: true,
                    handler: function(button) {
                        var list = button.up('list'),
                            store = list.getStore();
                        list.addCls('view_all');
                        store.clearFilter();
                    }
                },{
                    text: 'downloaded',
                    handler: function(button) {
                        var list = button.up('list'),
                            store = list.getStore();
                        
                        list.removeCls('view_all');
                        store.filter('status', 'downloaded');
                    }
                },{
                    text: 'snatched',
                    handler: function(button) {
                        var list = button.up('list'),
                            store = list.getStore();
                        
                        list.removeCls('view_all');
                        store.filter('status', 'snatched');
                    }
                }]
            }]
        }]
    }
});