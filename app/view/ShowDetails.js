Ext.define('SB.view.ShowDetails', {
    extend: 'Ext.Container',
    config: {
        cls:    'show_detail',
        tpl:    '<div class="wrapper" style="background-image: url(http://src.sencha.io/jpg90/700/{banner})">'+
                    '<div class="inner_wrapper">'+
                        '<img class="poster" src="http://src.sencha.io/jpg90/120/{poster}" />'+
                        '<div class="details">'+
                            '<h2>{name}</h2>'+
                            '<tpl if="network"><div class="subline">{network}</div></tpl>'+
                            '<div class="subline">{status}<tpl if="next_ep_airdate">, {next_ep_airdate:date("M jS, Y")}</tpl></div>'+
                        '</div>'+
                    '</div>'+
                '</div>',
        height: 124
    }
});