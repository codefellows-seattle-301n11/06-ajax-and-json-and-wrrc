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
// This function uses contextual "this" and needs access to global variables.  Arrow functions do not check globally for variables, only within their own context.
Article.prototype.toHtml = function() {
  let template = Handlebars.compile($('#article-template').text());

  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);

  // COMMENTED: What is going on in the line below? What do the question mark and colon represent? How have we seen this same logic represented previously?
  // Not sure? Check the docs!
  // These are called ternary operators.  The questions mark represents the condition being checked.  The code to the left of the colon runs if the condition is true, the code on the right of the colon runs if it is false.
  this.publishStatus = this.publishedOn ? `published ${this.daysAgo} days ago` : '(draft)';
  this.body = marked(this.body);

  return template(this);
};

// REVIEWED: There are some other functions that also relate to all articles across the board, rather than just single instances. Object-oriented programming would call these "class-level" functions, that are relevant to the entire "class" of objects that are Articles.

// REVIEWED: This function will take the rawData, how ever it is provided, and use it to instantiate all the articles. This code is moved from elsewhere, and encapsulated in a simply-named function for clarity.

// COMMENTED: Where is this function called? What does 'rawData' represent now? How is this different from previous labs?
// This function is called in the index.html file as the last script.  rawData in this case represents the key from localStorage to be pulled.  Previously rawData was an array of objects in JavaScript.
Article.loadAll = articleData => {
  articleData.sort((a,b) => (new Date(b.publishedOn)) - (new Date(a.publishedOn)))

  articleData.forEach(articleObject => Article.all.push(new Article(articleObject)))
}

Article.fetchAll = () => {
  // REVIEWED: What is this 'if' statement checking for? Where was the rawData set to local storage?
  if (localStorage.rawData) {
    let myjson= JSON.parse(localStorage.getItem('rawData'));
    Article.loadAll(myjson);
    articleView.initIndexPage();
  } else {
    $.getJSON('./data/hackerIpsum.json')
      .then(function(data){
        localStorage.setItem('rawData', JSON.stringify(data))
        console.log('Succeeded', data)
        location.reload();
      }, function(err){
        console.log('Error', err)
      }
      )
  }
}