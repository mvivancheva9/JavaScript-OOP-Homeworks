/* Task Description */
/*
* Create an object domElement, that has the following properties and methods:
  * use prototypal inheritance, without function constructors
  * method init() that gets the domElement type
    * i.e. `Object.create(domElement).init('div')`
  * property type that is the type of the domElement
    * a valid type is any non-empty string that contains only Latin letters and digits
  * property innerHTML of type string
    * gets the domElement, parsed as valid HTML
      * <type attr1="value1" attr2="value2" ...> .. content / children's.innerHTML .. </type>
  * property content of type string
    * sets the content of the element
    * works only if there are no children
  * property attributes
    * each attribute has name and value
    * a valid attribute has a non-empty string for a name that contains only Latin letters and digits or dashes (-)
  * property children
    * each child is a domElement or a string
  * property parent
    * parent is a domElement
  * method appendChild(domElement / string)
    * appends to the end of children list
  * method addAttribute(name, value)
    * throw Error if type is not valid
  * method removeAttribute(attribute)
    * throw Error if attribute does not exist in the domElement
*/


/* Example

var meta = Object.create(domElement)
	.init('meta')
	.addAttribute('charset', 'utf-8');

var head = Object.create(domElement)
	.init('head')
	.appendChild(meta)

var div = Object.create(domElement)
	.init('div')
	.addAttribute('style', 'font-size: 42px');

div.content = 'Hello, world!';

var body = Object.create(domElement)
	.init('body')
	.appendChild(div)
	.addAttribute('id', 'cuki')
	.addAttribute('bgcolor', '#012345');

var root = Object.create(domElement)
	.init('html')
	.appendChild(head)
	.appendChild(body);

console.log(root.innerHTML);
Outputs:
<html><head><meta charset="utf-8"></meta></head><body bgcolor="#012345" id="cuki"><div style="font-size: 42px">Hello, world!</div></body></html>
*/


function solve() {
	var domElement = (function () {

		function getSortedAttributes(attributes) {
			return Object.keys(attributes).sort().reduce(function (prev, currentKey) {
				return prev + ' ' + currentKey + '="' + attributes[currentKey] + '"';
			}, '');
		}

		var domElement = {
			init: function(type) {
				this.type = type;
				this.content = '';
				this.attributes = [];
				this.parent;
				this.children = [];

				return this;
			},

			appendChild: function(child) {
				if (typeof child !== 'string') {
					child.parent = this;
				}
				this.children.push(child);

				return this;
			},
			addAttribute: function(name, value) {
				if (name === '' || (name.match(/[^\w\-]/))){
					throw new Error ('Letters, digits, and dashes only');
				}
				this.attributes[name] = value;
				return this;
			},
			removeAttribute: function(attribute) {
				if(!this.attributes[attribute]){
					throw new Error('Such kind of attribute does not exists');
				}
				delete this.attributes[attribute];
				return this;
			},
      		get innerHTML() {
				var child,
					innerHtml,
					attributesString = getSortedAttributes(this.attributes);

				innerHtml = '<' + this.type + attributesString + '>';

				if (this.children) {
					for (var child in this.children) {
						this.content = '';
						if (typeof  this.children[child] == 'string') {
							innerHtml += this.children[child];
						}
						else {
							innerHtml += this.children[child].innerHTML;
						}
					}
				}
				innerHtml += this.content;
				innerHtml += '</' + this.type + '>';

				return innerHtml;
	  		}
		};

		Object.defineProperty(domElement, 'type',{
			get: function() {
				return this._type;
			},
			set: function(value) {
				if (value === '' || value.match(/[^\w]/)) {
					throw new Error('Letters and digits only');
				}
				this._type = value;
			}
		});

		Object.defineProperty(domElement, 'content',{
			get: function() {
				return this._content;
			},
			set: function(value) {
				if (this.hasChildren === true) {
					throw new Error('Has children');
				}
				this._content = value;
			}
		});

		Object.defineProperty(domElement, 'parent',{
			get: function() {
				return this._parent;
			},
			set: function(value) {
				this._parent = value;
			}
		});
		Object.defineProperty(domElement, 'children',{
			get: function() {
				return this._children;
			},
			set: function(value) {
				this._children = value;
			}
		});
		return domElement;

	} ());
	return domElement;
}

module.exports = solve;
