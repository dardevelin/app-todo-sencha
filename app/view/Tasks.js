/**
 * @class Todo.view.Tasks
 * @extends Ext.Container
 * @author Crysfel Villa <crysfel@moduscreate.com>
 *
 * This view manages the tasks
 */
Ext.define('Todo.view.Tasks', {
    extend: 'Ext.Container',
    xtype : 'tasks',
    requires: [
        'Todo.model.Task'
    ],

    config : {
        layout : {
            type : 'vbox'
        },
        title: 'Tasks',
        iconCls: 'bookmarks',

        items: [{
            docked: 'top',
            xtype: 'titlebar',
            title: 'My Todo List'
        },{
            xtype : 'container',
            flex  : 1
        },{
            xtype   : 'container',
            layout  : 'hbox',
            cls     : 'x-tabbar-dark',
            items : [{
                xtype : 'textfield',
                flex  : 1,
                margin: '10 5'
            },{
                xtype : 'button',
                text  : 'Add item',
                width : 100,
                margin: '10 5'
            }]
        }]
    }
});