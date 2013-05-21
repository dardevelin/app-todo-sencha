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
        control: {
            'login' : {
                submit : 'login'
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

    login     : function(values){
        Todo.Ajax.request({
            url     : 'user/session',
            method  : 'POST',
            params  : values,
            scope   : this,
            success : this.loadTasks,
            failure : this.showErrorMessage
        });
    },

    skipLogin : function(user){
        console.log(user);
    },

    showLogin : function(){
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        // Initialize the main view
        Ext.Viewport.add(Ext.create('Todo.view.Main'));
    }
});