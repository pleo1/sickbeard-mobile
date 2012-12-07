/**
 *  @class SB.proxy.SickBeardProxy
 *
 *  Custom proxy for connecting to SickBeard.  This does two main things:
 *
 *      1)  Allows the 'url' of a proxy to simply define just the
 *          querystring and this class will prepend the proper host and
 *          api key.
 *      2)  Provides default local caching functionality.
 *
 */
Ext.define('SB.proxy.SickBeardProxy', {
    extend: 'Ext.data.proxy.JsonP',
    xtype: 'sbproxy',
    alias: ['proxy.sbproxy'],

    mixins: {
        proxyCache: 'Ext.ux.proxy.ProxyCache'
    },

    config: {
        /**
         *  Stop Sencha from adding a 'dc' querystring param designed
         *  to stop caching.  Since we are doing the cachine locally we
         *  don't need this.
         */
        noCache: false
    },

    /**
     *  Constructs a SickBeard API URL.  This basically just prepends
     *  the host and api key bits to the requested resource.
     */
    buildUrl: function(request) {
        var url     = this.callParent([request]),
            host    = localStorage.getItem('host'),
            apikey  = localStorage.getItem('apikey');

        url = 'http://' + host + '/api/' + apikey + '/' + url;
        return url;
    },

    /**
     *  Removes the data from the cache.
     */
    clearCache: function() {
        window.localStorage.removeItem(this.getCacheKey());
    }
});