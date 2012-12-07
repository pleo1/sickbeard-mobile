/**
 *  @class SB.plugin.PullRefreshCache
 *
 *  Subclass of {@link Ext.plugin.PullRefresh} that is designed to work with a
 *  {@link Ext.ux.proxy.ProxyCache}.  When the user forces a refresh, this
 *  class makes sure that the local cache is removed and a new one is fetched
 *  from the server.
 */
Ext.define('SB.plugin.PullRefreshCache', {
    extend: 'Ext.plugin.PullRefresh',
    alias: 'plugin.pullrefreshcache',
    
    /**
     *  Override the default behaviour so that we can bust the
     *  cache and force a reload from the server.
     */
    fetchLatest: function() {
        var store = this.getList().getStore(),
            proxy = store.getProxy();

        proxy.clearCache();

        this.callParent();
    }
});