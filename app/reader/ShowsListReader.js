Ext.define('SB.reader.ShowsListReader', {
    extend: 'Ext.data.reader.Json',
    alias: 'reader.showslist',

    extractData: function (root) {
        var items = [];
        Ext.Object.each(root.data, function(name, item) {
            item['name'] = name;
            items.push(item);
        });
        return this.callParent([items]);
    }
});