document.body.addEventListener('click', function(event) {
if (!event) {return;}
var posts = document.querySelectorAll('div[postid]');
for (var i = 0; i<posts.length; i++) {
if (posts[i].contains(event.target)) { 
posts[i].className += ' xyz';
//alert(posts[i].getAttribute('postid'));
}
}  
});

/*
document.body.addEventListener('click', function(event) {
if (!event) {return;}
var post = document.body.querySelector("div[postid='231cd3d019']");
try {
if (post.contains(event.target)) { 
console.log(post.innerHTML);
}
}
catch (err) {
alert(post);
}
});
*/

