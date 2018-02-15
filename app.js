window.onload = function() {
  const oReq = new XMLHttpRequest();
  oReq.open("GET", "https://www.reddit.com/r/aww/.json"); //loading default page
  oReq.send();
  oReq.addEventListener("load", feed);
};

let i = 0;
function feed() {
  //loading titles of AskReddit
  let originalData = JSON.parse(this.response);
  console.log(originalData);
  document.title = originalData.data.children[0].data.subreddit_name_prefixed; //subreddit title
  originalData.data.children.forEach(function(element, index, array) {
    //to display each post
    let newPostArea = document.createElement("div"); //area for posting
    if (i % 2 === 0) {
      let columnSelector = document.getElementById("feedOne");
      columnSelector.appendChild(newPostArea);
      let newPostPicArea = document.createElement("div");
      newPostPicArea.id = "picAreaDiv";
      newPostArea.appendChild(newPostPicArea);
      let newPostPic = new Image();
      if (element.data.thumbnail === "self") {
        return null;
      } else {
        newPostPic.src = element.data.thumbnail; //140x140;
        newPostPic.id = "picture";
        newPostPicArea.appendChild(newPostPic);
      }
      let newPostContent = document.createElement("div"); //adding content to area
      newPostContent.id = "contentDiv";
      let string = element.data.title;
      let newTitle = getTitleLength(string);
      newPostContent.innerHTML = newTitle + " • ";
      newPostArea.appendChild(newPostContent);
      let newPostAuthor = document.createElement("div");
      newPostAuthor.id = "authorDiv";
      newPostAuthor.innerHTML = "by " + element.data.author + " • ";
      newPostContent.appendChild(newPostAuthor);
      let newPostTime = document.createElement("div");
      newPostTime.id = "timeDiv";
      let thisPostTime = element.data.created_utc;
      let timeFrom = calculateTimeSincePosted(thisPostTime);
      newPostTime.innerHTML = timeFrom;
      newPostContent.appendChild(newPostTime);
      newPostContent.addEventListener("click", function() {
        let readFull = element.data.permalink;
        let toLink = `https://www.reddit.com${readFull}`;
        let oReq1 = new XMLHttpRequest();
        oReq1.open("GET", toLink);
        oReq1.send();
        window.open(toLink);
      });
      i++; //ALTERNATING SIDES
    } else {
      let columnSelector = document.getElementById("feedTwo");
      columnSelector.appendChild(newPostArea);
      let newPostPicArea = document.createElement("div");
      newPostPicArea.id = "picAreaDiv";
      newPostArea.appendChild(newPostPicArea);
      let newPostPic = new Image();
      if (element.data.thumbnail === "self") {
        return null;
      } else {
        newPostPic.src = element.data.thumbnail; //140x140;
        newPostPic.id = "picture";
        newPostPicArea.appendChild(newPostPic);
      }
      let newPostContent = document.createElement("div"); //adding content to area
      newPostContent.id = "contentDiv";
      let string = element.data.title;
      let newTitle = getTitleLength(string);
      newPostContent.innerHTML = newTitle + " • ";
      newPostArea.appendChild(newPostContent);
      let newPostAuthor = document.createElement("div");
      newPostAuthor.id = "authorDiv";
      newPostAuthor.innerHTML = "by " + element.data.author + " • ";
      newPostContent.appendChild(newPostAuthor);
      let newPostTime = document.createElement("div");
      newPostTime.id = "timeDiv";
      let thisPostTime = element.data.created_utc;
      let timeFrom = calculateTimeSincePosted(thisPostTime);
      newPostTime.innerHTML = timeFrom;
      newPostContent.appendChild(newPostTime);
      newPostContent.addEventListener("click", function() {
        let readFull = element.data.permalink;
        let toLink = `https://www.reddit.com${readFull}`;
        let oReq1 = new XMLHttpRequest();
        oReq1.open("GET", toLink);
        oReq1.send();
        window.open(toLink);
      });
      i++; //alternating sides
    }
  });
}
//Check title length
function getTitleLength(string) {
  if (string.length >= 60) {
    return string.slice(0, 60) + "...";
  } else {
    return string;
  }
}
//to calc date, from Jocelyn
function calculateTimeSincePosted(sec) {
  const date = new Date(sec * 1000);
  const today = new Date();
  const ms = today - date;
  let s = Math.floor(ms / 1000);
  let m = Math.floor(s / 60);
  s = s % 60;
  let h = Math.floor(m / 60);
  m = m % 60;
  const d = Math.floor(h / 24);
  h = h % 24;
  if (d === 0) {
    return h + "H " + m + "M ago";
  } else if (h === 0) {
    return m + " M ago";
  } else {
    return d + "D " + h + "H " + m + "M ago";
  }
}

randomBtn.addEventListener("click", function() {
  let clearFeedOne = document.getElementById("feedOne");
  clearFeedOne.textContent = "";

  let clearFeedTwo = document.getElementById("feedTwo");
  clearFeedTwo.textContent = "";

  const randomReq = new XMLHttpRequest();
  randomReq.open(
    "GET",
    "https://crossorigin.me/https://www.reddit.com/r/random/.json"
  );
  randomReq.send();
  randomReq.addEventListener("load", feed);
});
//features to add: nsfw filter, search bar, random reddit, related reddits, "pin" post graphic
