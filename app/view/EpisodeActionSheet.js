Ext.define('SB.view.EpisodeActionSheet', {
    extend: 'Ext.ActionSheet',
    xtype: 'episodeactionsheet',
    config: {
        record: {},
        list:   {},
        items: [{
            text: 'Search',
            handler: function(button) {
                var sheet = button.up('actionsheet');
                sheet.fireEvent('search', sheet, sheet.record);
            }
        },{
            text: 'Set Status'
        },{
            text: 'Cancel',
            ui: 'decline',
            handler: function(button) {
                button.up('actionsheet').hide();
            }
        }]
    }
})