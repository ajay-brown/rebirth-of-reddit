window.onload = function() {
  const oReq = new XMLHttpRequest();
  oReq.open("GET", "https://www.reddit.com/r/AskReddit.json"); //loading default page
  oReq.send();
  oReq.addEventListener("load", originalFeed);
};
function originalFeed() {
  //loading titles of AskReddit
  let originalData = JSON.parse(this.response);
  console.log(originalData);
  originalData.data.children.forEach(function(element, index, array) {
    //to display each post
    let newPostArea = document.createElement("div"); //area for posting
    feed.appendChild(newPostArea);
    let postScore = document.createElement("div");
    postScore.innerHTML = element.data.score;
    newPostArea.appendChild(postScore);
    let newPostContent = document.createElement("div"); //adding content to area
    newPostContent.innerHTML = element.data.title;
    newPostArea.appendChild(newPostContent);
    let newPostAuthor = document.createElement("div");
    newPostAuthor.innerHTML = element.data.author;
    newPostContent.appendChild(newPostAuthor);
    this.addEventListener("click", function() {
      let readFull = this.data.permalink;
      console.log(readFull);
      let oReq1 = new XMLHttpRequest();
      oReq1.open("GET", readFull);
      oReq1.send();
      window.open(readfull);
      console.log("clicky");
    });
  }); //need to add element.data.permalink
}
