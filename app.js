//<debug>
Ext.Loader.setPath({
    'Ext':      'touch/src',
    'SB':       'app',
    'Ext.ux':   'lib/ux'
});
//</debug>

Ext.application({
    name: 'SB',

    requires: [
        'Ext.MessageBox',

        'Ext.ux.InstallApp',
        'Ext.ux.slidenavigation.View',
        'Ext.ux.proxy.ProxyCache',

        'SB.proxy.SickBeardProxy',
        'SB.reader.FutureEpisodeReader',
        'SB.reader.ShowsListReader',
        'SB.reader.ShowReader',
        'SB.plugin.PullRefreshCache'
    ],

    views: [
        'Main',
        'Settings',
        
        'FutureEpisodesList',
        'HistoryList',

        'ShowSearchNavigation',
        'ShowNavigation',
        'ShowEpisodesList',
        'ShowDetails',
        'EpisodeActionSheet'
    ],

    models: [
        'Episode',
        'Show'
    ],

    stores: [
        'FutureEpisodes'
    ],

    controllers: [
        'Episodes',
        'Shows'
    ],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
        var me = this;

        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: 'Loading...'
        });

        try {
            Ext.data.JsonP.request({
                url: me.buildUrl({cmd: 'sb.ping'}),
                callback: function(success, response) {
                    Ext.Viewport.setMasked(false);

                    if (!success || response.result == "denied") {
                        message = response ? "Incorrect API Key" : "Incorrect Host";
                        Ext.Msg.alert("Error", message);
                        me.showSettingsView();
                    } else {
                        me.doLaunch();
                    }
                }
            });
        } catch(err) {
            Ext.Viewport.setMasked(false);

            me.showSettingsView();
        }
    },

    doLaunch: function() {
        // Initialize the main view
        Ext.Viewport.add({
            fullscreen: true,
            xclass: 'SB.view.Main'
        });

        Ext.ux.InstallApp.init();
    },

    showSettingsView: function() {
        Ext.Viewport.add({
            fullscreen: true,
            layout: 'vbox',
            items: [{
                xtype: 'toolbar',
                docked: 'top',
                ui: 'black',
                title: 'SickBead Settings'
            },{
                xclass: 'SB.view.Settings',
                scrollable: false,
                padding: 10
            }]
        });
    },

    buildUrl: function(params) {
        var host    = localStorage.getItem('host'),
            apikey  = localStorage.getItem('apikey'),
            qs      = Ext.Object.toQueryString(params),
            url     = "";

        if (host.indexOf('http') < 0) {
            url += "http://";
        }
        
        url += host;

        if (url[url.length-1] != '/') {
            url += '/';
        }

        url += 'api/' + apikey + '/?' + qs;
        return url;
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
