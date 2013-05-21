Ext.define('Todo.model.Task', {
    extend: 'Ext.data.Model',
    
    config: {
        fields: [
            { name: 'id', type: 'int' },
            { name: 'name', type: 'auto' },
            { name: 'complete', type: 'boolean' }
        ]
    }
});