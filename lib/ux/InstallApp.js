/**
 * @author Bruno Tavares
 * @class Ext.ux.InstallApp
 * iOS allows users to add webapps to their home screen, making the whole native experience that Touch provides even better.
 * This extension places a very discreet floating baloon that slides in and out, giving the user instructions on how to add
 * your app as a standalone version. If the user taps the message, a flag will be stored in localstorage and the floating
 * baloon will never bug them anymore.
 * 
 *      @example
 *      Ext.Loader.setConfig({
 *          enabled: true,
 *          paths: {
 *              'Ext.ux.InstallApp': 'lib/Ext.ux.InstallApp.js'
 *          }
 *      });
 * 
 * 
 *      Ext.application({
 *          requires: ['Ext.ux.InstallApp']
 *          //...
 *          launch: function() {
 *              Ext.ux.InstallApp.init();
 *          }
 *      });
 */
Ext.define('Ext.ux.InstallApp',{
    extend: 'Ext.Component',
    xtype: 'installapp',
    
    config: {
        cls: Ext.baseCSSPrefix + 'installapp'
    },
    
    statics: {
        init: function() {
            
            var dismissed = localStorage.getItem('installapp') === '1';
            
            if (Ext.browser.is.Standalone || !Ext.os.is('iOS') || dismissed) {
                return;
            }
            
            Ext.Viewport.add({
                xtype: 'installapp',
                hidden: true
            }).show();
        }
    },
    
    initialize: function() {
        var me = this,
            version = Ext.os.version,
            animDir = 'up',
            oldVersion = version.major < 4 || (version.major == 4 && version.minor <= 2);
        
        if (Ext.os.is('Phone')) {
            me.setBottom(11);
        }
        else {
            me.setTop(11);
            animDir = 'down';
        }
        
        me.setShowAnimation({
            type: 'slide',
            direction: animDir,
            duration: 750
        });
        
        me.setHideAnimation({
            type: 'slideOut',
            direction: animDir === 'up' ? 'down' : 'up',
            duration: 750
        });
        
        me.setHtml(Ext.String.format(
            'Install this web app: tap {0} and then <strong>Add to Home Screen</strong>' + 
            '<div class="arrow"></div>',
            oldVersion ? '<span class="icon-plus">+</span>' : '<span class="icon-share"></span>'
        ));
        
        me.callParent(arguments);
        
        me.element.on('tap', me.onTap, me, {single: true});
        me.onAfter('hide', me.destroy, me, {single: true});
        
        Ext.defer(me.autoHide, 10000, me);
    },
    
    onTap: function() {
        localStorage.setItem('installapp', '1');
        this.hide();
    },
    
    autoHide: function() {
        if (!this.isDestroyed) {
            this.hide();
        }
    }
});