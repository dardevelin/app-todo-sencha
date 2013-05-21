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
                submit : 'doLogin'
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

    loadTasks        : function(){

    },

    showErrorMessage : function(data){
        var msg = '';
        for(var i=0,len=data.error.length;i<len;i++){
            msg += '* '+data.error[i].message+'</br>';
        }
        Ext.Msg.alert('Error',msg);
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