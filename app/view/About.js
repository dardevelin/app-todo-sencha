/**
 * @class Todo.view.About
 * @extends Ext.Container
 * @author Crysfel Villa <crysfel@moduscreate.com>
 *
 * The about page to describe credits and stuff
 */
Ext.define('Todo.view.About', {
    extend: 'Ext.Container',
    alias : 'widget.about',

    config: {
        html : '<h1>About</h1><p>This application has been develop by an awesome ModusCreate.</p>'
    }
});