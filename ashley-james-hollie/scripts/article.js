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

// COMMENTED: Why isn't this method written as an arrow function?
// We cannot use an arrow function in this case because the function below contains a contextual "this", which does not work in arrow functions.
Article.prototype.toHtml = function() {
  let template = Handlebars.compile($('#article-template').text());

  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);

  // COMMENTED: What is going on in the line below? What do the question mark and colon represent? How have we seen this same logic represented previously?
  // Not sure? Check the docs!
  // The line below uses a ternary operator which essentially uses the same logic as an if/else statement. The ? checks to see if there is a publishedOn date. If there is one, then the following statement is set to this.publishStatus. The colon is like the "else" statement. If there is NOT a publishedOn date, then this.publishStatus is set to draft.
  this.publishStatus = this.publishedOn ? `published ${this.daysAgo} days ago` : '(draft)';
  this.body = marked(this.body);

  return template(this);
};

// REVIEWED: There are some other functions that also relate to all articles across the board, rather than just single instances. Object-oriented programming would call these "class-level" functions, that are relevant to the entire "class" of objects that are Articles.

// REVIEWED: This function will take the rawData, how ever it is provided, and use it to instantiate all the articles. This code is moved from elsewhere, and encapsulated in a simply-named function for clarity.

// COMMMENTED: Where is this function called? What does 'rawData' represent now? How is this different from previous labs?
// PUT YOUR RESPONSE HERE: rawData is from the JSON file, loadAll is called in the fetchAll function that is from local storage. So one is from the JSON server and the other was from local storage.
Article.loadAll = articleData => {
  articleData.sort((a,b) => (new Date(b.publishedOn)) - (new Date(a.publishedOn)))

  articleData.forEach(articleObject => Article.all.push(new Article(articleObject)))
}

// REVIEWED: This function will retrieve the data from either a local or remote source, and process it, then hand off control to the View.
Article.fetchAll = () => {
  // REVIEWED: What is this 'if' statement checking for? Where was the rawData set to local storage?
  if (localStorage.rawData) {
    Article.loadAll(JSON.parse(localStorage.rawData));
  } else {
    $.getJSON('./data/hackerIpsum.json')
      .then(function(rawArticles) {
        localStorage.setItem('rawData', JSON.stringify(rawArticles));
        Article.loadAll(rawArticles);
      });
  }
  articleView.initIndexPage();
}