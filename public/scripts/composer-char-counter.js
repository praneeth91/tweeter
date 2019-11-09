let i = 140
$(document).ready(function() {
  $(".tweet-box").on("input change",function(){
    let text = this.value
    let maxLength = i - (text.length);
    if(maxLength < 0) {
      $(".counter").css('color', 'red');
      $(".counter").text(maxLength);
  } else {
      $(".counter").css('color', 'black');
      $(".counter").text(maxLength);
  }  
  });
});