/**
 * @class Todo.controller.Main
 * @extends Ext.app.Controller
 * @author Crysfel Villa <crysfel@moduscreate.com>
 *
 * The main controller
 */
Ext.define('Todo.controller.Main', {
    extend: 'Ext.app.Controller',

    config: {
        views : [
            'Login',
            'Main'
        ],
        refs   : {
            tabs    : 'main',
            dataview: 'dataview'
        },
        control: {
            'login' : {
                submit : 'doLogin'
            },
            'tasks' : {
                addtask : 'addTask'
            }
        }
    },

    init  : function(){
        Todo.Ajax.request({
            url : 'user/session',
            scope   : this,
            success : this.skipLogin,
            failure : this.showLogin
        });
    },

    doLogin     : function(form,values){
        Todo.Ajax.request({
            url     : 'user/session',
            method  : 'POST',
            params  : values,
            scope   : this,
            success : this.loadTasks,
            failure : this.showErrorMessage,
            container : form
        });
    },

    loadTasks        : function(data){
        var tabs = this.getTabs(),
            login = tabs.down('login');

        tabs.remove(login,true);
        tabs.getTabBar().show();
        Todo.Ajax.request({
            url     : 'db/todo',
            scope   : this,
            success : this.showTasks
        });
    },

    addTask          : function(data){
        Todo.Ajax.request({
            url    : 'db/todo',
            method : 'POST',
            params : data,
            scope  : this,
            success: function(response){
                if(response.success){
                    data.id = response[0].id;
                    this.getDataview().getStore().add(data);
                }
            }
        });
    },

    showTasks        : function(data){
        this.getDataview().getStore().setData(data);
    },

    showErrorMessage : function(data){
        var msg = '';
        for(var i=0,len=data.error.length;i<len;i++){
            msg += '* '+data.error[i].message+'</br>';
        }
        Ext.Msg.alert('Error',msg);
    },

    skipLogin : function(user){
        this.showLogin();
        this.loadTasks(user);
    },

    showLogin : function(){
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        // Initialize the main view
        Ext.Viewport.add(Ext.create('Todo.view.Main'));
    }
});