import Backbone from 'backbone'
import _ from 'underscore'
import {DishCollection} from './models/models'

const DISH_STORE = _.extend(Backbone.Events,{

	data: {
		collection: new DishCollection()
	},

	_emitChange: function(){
		this.trigger('updateContent')
	},

	_getData: function(){
		return _.clone(this.data)
	},

	setStore: function(storeProp, payload){
		if(typeof this.data[storeProp] === 'undegined') {throw Error(`${storeProp} propert not on the store.data, make sure to declare`)}
		this.data[storeProp] = payload
		this._emitChange()
	},

	getDataFor: function(storeProp){
		return this.data[storeProp]
	},

	_initialize: function(){
		this.data.collection.on('synch update', this._emitChange.bind(this))
	}
})

DISH_STORE._initialize()

export default DISH_STORE