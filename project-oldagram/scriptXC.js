const posts = [
  {
    name: "Vincent van Gogh",
    username: "vincey1853",
    location: "Zundert, Netherlands",
    avatarXC: "images/avatar-vangogh.jpg",
    post: "images/post-vangogh.jpg",
    comment: "just took a few mushrooms lol",
    likes: 21
  },
  {
    name: "Gustave Courbet",
    username: "gus1819",
    location: "Ornans, France",
    avatarXC: "images/avatar-courbet.jpg",
    post: "images/post-courbet.jpg",
    comment: "i'm feelin a bit stressed tbh",
    likes: 4
  },
  {
    name: "Joseph Ducreux",
    username: "jd1735",
    location: "Paris, France",
    avatarXC: "images/avatar-ducreux.jpg",
    post: "images/post-ducreux.jpg",
    comment: "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
    likes: 152
  }
]

let containerEl = document.getElementById("container");
let likeEl = document.getElementById("like-el");
let countEL = document.getElementById("count-el");

for (let i = 0; i < posts.length; i++) {
  containerEl.innerHTML += `
    <div class="post section">
        <div class="profile">
          <div class="postXC"><img src="${posts[i].avatarXC}" alt="" /></div>
          <div>
            <div class="name">${posts[i].name}</div>
            <div class="location">${posts[i].location}</div>
          </div>
        </div>
        <div class="post_img">
          <img src="${posts[i].post}" alt="${posts[i].name}" />
        </div>
        <div class="details">
          <div class="like" id="like-el"><img src="images/like.png" alt="" /></div>
          <div class="comment"><img src="images/comment.png" alt="" /></div>
          <div class="share"><img src="images/share.png" alt="" /></div>
        </div>
        <div class="actions">
          <div class="likes" id="count-el">${posts[i].likes} likes</div>
          <div class="user_comments">
            <div class="username">${posts[i].username}</div>
            <div class="user_comment">${posts[i].comment}</div>
          </div>
        </div>
      </div>
    `;
}
