Ext.define('SB.view.ShowSearchNavigation', {
    extend: 'Ext.navigation.View',

    requires: [
        'Ext.ActionSheet',
        'Ext.field.Search'
    ],
    
    config: {
        navigationBar: {
            ui: 'black'
        },
        items: [{
            xtype: 'list',
            title: 'Search',
            cls: [
                //'shows',
                'dark'
            ],
            itemTpl: '<div class="show_name">{name} ({first_aired:date("Y")})</div>',
            items: [{
                xtype: 'toolbar',
                docked: 'top',
                ui: 'grey',
                items: [{
                    xtype: 'searchfield',
                    name: 'show',
                    placeHolder: 'Search...',
                    width: '96%',
                    centered: true,
                    listeners: {
                        action: function(field) {
                            var list  = field.up('list'),
                                store = list.getStore();

                            if (store) {
                                store.clearData();

                                proxy = store.getProxy();
                                if (proxy) {
                                    proxy.setUrl('?cmd=sb.searchtvdb&name='+field.getValue());
                                }

                                store.load();
                            }
                        },
                        clearicontap: function(field) {
                            var list  = field.up('list'),
                                store = list.getStore();

                            store.clearData();
                        }
                    }
                }]
            }],
            store: {
                model: 'SB.model.Show',
                proxy: {
                    type: 'sbproxy',
                    reader: {
                        type: 'json',
                        rootProperty: 'data.results'
                    }
                }
            },
            listeners: {
                select: function(list, record) {
                    if (!list._actionSheet) {
                        list._actionSheet = Ext.create('Ext.ActionSheet',{
                            items: [{
                                text: 'Add new',
                                handler: function() {
                                    var url = SB.app.buildUrl({
                                        cmd:    'show.addnew',
                                        tvdbid: record.get('tvdbid')
                                    });

                                    list._actionSheet.hide();

                                    Ext.Viewport.setMasked({
                                        xtype: 'loadmask',
                                        message: 'Adding show...'
                                    });

                                    Ext.data.JsonP.request({
                                        url: url,
                                        callback: function(success, response) {
                                            Ext.Viewport.setMasked(false);
                                            
                                            if (success) {
                                                message = response.message;
                                            } else {
                                                message = "Error communicating with server";
                                            }

                                            Ext.Msg.alert('Adding Show', message);
                                        }
                                    })
                                }
                            },{
                                text: 'Add existing',
                                handler: function() {
                                    list._actionSheet.hide();

                                    Ext.Msg.alert('Not Implemented', 'This function is not yet implmented');
                                }
                            },{
                                text: 'Cancel',
                                ui: 'decline',
                                handler: function(button) {
                                    button.up('actionsheet').hide();
                                    list.deselectAll();
                                }
                            }]
                        });
                        Ext.Viewport.add(list._actionSheet);
                    }
                    list._actionSheet.show();
                }
            }
        }]
    }
})