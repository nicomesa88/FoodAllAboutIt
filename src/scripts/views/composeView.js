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

	getInitialState: function(){
		return {
			currentDishRating: 0,
		}
	},

	_handleCompose: function(e){
		e.preventDefault()
		ACTIONS.saveDish({
			title: e.currentTarget.title.value,
			description: e.currentTarget.description.value,
			location: e.currentTarget.location.value,
			rating: this8.state.currentDishRating,
			authorId: User.getCurrentUser()._id,
			authorEmail: User.getCurrentUser().email,
			imageUrl: this.url ? this.url: '/images/empty-plate.jpg',
			tags: e.currentTarget.tags.value.split(', ')
		})
	},

	_handleStar: function(evt){
		this.setState({
			currentDishRating: parseInt(evt.target.dataset.rating)
		})
	},


	_handleImage: function(result){
		console.log(result)
		this.url = result.url
	},

	_generateStarsJsx: function(ratingValue){
		var JsxStars = []
		for (var i = 1; i <= 5; i++){
			let starStyle = {fontSize: 30}
			if(i <= ratingValue){
				// let JsxStar = <span style={{fontSize: 30}}>&#9734;</span>
				starStyle.color = 'yellow'
			}
			let JsxStar = <span style = {starStyle} data-rating={i} onClick={this._handleStar}>&#9734;</span>
			JsxStars.push(JsxStar)
		}
		return JsxStars
	},


	render: function() {
		return (
			<div className="dishPostingForm">
				<form onSubmit={this._handleCompose}>
					<input type="text" name="title" placeholder="Enter Title"/>
					<textarea type="text" name="description" placeholder="Enter the description"></textarea>
					<input type="text" name="location" placeholder="Where is this place located"/>
					{this._generateStarsJsx(this.state.currentDishRating)}
					<input type="text" name="tags" placeholder="Input Tags, seperate tags with a comma" />
					<ReactFilepicker apikey='A0hkVciLxQAuC7SR2RhKDz' onSuccess={this._handleImage}/>
					<button type="submit">SUBMIT</button>
				</form>
			</div>
		)
	}
})

export default ComposeView
