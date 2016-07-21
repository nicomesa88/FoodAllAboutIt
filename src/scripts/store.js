import Backbone from 'backbone'
import _ from 'underscore'
import DishCollection from './models/models'

const DISH_STORE = _.extend(Backbone.Events,{

	data: {
		collection: new DishCollection()
	},

	_emitChange: function(){
		this.trigger('updateContent')
	},

	_initialize: function(){
		this.data.collection.on('synch update', this._emitChange.bind(this))
	}
})

DISH_STORE._initialize()

export default DISH_STORE