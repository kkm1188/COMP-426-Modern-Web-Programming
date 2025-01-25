function pageView(){
  return $(`
  <div id="root">
      <section id="header">
          <div class ="title"> Comp 426 Twitter </div>
          <br>
          <div>
              <button class="refresh button">
              Refresh Feed</button>
              <button class="newTweet button">
              Create New Tweet</button>
          </div>
      </section>
      <section id="main">
          <div id="main">
          </div>
      </section>            
      </div>`);
}
async function pullTweets(){
  $('#main').empty();
  const result = await axios({
    method: 'get',
    url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
    withCredentials: true,
  });
  for(let i =0; i < 50; i++){
      let tweet = result.data[i];
      $("#main").append(createTweetLayout(tweet));
  }
}

export function createTweetLayout(tweet){
  let tweetLayout = ` <div class ="tweet" author = "${tweet.author}" user = "${tweet.id}" id ="${tweet.id}" ></div>`;

  tweetLayout += `<div class="pTweet" id="${tweet.id}" user = "${tweet.id}">
    <div class="user">User: ${tweet.author}</div>
        <br>
      <div class = "tweetBody" >${tweet.body}</div>
    <br>
  </div>`;

  if(tweet.isLiked && !tweet.isMine){
      tweetLayout += `<button author = "${tweet.author} "user="${tweet.id}" id = "${tweet.id}" class="unlike button" type="submit"> Unlike </button>` ;
  }
  else if(!tweet.isLiked && !tweet.isMine){
      tweetLayout += `<button class="like button" user="${tweet.id}" id = "${tweet.id}" type ="submit"> Like </button>`;
  }
  tweetLayout +=`<button class="retweet button" user="${tweet.id}" id = "${tweet.id}"> ${tweet.retweetCount} Retweets </button>`;
  tweetLayout +=`<button class="reply button" user ="${tweet.id}" id = "${tweet.id}"> ${tweet.replyCount} Replies </button>`;

  if(tweet.isMine){
      tweetLayout += `<button class="delete button" user ="${tweet.id}" id = "${tweet.id}"> Delete </button>` ;
      tweetLayout += `<button class="edit button" user = "${tweet.id}" id = "${tweet.id}"> Edit </button>`;
  }
  tweetLayout += `<div> ${tweet.likeCount} Likes </div> <br> <br>`
  return tweetLayout;
}

export function createTweet(){
  let tweet = `<div class= "tweetLayout">
      <div>
          <div class ="user"> New Tweet </div>
          <form>
              <textarea id="body" row = "5" cols="50" placeholder="Compose your tweet"></textarea> 
                  <br>
                  <button class="post button" id="submit" type="submit" > Post </button>
                  <button class="button" id="cancel button"> Cancel </button>
          </form>
      </div>
  </div> `;

  return tweet;
}
r
export function handleNewPost(event){
  event.preventDefault();
  let main = $('#main');
  main.empty();
  main.append(createTweet());
}

//post can have many outcomes
export async function handlePostButton(event){
  event.preventDefault();
  //let body2 = $('#body').val();
    let result = await axios({
       method: 'post',
       url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
       withCredentials: true,
       data: {
           body: "" + $('#body').val(),
       }
   });
  refresh();
}

//put only has 1 outcome
export async function handleLikeButton(event){
  event.preventDefault();
  let user = event.target.getAttribute("user");
  const put= await axios({
      method: 'put',
      url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets/'+ user +'/like',
      withCredentials: true,
  });
  refresh();
}

export async function handleUnlikeButton(event){
  event.preventDefault();
  let user = event.target.getAttribute("user");
  const put= await axios({
      method: 'put',
      url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets/'+user+'/unlike',
      withCredentials: true,
  });
  refresh();
}

export async function handleRetweetClick(event){
  event.preventDefault();
  let user = event.target.getAttribute("user");
  let id = $("#"+user);
  id.empty();
  id.append(makeRetweetForm(user));
}

export function makeRetweetForm(tweeter){
  let retweet = `<div class="reweetForm" user = "${tweeter}" id = "${tweeter}">
  <form>
      <div class="user" user = "${tweeter}" id = "${tweeter}">Retweet</div>
      <br>
      <textarea rows="3" cols="50" id="retweetBody" placeholder="Quote For Retweet"></textarea>              
      <footer>
          <button class="button" id="submitRetweet" user="${tweeter}" type="submit">Post Retweet</button>
          <button class="button " id="cancel">Cancel Retweet </button>
      </footer>
  </form>
  </div>
  `;
  return retweet;
}

