// TODO: Remove fire & forget in async calls.

var count = 0;

document.body.addEventListener('click', function (event) {
	if (!event) {
		return;
	}
       
    // Log post id from storage
	logPostId();
            
    // Store post id in storage
    var postId = getPostId(event.target)
    if (postId) {
		storePostId(postId.getAttribute('postid'))
    }
});


document.body.addEventListener('DOMNodeInserted', function( event ) {
    
    if(!event || !event.target || !getPostId(event.target)) { return;}
        
    var posts = document.querySelectorAll('div[postid]');
    // This check prevents greying out page that comes after clicking on a post. If we remove this check, the whole redirected page gets greyed out.
    // This works because there are two or less divs with postid attribute on the redirected page.
    if (posts.length <= 2) {return;}
    
    // TODO: Optimise calling markPostAsRead(). Currently it is being called every time a dom element is inserted.
    //if (event.target.id == "ember3") {
        markPostsAsRead();
    //}
});


function storePostId(postid) {

	chrome.storage.sync.get({
		list: [] //put defaultvalues if any
	}, function (data) {
		update(data.list, postid);
	});
}

function update(array, postid) {
	if (array.includes(postid)) {
		return;
	}
	array.push(postid);
	chrome.storage.sync.set({
		list: array
	}, function () {
		console.log("added to list with new values");
	});
}


function logPostId() {
	chrome.storage.sync.get({
		list: []
	}, function (data) {
        console.log(data.list);
	});

}

function markPostsAsRead() {
    count++;
    if (count%100 == 0) {console.log(count)};
    chrome.storage.sync.get({
		list: []
	}, function (data) {
        posts = data.list;
        for (var i = 0; i < posts.length; i++) {  
            var post = document.body.querySelector("div[postid='" + posts[i] + "']");
            
            if (post != null && !post.className.includes(' xyz ')) {
			   // Add CSS class    
			   post.className += ' xyz ';
            }
		
	}
	});
}

function getPostId(target) {
    var posts = document.querySelectorAll('div[postid]');

	for (var i = 0; i < posts.length; i++) {
		if (posts[i].contains(target)) {
            return posts[i];
		}
	}
    
    return null;
}

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