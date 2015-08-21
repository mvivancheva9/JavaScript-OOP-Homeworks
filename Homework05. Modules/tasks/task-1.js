/* Task Description */
/* 
* Create a module for a Telerik Academy course
  * The course has a title and presentations
    * Each presentation also has a title
    * There is a homework for each presentation
  * There is a set of students listed for the course
    * Each student has firstname, lastname and an ID
      * IDs must be unique integer numbers which are at least 1
  * Each student can submit a homework for each presentation in the course
  * Create method init
    * Accepts a string - course title
    * Accepts an array of strings - presentation titles
    * Throws if there is an invalid title
      * Titles do not start or end with spaces
      * Titles do not have consecutive spaces
      * Titles have at least one character
    * Throws if there are no presentations
  * Create method addStudent which lists a student for the course
    * Accepts a string in the format 'Firstname Lastname'
    * Throws if any of the names are not valid
      * Names start with an upper case letter
      * All other symbols in the name (if any) are lowercase letters
    * Generates a unique student ID and returns it
  * Create method getAllStudents that returns an array of students in the format:
    * {firstname: 'string', lastname: 'string', id: StudentID}
  * Create method submitHomework
    * Accepts studentID and homeworkID
      * homeworkID 1 is for the first presentation
      * homeworkID 2 is for the second one
      * ...
    * Throws if any of the IDs are invalid
  * Create method pushExamResults
    * Accepts an array of items in the format {StudentID: ..., Score: ...}
      * StudentIDs which are not listed get 0 points
    * Throw if there is an invalid StudentID
    * Throw if same StudentID is given more than once ( he tried to cheat (: )
    * Throw if Score is not a number
  * Create method getTopStudents which returns an array of the top 10 performing students
    * Array must be sorted from best to worst
    * If there are less than 10, return them all
    * The final score that is used to calculate the top performing students is done as follows:
      * 75% of the exam result
      * 25% the submitted homework (count of submitted homeworks / count of all homeworks) for the course
*/

function solve() {
	var Course = {
		init: function(title, presentations) {

			this.title = title;
			this.presentations = presentations;
			this.students = [];
			this.studentId = 0;

			return this;
		},

		addStudent: function(name) {
			if(!studentNameValidator(name)){
				throw new Error('The student name is not valid');
			}
			var fullname = name. split(' ');
			var firstname = fullname[0];
			var lastname = fullname[1];
			this.studentId ++;

			this.students.push({firstname: firstname,
				lastname: lastname,
				id: this.studentId});

			return this.studentId;
		},
		getAllStudents: function() {
			return this.students.slice();
		},
		submitHomework: function(studentID, homeworkID) {
			if(!idValidator(studentID, this.students.length)){
				throw new Error('The student ID is not valid');
			}
			if(!idValidator(homeworkID, this.presentations.length)){
				throw  new Error('The homework ID is not valid');
			}
		},
		pushExamResults: function(results) {
			if(!resultsValidator(results)){
				throw new Error('Not valid results');
			}
		},
		getTopStudents: function() {
			var topStudents = this.students.slice();
		}
	};

	Object.defineProperty(Course, 'title',{
		get: function(){
			return Course._title;
		},
		set: function(value){
			if(!titleValidation(value)){
				throw new Error('The title is wrong');
			}
			Course._title = value;
		}
	});

	Object.defineProperty(Course, 'presentations', {
		get: function () {
			return Course._presentations;
		},
		set: function (value) {

			if (!presentationValidator(value)) {
				throw new Error('Invalid presentations');
			}

			Course._presentations = value;
		}
	});
	return Course;

	function titleValidation(title) {
		if (title.length === 0) {
			return false;
		}

		if(title[0] === ' ' || title[title.length - 1] === ' '){
			return false;
		}

		var i,
			len = title.length;
		for(i = 0; i < len - 1; i += 1){
			if(title[i] === ' '){
				if(title[i] === title[i + 1]){
					return false;
				}
			}
		}

		return true;
	}

	function presentationValidator(presentation){
		if (presentation.length == 0) {

			return false;
		}

		for (var i = 0; i < presentation.length; i++) {
			if (!titleValidation(presentation[i])) {
				return false;
			}
		}
		return true;
	}

	function studentNameValidator(name){
		var fullName = name.split(' ');
		var firstName = fullName[0];
		var lastName = fullName[1];

		if(firstName[0] != firstName[0].toUpperCase() || lastName[0] != lastName[0].toUpperCase()){
			return false;
		}
		if(fullName.length > 2){
			return false;
		}
		return true;
	}

	function idValidator(id, checkArray){
		if(id < 1 || id > checkArray) {
			return false;
		}
		if (id === NaN) {
			return false;
		}
		return true;
	}

	function resultsValidator(results){
		if(results[0] < 0 || results[0] > this.students.length){
			return false;
		}
		if(results[1] === NaN){
			return false;
		}
		var i,
			j,
			len = results.length;

		for(i = 0; i < len - 1; i += 1){
			var currentId = results[0][i];
			for(j = i + 1; j < len; j += 1){
				if(currentId === results[j]){
					return false;
				}
			}
		}
		return true;
	}
}


module.exports = solve;
