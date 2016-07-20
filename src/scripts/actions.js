import {User} from './models/models'

const ACTIONS = {
	registerUser: function(userObj){
		User.register(userObj)
	}
}

export default ACTIONS