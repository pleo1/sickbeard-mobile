Ext.define('SB.model.Show', {
    extend: 'Ext.data.Model',
    config: {
        idProperty: 'tvdbid',
        fields: [
            'name',
            'language',
            'network',
            'next_ep_airdate',
            'paused',
            'quality',
            'status',
            'tvdbid',
            'tvrage_id',
            'tvrage_name',
            'air_by_date',
            'airs',
            {
                name: 'first_aired',
                format: 'date',
                dateFormat: 'Y-m-d'

            },{
                name: 'poster',
                convert: function(value, record) {
                    var url = SB.app.buildUrl({
                        'cmd': 'show.getposter',
                        'tvdbid': record.get('tvdbid')
                    });
                    return url;
                }
            },{
                name: 'banner',
                convert: function(value, record) {
                    var url = SB.app.buildUrl({
                        'cmd': 'show.getbanner',
                        'tvdbid': record.get('tvdbid')
                    });
                    return url;
                }
            }
        ]
    }
});