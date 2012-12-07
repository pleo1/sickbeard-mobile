Ext.define('SB.view.ShowNavigation', {
    extend: 'Ext.navigation.View',
    config: {
        navigationBar: {
            ui: 'black'
        },
        items: [{
            title: 'Favorites',
            xtype: 'list',
            cls: [
                'shows',
                'dark'
            ],
            grouped: true,
            indexBar: true,
            itemTpl: '<img class="poster" src="http://src.sencha.io/jpg90/120/{poster}" />'+
                     '<div class="details">'+
                         '<div class="name">{name}</div>'+
                         '<tpl if="network"><div class="subline">{network}</div></tpl>'+
                         '<div class="subline">{status}<tpl if="next_ep_airdate">, {next_ep_airdate:date("M jS, Y")}</tpl></div>'+
                     '</div>',
            plugins: [{
                xclass: 'SB.plugin.PullRefreshCache'
            }],
            store: {
                model: 'SB.model.Show',
                proxy: {
                    type: 'sbproxy',
                    cacheKey: 'showList',
                    url: '?cmd=shows&sort=name',
                    reader: 'showslist'
                },
                grouper: {
                    groupFn: function(record) {
                        var name = record.get('name').replace(/^the /i,'');
                        return name[0].toUpperCase();
                    }
                },
                sorters: [{
                    sorterFn: function(record1, record2) {
                        var name1 = record1.get('name').replace(/^the /i,''),
                            name2 = record2.get('name').replace(/^the /i,'');
                        return name1 > name2 ? 1 : (name1 == name2 ? 0 : -1);
                    }
                }]
            }
            /*
            ,
            items: {
                docked: 'top',
                xtype: 'toolbar',
                ui: 'black',
                items: {
                    xtype: 'searchfield',
                    placeHolder: 'Filter...',
                    width: '96%',
                    centered: true
                }
            }
            */
        }]
    }
});