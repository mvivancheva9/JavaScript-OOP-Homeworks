/* Task Description */
/* 
	*	Create a module for working with books
		*	The module must provide the following functionalities:
			*	Add a new book to category
				*	-Each book has unique title, author and ISBN
				*	-It must return the newly created book with assigned ID
				*	-If the category is missing, it must be automatically created
			*	List all books
				*	Books are sorted by ID
				*	This can be done by author, by category or all
			*	List all categories
				*	Categories are sorted by ID
		*	-Each book/catagory has a unique identifier (ID) that is a number greater than or equal to 1
			*	-When adding a book/category, the ID is generated automatically
		*	Add validation everywhere, where possible
			*	-Book title and category name must be between 2 and 100 characters, including letters, digits and special characters ('!', ',', '.', etc)
			*	-Author is any non-empty string
			*	-Unique params are Book title and Book ISBN
			*	-Book ISBN is an unique code that contains either 10 or 13 digits
			*	-If something is not valid - throw Error
*/
function solve() {
	var library = (function () {
		var books = [];
		var categories = [];

		function checkISBN(currentISBN){
			var i,
				len = books.length;
			if(!(currentISBN.length == 10 || currentISBN.length == 13)){
				return true;
			}
			for(i = 0; i < len; i += 1){
				if(currentISBN == books[i].isbn){
					return true;
				}
			}
			return false;
		}

		function checkTitle(currentTitle){
			var i,
				len = books.length;

			for(i = 0; i < len; i += 1){
				if(currentTitle == books[i].title){
					return true;
				}
			}
			if(!(currentTitle.length > 2 && currentTitle.length < 101)){
				return true;
			}
			return false;
		}

		function checkNameCategory(category){
			if(category.length < 2 || category.length > 100){
				return false;
			}
			return true;
		}

		function addCategory(category){
			var i,
				len = books.length,
				count = 0;
			for(i = 0; i < len; i += 1){
				if(category === categories[i]){
					count = 1;
				}
			}
			if(count == 0) {
				categories.push(category);
			}
		}

		function listBooks(params) {

			var i,
				len = books.length,
				listBooks = [];
			if(params == null){
				return books;
			}
			for(i = 0; i < len; i += 1){
				if(books[i].category == params.category){
					listBooks.push(books[i]);
				}
			}

			return listBooks;
		}

		function addBook(book) {
			book.ID = books.length + 1;

			if(book.author == ''){
				throw new Error('The author name should not be an empty string');
			}
			var tempISBN = book.isbn;
			if (checkISBN(tempISBN)) {
				throw new Error('The ISBN should be unique and with 10 or 13 symbols');
			}
			if(checkTitle(book.title) === true){
				throw new Error('The title should be unique and between 2 and 100 symbols');
			}

			if(checkNameCategory){
				addCategory(book.category);
			} else{
				throw new Error('The category name should be between 2 and 100 symbols');
			}

			books.push(book);

			return book;
		}

		function listCategories() {
			return categories;
		}

		return {
			books: {
				list: listBooks,
				add: addBook
			},
			categories: {
				list: listCategories
			}
		};
	} ());
	return library;
}
module.exports = solve;
