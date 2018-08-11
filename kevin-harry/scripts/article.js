'use strict';

function Article (rawDataObj) {
  this.author = rawDataObj.author;
  this.authorUrl = rawDataObj.authorUrl;
  this.title = rawDataObj.title;
  this.category = rawDataObj.category;
  this.body = rawDataObj.body;
  this.publishedOn = rawDataObj.publishedOn;
}

// REVIEWed: Instead of a global `articles = []` array, let's attach this list of all articles directly to the constructor function. Note: it is NOT on the prototype. In JavaScript, functions are themselves objects, which means we can add properties/values to them at any time. In this case, the array relates to ALL of the Article objects, so it does not belong on the prototype, as that would only be relevant to a single instantiated Article.
Article.all = [];

// COMMENTed: Why isn't this method written as an arrow function?
// PUT YOUR RESPONSE HERE
// Arrow functions do not have their own function for the term of 'this'.  
Article.prototype.toHtml = function() {
 //research more on .prototype
  let template = Handlebars.compile($('#article-template').text());

  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/1000/60/60/24);

  // COMMENTed: What is going on in the line below? What do the question mark and colon represent? How have we seen this same logic represented previously?
  // Not sure? Check the docs!
  // PUT YOUR RESPONSE HERE
  // this is a ternary expression whereas we would test the value of this.publishedOn as truthy/falsy.  If truthy, then we would run the code within the ? and :, otherwise falsy, we would run the code after the :. This is a shorthand / consise syntax of if/else statement.  

  this.publishStatus = this.publishedOn ? `published ${this.daysAgo} days ago` : '(draft)';
  this.body = marked(this.body);

  return template(this);
};

// REVIEWed: There are some other functions that also relate to all articles across the board, rather than just single instances. Object-oriented programming would call these "class-level" functions, that are relevant to the entire "class" of objects that are Articles.

// REVIEWed: This function will take the rawData, how ever it is provided, and use it to instantiate all the articles. This code is moved from elsewhere, and encapsulated in a simply-named function for clarity.

// COMMENTed: Where is this function called? What does 'rawData' represent now? How is this different from previous labs?
// PUT YOUR RESPONSE HERE
// The function loadAll is called within .fetchAll.  It is a .json object in both local storage and the else statement.  Previously this was a collection of strings and NOT a .json object.  
Article.loadAll = articleData => {
  console.log('Article.loadAll() input articleData', articleData);
  articleData.sort((a,b) => (new Date(b.publishedOn)) - (new Date(a.publishedOn)))

  articleData.forEach(articleObject => Article.all.push(new Article(articleObject)))
}

// REVIEWed: This function will retrieve the data from either a local or remote source, and process it, then hand off control to the View.
Article.fetchAll = () => {
  localStorage.clear(); // use this to test the else section.
  if (localStorage.rawData) {
    //console.log('testing grabbing data from localStorage cache');

    //takes a JSON string from localStorage and converts it to an object.
    Article.loadAll(JSON.parse(localStorage.rawData));
    articleView.initIndexPage();
  } else {
    $.getJSON('./data/hackerIpsum.json')
      //console.log('testing no local storage');
      .then(function(data) {
        Article.loadAll(data);
        localStorage.rawData = JSON.stringify(data);
        articleView.initIndexPage();
      });
  }
}
