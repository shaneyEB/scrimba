import { tweetsData } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

//  modal
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];
span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

const xtweetInput = document.getElementById('xtweet-input')
document.addEventListener('click', function (e) {
    if (e.target.dataset.like) {
        handleLikeClick(e.target.dataset.like)
    }
    else if (e.target.dataset.retweet) {
        handleRetweetClick(e.target.dataset.retweet)
    }
    else if (e.target.dataset.reply) {
        handleReplyClick(e.target.dataset.reply)
    }
    else if (e.target.dataset.xtweet) {
        handleXTweetClick(e.target.dataset.xtweet)
    }
    else if (e.target.id === 'tweet-btn') {
        handleTweetBtnClick()
    }

    else if (e.target.id === 'xtweet-btn') {
        handleXTweetBtnClick()
    }
    else if (e.target.dataset.edit) {
        handleEditClick(e.target.dataset.edit)
    }
    else if (e.target.dataset.delete) {
        handleDeleteClick(e.target.dataset.delete)
    }
})

function handleXTweetBtnClick() {
    const uuid = document.getElementById('ref').innerHTML
    const index = tweetsData.findIndex(item => item.uuid === uuid);

    if (xtweetInput.value) {
        const x = {
            handle: `@XUser ✅`,
            profilePic: `images/flower.png`,
            tweetText: xtweetInput.value
        }
        tweetsData[index].replies.unshift(x)
        render()
        handleReplyClick(uuid)
        modal.style.display = "none";
        xtweetInput.value = "";
    } else {
        document.getElementById('xError').innerText = "You must enter details.."
    }
}

function handleXTweetClick(xTweet) {
    document.getElementById('xError').innerText = ""
    document.getElementById("tweet-detail").innerHTML = ""
    document.getElementById('ref').innerHTML = xTweet
    tweetsData.forEach(function (tweet) {
        if (tweet.uuid === xTweet) {
            document.getElementById("tweet-detail").innerHTML = tweet.tweetText
        }
    })
    modal.style.display = "block";
}

function handleLikeClick(tweetId) {
    const targetTweetObj = tweetsData.filter(function (tweet) {
        return tweet.uuid === tweetId
    })[0]
    if (targetTweetObj.isLiked) {
        targetTweetObj.likes--
    }
    else {
        targetTweetObj.likes++
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked
    render()
}

function handleRetweetClick(tweetId) {
    const targetTweetObj = tweetsData.filter(function (tweet) {
        return tweet.uuid === tweetId
    })[0]

    if (targetTweetObj.isRetweeted) {
        targetTweetObj.retweets--
    }
    else {
        targetTweetObj.retweets++
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
    render()
}

function handleReplyClick(replyId) {
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden')
}

function handleEditClick(replyId) {
    document.getElementById(`edit-${replyId}`).classList.toggle('hidden')
}

function handleDeleteClick(replyId) {
    const removeIndex = tweetsData.findIndex(item => item.uuid === replyId);
    // remove object
    tweetsData.splice(removeIndex, 1);
    localStorage.removeItem(replyId)
    render()
}

function handleTweetBtnClick() {
    const tweetInput = document.getElementById('tweet-input')
    let x = uuidv4()
    if (tweetInput.value) {
        localStorage.setItem(x, true);
        let edit = localStorage.getItem(x)
        tweetsData.unshift({
            handle: `@Scrimba`,
            profilePic: `images/scrimbalogo.png`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            ableToEdit: edit,
            uuid: x
        })
        render()
        tweetInput.value = ''
    }

}

function getFeedHtml() {
    let feedHtml = ``
    tweetsData.forEach(function (tweet) {
        let likeIconClass = ''
        if (tweet.isLiked) {
            likeIconClass = 'liked'
        }
        let retweetIconClass = ''
        if (tweet.isRetweeted) {
            retweetIconClass = 'retweeted'
        }
        let editIconClass = ''
        let editsHtml = ''
      
        if (localStorage.getItem(tweet.uuid)) {
            if (tweet.ableToEdit) {
                editIconClass = 'edit'
                editsHtml += `
                <div class="update">
                    <i class="fa-solid fa-reply retweeted fax" data-xtweet="${tweet.uuid}"></i>Reply 
                </div>
                <div> 
                    <i class="fa-solid fa-trash liked fax" data-delete="${tweet.uuid}"></i>Delete
                </div>`
            }
        } else {
            editIconClass = ''
            editsHtml += `
            <div class="update"> 
                <i class="fa-solid fa-reply retweeted fax" data-xtweet="${tweet.uuid}"></i>Reply
            </div>`
        }

        let repliesHtml = ''
        if (tweet.replies.length > 0) {
            tweet.replies.forEach(function (reply) {
                repliesHtml += `
        <div class="tweet-reply">
            <div class="tweet-inner">
                <img src="${reply.profilePic}" class="profile-pic">
                    <div>
                        <p class="handle">${reply.handle}</p>
                        <p class="tweet-text">${reply.tweetText}</p>
                    </div>
            </div>
        </div>
        `
            })
        }

        feedHtml += `
        <div class="tweet">
            <div class="tweet-inner">
                <img src="${tweet.profilePic}" class="profile-pic">
                <div>
                    <p class="handle">${tweet.handle}</p>
                    <p class="tweet-text">${tweet.tweetText}</p>
                    <div class="tweet-details">
                        <div class="tweet-detail">
                            <i class="fa-regular fa-comment-dots"
                            data-reply="${tweet.uuid}"
                            ></i>
                            ${tweet.replies.length}
                        </div>
                        <div class="tweet-detail">
                            <i class="fa-solid fa-heart ${likeIconClass}"
                            data-like="${tweet.uuid}"
                            ></i>
                            ${tweet.likes}
                        </div>
                        <div class="tweet-detail">
                            <i class="fa-solid fa-retweet ${retweetIconClass}"
                            data-retweet="${tweet.uuid}"
                            ></i>
                            ${tweet.retweets}
                        </div>
                        <div class="tweet-detail">
                            <i class="fa-solid fa-ellipsis ${editIconClass}"
                            data-edit="${tweet.uuid}"
                            ></i>
                            <div class="hidden editBtn" id="edit-${tweet.uuid}">
                            ${editsHtml}
                            </div>
                        </div>
                    </div>   
                </div>            
            </div>
            <div class="hidden" id="replies-${tweet.uuid}">
                ${repliesHtml}
            </div>   
        </div>  
    </div>
`
    })
    return feedHtml
}

function render() {
    document.getElementById('feed').innerHTML = getFeedHtml()
}

render()