export async function handleRetweetPost(event){
  event.preventDefault();
  let user = event.target.getAttribute("user");
  let newBody = $("#retweetBody").val();
  let oldUser;
  let id = $("#"+ user)
  id.empty();
  const result2 = await axios({
        method: 'get',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
        withCredentials: true,
      });

  for(let i = 0; i<50; i++){
    if(user == result2.data[i].id){
      oldUser = result2.data[i];
    }
  }
  const result = await axios({
    method: 'post',
    url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
    withCredentials: true,
    data: {
      "type": "retweet",
      "parent": '' + user,
      "body": '' + newBody + '<br>' + '<br>' + 'Retweet @' + oldUser.author + ': "' + oldUser.body + '"',
    },
  });
  refresh();
}
//make reply form come after tweet?? but how
export async function replyClick(event){
  event.preventDefault();
  let user = event.target.getAttribute("user"); 
  let id = $("#"+user);
  id.empty();
  id.append(makeReplyForm(user));
}


export function makeReplyForm(user){
  let replyForm = `
  <div class="replyForm">
  <form>
      <div class="user">Reply</div>
      <br>
      <textarea rows="5" cols="50" id="replyBody" placeholder="Compose Reply"></textarea>              
      <footer>
          <button class="button" id="submitReply" user="${user}" type="submit">Post Reply</button>
          <button class="button " id="cancel">Cancel Reply</button>
      </footer>
  </form>
  </div>
  `;
  return replyForm;
}

export async function handleReplyPost(event){
  event.preventDefault();
  let user = event.target.getAttribute("user");
  let replyBody = $('#replyBody').val();
  let result = await axios({
      method: 'post',
      url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
      withCredentials: true,
      data: {
          "type": "reply",
          "parent": user,
          "body": ""+ replyBody,
      }
  });
  refresh();
}
export async function handleEdit(event){
  event.preventDefault();
  let user = event.target.getAttribute("user"); 
  let id = $("#"+ user)
  id.empty();
  const result = await axios({
        method: 'get',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
        withCredentials: true,
      });

  for(let i = 0; i<50; i++){
    if(user == result.data[i].id){
      id.append(editTweet(result.data[i]));
    }
  } 
}

export function editTweet(tweet){
  let edit =`<div class="editForm" user = ${tweet.id}>
  <div class="${tweet.id}">Edit Post</div>
  <br>
      <form>
       <textarea rows="5" cols="50" id="editBody"> ${tweet.body} </textarea>
       <footer>
           <button class="button" id="submitEdit" user="${tweet.id}" type="submit">Save Edits</button>
           <button class="button" id="cancel">Cancel Edits</button>
        </footer>
      </form>
    </div>
  `;
  return edit;
}

export async function handleEditSubmit(event){
  event.preventDefault();
  let user = event.target.getAttribute("user");
  let updatedBody = $('#editBody').val();

  let updated = await axios({
      method:'put',
      url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets/'+user,
      withCredentials: true,
      data: {
          "body": ""+updatedBody,
      },
  });
  refresh();
}

export async function handleDelete(event){
  event.preventDefault();
  let tweeter = event.target.getAttribute('user');
  let result = await axios({
      method: 'delete',
      url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets/'+tweeter,
      withCredentials: true,
  });
  refresh();

}

export function handleRefreshButton(event){
  event.preventDefault();
  refresh();
}

export function refresh(){
  let main = $('#main');
  main.empty();
  pullTweets();
}

export async function renderTweets(){
  let body = $('body');

  body.empty();
  body.append(pageView());

  pullTweets();
  body.on('click', '.newTweet', handleNewPost);
  body.on('click', '.post', handlePostButton);
  body.on('click', '.refresh', handleRefreshButton);
  body.on('click', '.like', handleLikeButton);
  body.on('click', '.unlike', handleUnlikeButton);
  body.on('click', '.retweet', handleRetweetClick);
  body.on('click', '#submitRetweet', handleRetweetPost);
  body.on('click', '.reply', replyClick);
  body.on('click', '#submitReply', handleReplyPost);
  body.on('click', '.edit', handleEdit);
  body.on('click' , '#submitEdit', handleEditSubmit);
  body.on('click', '.delete', handleDelete);

}

$(document).ready(renderTweets());
