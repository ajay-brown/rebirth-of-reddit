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
  console.log(originalData);
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
      newPostContent.innerHTML = element.data.title;
      newPostArea.appendChild(newPostContent);
      let newPostAuthor = document.createElement("div");
      newPostAuthor.id = "authorDiv";
      newPostAuthor.innerHTML = "by " + element.data.author;
      newPostContent.appendChild(newPostAuthor);
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
      i++;
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
      newPostContent.innerHTML = element.data.title;
      newPostArea.appendChild(newPostContent);
      let newPostAuthor = document.createElement("div");
      newPostAuthor.id = "authorDiv";
      newPostAuthor.innerHTML = "by " + element.data.author + " • ";
      newPostContent.appendChild(newPostAuthor);
      let postTime = document.createElement("div");
      postTime.id = "timeDiv";

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
      i++;
    }
  });
}

//features to add: nsfw filter, search bar, random reddit, related reddits, "pin" post graphic
