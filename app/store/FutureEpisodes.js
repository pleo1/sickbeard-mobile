Ext.define('SB.store.FutureEpisodes', {
    extend: 'Ext.data.Store',
    config: {
        model: 'SB.model.Episode',
        sorters: [{
            property: 'airtime'
        },{
            property: 'show_name'
        }],
        grouper: {
            groupFn: function(record) {
                var today   = Ext.Date.format(new Date(), "Y-m-d"),
                    now     = Ext.Date.parse(today, "Y-m-d"),
                    date    = record.get('airdate'),
                    datestr = Ext.Date.format(date, 'Y-m-d');
            
                if (today == datestr) {
                    return "Today";
                }
                
                if (Ext.Date.between(date, now, Ext.Date.add(now, Ext.Date.DAY, 1))) {
                    return "Tomorrow";
                }

                if (Ext.Date.between(date, Ext.Date.add(now, Ext.Date.DAY, -1), now)) {
                    return "Yesterday";
                }
               
                if (Ext.Date.between(date, now, Ext.Date.add(now, Ext.Date.DAY, 5))) {
                    return Ext.Date.format(date, 'l');
                }
                   
                return datestr;
            },
            sortProperty: 'airtime'
        },
        proxy: {
            type: 'sbproxy',
            cacheKey: 'futureList',
            url: '?cmd=future&sort=date&type=today|missed|soon|later&paused=0',
            reader: 'futureepisodes'
        }
    }
});