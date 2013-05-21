/**
 * @class Todo.abstract.data.Connection
 * @extends Ext.data.Connection
 * @author Crysfel Villa <crysfel@moduscreate.com>
 *
 * The abstract class that add support for the Dream Factory API
 */
Ext.define('Todo.abstract.data.Connection', {
    extend : 'Ext.data.Connection',


    request: function(config){
        this.serviceUrl = (window.location.host.indexOf('dreamfactory.com') !== -1 || window.location.host !== 'localhost') ? '/' : '/service/';

        config.url = this.serviceUrl + 'rest/' + config.url;
        config.original = {
            success : config.success,
            failure : config.failure,
            scope   : config.scope
        };

        config.jsonData = config.jsonData || config.params;
        config.params = null;
        config.scope = this;
        config.success = this.handleSuccess;
        config.failure = this.handleFailure;
        config.headers = {
            'X-Application-Name' : 'sencha-todo'
        };

        this.callParent([config]);
    },

    handleSuccess : function(response,config){
        var data;
        try{
            data = Ext.decode(response.responseText);
            data.success = true;
        }catch(e){
            this.handleFailure(response,config);
            return false;
        }

        if(config.original.success){
            config.original.success.call(config.original.scope || this,data);
        }
    },

    handleFailure : function(response,config){
        var data;
        try{
            data = Ext.decode(response.responseText);
            data.success = false;
            data.code = response.status;
        }catch(e){
            data = {success:false,code:response.status,error:[{message:'Something went wrong when connecting with the server.'}]};
        }

        if(config.original.failure){
            config.original.failure.call(config.original.scope || this,data);
        }
    }
},function(){
    Todo.Ajax = Ext.create('Todo.abstract.data.Connection');
});