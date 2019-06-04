document.body.addEventListener('click', function (event) {
	if (!event) {
		return;
	}
    
    // Log post id from storage
	getPostId();

	var posts = document.querySelectorAll('div[postid]');

	for (var i = 0; i < posts.length; i++) {
		if (posts[i].contains(event.target)) {
            
            // Store post id in storage
			setPostId(posts[i].getAttribute('postid'))


			// Add CSS class    
			//posts[i].className += ' xyz';


			// Get postid
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


document.body.addEventListener('DOMNodeInserted', function( event ) {
    if (event.target.id == "ember3") {
    markReadOnLoad();
    }
});


function setPostId(postid) {

	chrome.storage.sync.get({
		list: [] //put defaultvalues if any
	}, function (data) {
		update(data.list, postid); //storing the storage value in a variable and passing to update function
	});
}

function update(array, postid) {
	if (array.includes(postid)) {
		return;
	}
	array.push(postid);
	//then call the set to update with modified value
	chrome.storage.sync.set({
		list: array
	}, function () {
		console.log("added to list with new values");
	});
}


function getPostId() {
	chrome.storage.sync.get({
		list: []
	}, function (data) {
        console.log(data.list);
	});

}

function markReadOnLoad() {
    chrome.storage.sync.get({
		list: []
	}, function (data) {
        posts = data.list;
        for (var i = 0; i < posts.length; i++) {  
            var post = document.body.querySelector("div[postid='" + posts[i] + "']");
            
            if (post != null) {
			   // Add CSS class    
			   post.className += ' xyz';
            }


			// Get postid
			//alert(posts[i].getAttribute('postid'));
		
	}
	});
}