/* Task Description */
/* 
	Create a function constructor for Person. Each Person must have:
	*	properties `firstname`, `lastname` and `age`
		*	firstname and lastname must always be strings between 3 and 20 characters, containing only Latin letters
		*	age must always be a number in the range 0 150
			*	the setter of age can receive a convertible-to-number value
		*	if any of the above is not met, throw Error 		
	*	property `fullname`
		*	the getter returns a string in the format 'FIRST_NAME LAST_NAME'
		*	the setter receives a string is the format 'FIRST_NAME LAST_NAME'
			*	it must parse it and set `firstname` and `lastname`
	*	method `introduce()` that returns a string in the format 'Hello! My name is FULL_NAME and I am AGE-years-old'
	*	all methods and properties must be attached to the prototype of the Person
	*	all methods and property setters must return this, if they are not supposed to return other value
		*	enables method-chaining
*/
function solve() {
	var Person = (function () {
		function Person(firstname, lastname, age) {
			this.firstname = firstname;
			this.lastname = lastname;
			this.age = age;
		}

		function checkName(input){
			if((input.length < 3 || input.length > 20) ||
				(typeof(input) !== "string") ||
				(/^[a-zA-Z]*$/.test(input)=== false)) {
				return false;
			} else {
				return true;
			}
		}
		Object.defineProperty(Person.prototype, 'firstname', {
			get: function (){
				return this._firstname;
			},
			set: function(value){
				if(checkName(value) === false){
					throw new Error('The first name should be between 3 and 20 symbols');
				} else {
					this._firstname = value;
					return this;
				}
			}
		});

		Object.defineProperty(Person.prototype, 'lastname', {
			get: function (){
				return this._lastname;
			},
			set: function(value){
				if(checkName(value) === false){
					throw new Error('The last name should be between 3 and 20 symbols');
				} else {
					this._lastname = value;
					return this;
				}
			}
		});

		Object.defineProperty(Person.prototype, 'age', {
			get: function (){
				return this._age;
			},
			set: function(value){
				value = parseInt(value);
				if(value < 0 || value > 150){
					throw new Error('The age should be between 1 and 150 years');
				} else {
					this._age = value;
					return this;
				}
			}
		});

		Object.defineProperty(Person.prototype, 'fullname', {
			get: function (){
				return this._firstname + ' ' + this._lastname;
			},
			set: function(value){
				var fullname = value.split(' ');
				this.firstname = fullname[0];
				this.lastname = fullname[1];
			}
		});

		Person.prototype.introduce = function(){
			return 'Hello! My name is ' + this.fullname + ' and I am ' + this.age + '-years-old';
		}
		return Person;
	} ());
	return Person;
}
module.exports = solve;