Ext.define('Todo.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype : 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.Video',
        'Todo.view.Tasks',
        'Todo.view.Login'
    ],
    config: {
        tabBarPosition: 'bottom',
        tabBar : {
            hidden : true
        },

        items: [{
            xtype : 'login'
        },{
            xtype : 'tasks'
        }]
    }
});
