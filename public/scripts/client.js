const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
let count = 0;
const renderTweets = function(tweets) {
console.log(count);
if (count === 0) {
  for (let x of tweets) {
    $("#tweet-container").append(createTweetElement(x));
    count++

  }
} else {
    $("#tweet-container").append(createTweetElement(tweets[(tweets.length - 1)]));
}
}

const createTweetElement = function(tweet) {
let $tweet = `
<article class="tweet-container">
<span>
    <div class="tweet-container-left">
      <img src=${tweet.user.avatars}alt="">
      <span class="header-left">${tweet.user.name}</span>
      <span class="header-right"><a>${tweet.user.handle}</a></span>
    </div>
  </span>
<textarea class="article-text">

${escape(tweet.content.text)}

</textarea>
<footer>
  <span class="footer-left">${Math.round((tweet.created_at) / 8.64e+7)} days ago</span>
  <span class="footer-right">
      <i class="far fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="far fa-heart"></i>
  </span>
</footer>
</article>`

return $tweet;
}

$(document).ready(() =>{
  
  const loadTweets = function() {
    $.get("/tweets",(data,status) => {
      renderTweets(data);
    })
  };
  
  $form = $("form");
  $form.on('submit',() => {
    event.preventDefault();
    let str = $form.serialize();
    console.log(str);
    if(str === "text=") {
      $('#Error').show()
      $('#too-long').hide();
      $('#too-short').show();
      
    } else if ((str.length - 5) > 140){
      $('#Error').show()
      $('#too-short').hide();
      $('#too-long').show();
      
    } else {
      $('#Error').hide();
      $.ajax({
        type: 'POST',
        url: '/tweets',
        data: str,
        success: () => {
          $('.tweet-box').val("");
          $('.counter').html("140");
          loadTweets();
       } 
      })
    }   
  })
  $('#arrow-icon').on('click',() => {
    $('.new-tweet').slideToggle();
  })
  loadTweets()
  $('#Error').hide();
  $('.new-tweet').hide();

});


  
