'use strict';

function Article (rawDataObj) {
  this.author = rawDataObj.author;
  this.authorUrl = rawDataObj.authorUrl;
  this.title = rawDataObj.title;
  this.category = rawDataObj.category;
  this.body = rawDataObj.body;
  this.publishedOn = rawDataObj.publishedOn;
}

// REVIEWED: Instead of a global `articles = []` array, let's attach this list of all articles directly to the constructor function. Note: it is NOT on the prototype. In JavaScript, functions are themselves objects, which means we can add properties/values to them at any time. In this case, the array relates to ALL of the Article objects, so it does not belong on the prototype, as that would only be relevant to a single instantiated Article.
Article.all = [];

// COMMENT: Why isn't this method written as an arrow function?
// Arrow functions are shorter syntax best suited for non-method functions.  They cannot be used as constructors and as such, they do NOT have their own "this" or arguments.
Article.prototype.toHtml = function() {
  let template = Handlebars.compile($('#article-template').text());

  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);

  // COMMENT: What is going on in the line below? What do the question mark and colon represent? How have we seen this same logic represented previously?
  // Frequently used as a shortcut for the "if" statement, if "publishedOn" is true, the operator returns the value of expr1 otherwise, it returns the value of expr2. The expressions are seperated by the ":".
  this.publishStatus = this.publishedOn ? `published ${this.daysAgo} days ago` : '(draft)';
  this.body = marked(this.body);

  return template(this);
};

// REVIEWED: There are some other functions that also relate to all articles across the board, rather than just single instances. Object-oriented programming would call these "class-level" functions, that are relevant to the entire "class" of objects that are Articles.

// REVIEWED: This function will take the rawData, however it is provided, and use it to instantiate all the articles. This code is moved from elsewhere, and encapsulated in a simply-named function for clarity.

// COMMENT: Where is this function called? What does 'rawData' represent now? How is this different from previous labs?
// PUT YOUR RESPONSE HERE
Article.loadAll = articleData => {
  articleData.sort((a,b) => (new Date(b.publishedOn)) - (new Date(a.publishedOn)))

  articleData.forEach(articleObject => Article.all.push(new Article(articleObject)))
}

// REVIEWED: This function will retrieve the data from either a local or remote source, and process it, then hand off control to the View.
Article.fetchAll = () => {
  // REVIEW: What is this 'if' statement checking for? Where was the rawData set to local storage?
  //The 'if' statement is looking for local storage objects from which to call out in order to render the articles in the page. If there is no localStorage item named "rawArticles", the funtion will seek the data remotely (from the JSON file), load it in the 'loadAll' object, render it and then create a local storage item.
  if (localStorage.rawArticles) {
    JSON.parse(localStorage.getItem('rawArticles'));
    Article.loadAll(rawArticles);
    articleView.initIndexPage()
  }
  $.getJSON('./data/hackerIpsum.json').then(function(rawArticles){
    localStorage.setItem('rawData', JSON.stringify(rawArticles));
    Article.loadAll(rawArticles);
    console.log(Article.all);
    articleView.initIndexPage()
  });
}

