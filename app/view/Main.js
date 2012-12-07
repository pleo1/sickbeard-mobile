Ext.define('SB.view.Main', {
    extend: 'Ext.ux.slidenavigation.View',
    xtype: 'main',
    requires: [
        'Ext.TitleBar'
    ],
    config: {
        fullscreen: true,
        slideSelector: 'x-toolbar',
        shadowStyle: '0 0 12px 2px #111',
        list: {
            maxDrag: 400,
            width: 200,
            cls: 'dark',
            items: [{
                xtype: 'toolbar',
                docked: 'top',
                ui: 'grey',
                title: {
                    title: 'SickBeard',
                    centered: false,
                    width: 200,
                    left: 0
                }
            }]
        },
        groups: {
            'Episodes':      1,
            'Shows':         2,
            'Configuration': 3
        },
        items: [{
            title: 'Upcoming',
            group: 'Episodes',
            slideButton: {
                selector: 'toolbar'
            },
            items: [{
                xtype: 'toolbar',
                docked: 'top',
                title: 'Upcoming',
                ui: 'black'
            },{
                title: 'Episodes',
                xclass: 'SB.view.FutureEpisodesList',
                layout: 'fit',
                iconCls: 'tv'
            }]
        },{
            title: 'History',
            group: 'Episodes',
            slideButton: {
                selector: 'toolbar'
            },
            items: [{
                xtype: 'toolbar',
                title: 'History',
                docked: 'top',
                ui: 'black'
            },{
                xclass: 'SB.view.HistoryList'
            }]
        },{
            title: 'Favorites',
            group: 'Shows',
            slideButton: {
                selector: 'titlebar'
            },
            items: [{
                xclass: 'SB.view.ShowNavigation'
            }]
        },{
            xclass: 'SB.view.ShowSearchNavigation',
            title: 'Search',
            group: 'Shows',
            slideButton: {
                selector: 'titlebar'
            }
        },{
            title: 'Settings',
            group: 'Configuration',
            slideButton: {
                selector: 'toolbar'
            },
            items: [{
                xtype: 'toolbar',
                docked: 'top',
                title: 'Settings',
                ui: 'black'
            },{
                xclass: 'SB.view.Settings'
            }]
        }]
    }
});
