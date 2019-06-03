document.body.addEventListener('click', function(event) {
if (!event) {return;}
var posts = document.querySelectorAll('div[postid]');
for (var i = 0; i<posts.length; i++) {
if (posts[i].contains(event.target)) { 
alert(posts[i].getAttribute('postid'));
}
}  
});
