window.onload = function() {
  const oReq = new XMLHttpRequest();
  oReq.open("GET", "https://www.reddit.com/r/aww/.json"); //loading default page
  oReq.send();
  oReq.addEventListener("load", originalFeed);
};
let i = 0;
function originalFeed() {
  //loading titles of AskReddit
  let originalData = JSON.parse(this.response);
  originalData.data.children.forEach(function(element, index, array) {
    //to display each post
    let newPostArea = document.createElement("div"); //area for posting
    feed.appendChild(newPostArea);
    let postScore = document.createElement("div");
    postScore.id = "scoreDiv";
    postScore.innerHTML = element.data.score;
    newPostArea.appendChild(postScore);
    let newPostContent = document.createElement("div"); //adding content to area
    newPostContent.id = "contentDiv";
    newPostContent.innerHTML = element.data.title;
    newPostArea.appendChild(newPostContent);
    let newPostAuthor = document.createElement("div");
    newPostAuthor.id = "authorDiv";
    newPostAuthor.innerHTML = "by " + element.data.author;
    newPostContent.appendChild(newPostAuthor);
    let newPostPicArea = document.createElement("div");
    newPostPicArea.id = "picAreaDiv";
    newPostContent.appendChild(newPostPicArea);
    let newPostPic = new Image();
    if (element.data.thumbnail === "self") {
      return null;
    } else {
      newPostPic.src = element.data.thumbnail; //140x140;
      newPostPicArea.appendChild(newPostPic);
    }
    newPostContent.addEventListener("click", function() {
      let readFull = element.data.permalink;
      let toLink = `https://www.reddit.com${readFull}`;
      console.log(toLink);
      let oReq1 = new XMLHttpRequest();
      oReq1.open("GET", toLink);
      oReq1.send();
      window.open(toLink);
      console.log("clicky");
    });
    if (i % 2 === 0) {
      newPostContent.class = "feed1";
    } else {
      newPostContent.class = "feed2";
    }
    console.log(i);
    i++;
  });
}
//features to add: nsfw filter, search bar, random reddit, related reddits, "pin" post graphic
