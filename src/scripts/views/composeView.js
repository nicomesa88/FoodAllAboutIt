import React from 'react'
import Header from './header'
import ACTIONS from '../actions'
import {User} from "../models/models"
import ReactFilepicker from 'react-filepicker'

const ComposeView = React.createClass({
	 render: function() {
		return (
			<div className="composeView" >
				<Header />
				<h3>post a dish!</h3>
				<DishPostingForm />
			</div>
		)
	}
})

const DishPostingForm = React.createClass({
	_handleCompose: function(e){
		e.preventDefault()
		ACTIONS.saveDish({
			title: e.currentTarget.title.value,
			description: e.currentTarget.description.value,
			location: e.currentTarget.location.value,
			rating: e.currentTarget.rating.value,
			authorId: User.getCurrentUser()._id,
			authorEmail: User.getCurrentUser().email,
			imageUrl: this.url ? this.url: '/images/empty-plate.jpg',
			tags: e.currentTarget.tags.value.split(', ')
		})
	},


	_handleImage: function(result){
		console.log(result)
		this.url = result.url
	},


	render: function() {
		return (
			<div className="dishPostingForm">
				<form onSubmit={this._handleCompose}>
					<input type="text" name="title" placeholder="Enter Title"/>
					<textarea type="text" name="description" placeholder="Enter the description"></textarea>
					<input type="text" name="location" placeholder="Where is this place located"/>
					<input type="text" name="rating" placeholder="Rating"/>
					<input type="text" name="tags" placeholder="Input Tags, seperate tags with a comma" />
					<ReactFilepicker apikey='A0hkVciLxQAuC7SR2RhKDz' onSuccess={this._handleImage}/>
					<button type="submit">SUBMIT</button>
				</form>
			</div>
		)
	}
})

export default ComposeView
