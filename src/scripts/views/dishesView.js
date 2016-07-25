import React from 'react'
import Header from './header'
import DISH_STORE from '../store'
import ACTIONS from '../actions'
import {User} from '../models/models'


const DishesView = React.createClass({
	getInitialState: function() {
		return DISH_STORE._getData()
	},

	componentWillMount: function(){
		ACTIONS.fetchDishes()
		DISH_STORE.on('updateContent',() => {
			this.setState(DISH_STORE._getData())
		})
	},

	componentWillUnmount: function(){
		DISH_STORE.off('updateContent')
	},

	 render: function() {
	 	return (
	 		<div className="dishesView" >
	 			<Header />
	 			<h3>my dishes</h3>
	 			<DishContainer dishColl = {this.state.collection} />
	 		</div>
	 	)
 	}
})

const DishContainer = React.createClass({


	render: function() {
		return (
			<div className="dishContainer">
				{this.props.dishColl.map(
					(model) => <Dish dishModel = {model} key = {model.id} />)}
			</div>
			)
	}
})

const Dish = React.createClass({

	_handleDelete: function() {
		ACTIONS.deletePost(this.props.dishModel)
	},

	render: function() {
		return (
			<div className = "dish">
				<div className = "dishDeets">
					<p>{this.props. dishModel.get('title')}</p>
					<p>{this.props.dishModel.get('description')}</p>
				</div>
				<button onClick = {this._handleDelete}>X</button>
			</div>
			)
	}
})

export default DishesView
