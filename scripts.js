var subreddit = 'gifs';
var sort = 'hot';
var limit = '10';

let xhr = new XMLHttpRequest();
xhr.open('GET', 'https://www.reddit.com/r/' + subreddit + '.json?sort=' + sort + '&limit=' + limit);
xhr.send();

xhr.onload = function() 
{
	if (xhr.status != 200) 
	{ 
		alert(`Error ${xhr.status}: ${xhr.statusText}`); 
	} 
	else 
	{ 
		var data = JSON.parse(xhr.response);
		parseJSON(data);
	}
};

function parseJSON(data)
{
	const app = document.getElementById('root');

	const cardContainer = document.createElement('div');
	cardContainer.setAttribute('class', 'container');

	app.appendChild(cardContainer);

	var posts = data['data']['children'];
	for (var i = 0;i < posts.length;i++)
	{
		var post = posts[i]['data'];

		var srcURL = post.url;

		var title = post.title;
		var postURL = post.permalink;
		var subredditName = post.subreddit_name_prefixed;
		var nsfw = post.over_18;
		var stickied = post.stickied;

		var preview = post.preview;	
		if (typeof preview !== 'undefined')
		{
			var videoPreview = preview.reddit_video_preview;
			if (typeof videoPreview !== 'undefined')
			{
				srcURL = videoPreview.fallback_url
			}
		}

		if (!stickied)
		{
			displayCard(cardContainer, srcURL, postURL);
		}	
	}

}

function displayCard(container, url, postURL)
{
	const card = document.createElement('div')
	card.setAttribute('class', 'card')
	container.appendChild(card)

	if (url.endsWith('.jpg') || url.endsWith('.gif'))
	{
		const image = document.createElement('img')
		image.src = url
		image.style.width = '100%'
		image.style.height = '100%'

		card.appendChild(image)
	}

	if (url.endsWith('.gifv') || url.endsWith('.mp4'))
	{
		var newURL = url.replace(".gifv", ".mp4")

		const video = document.createElement('video')
		video.src = newURL
		video.style.width = '100%'
		video.style.height = '100%'
		video.autoplay = true;
		video.muted = true;
		video.loop = true;
		video.controls = true;
		video.buffered = true;

		card.appendChild(video)
	}

	const postButton = document.createElement('a')
	postButton.setAttribute('class', 'mediaButtons')
	postButton.setAttribute('id', 'postButton')
	postButton.href = 'https://reddit.com/' + postURL;
	postButton.target="_blank";
	postButton.rel="noopener noreferrer";
	card.appendChild(postButton);

	const srcButton = document.createElement('a')
	srcButton.setAttribute('class', 'mediaButtons')
	srcButton.setAttribute('id', 'srcButton')
	srcButton.href = url;
	srcButton.target="_blank";
	srcButton.rel="noopener noreferrer";
	card.appendChild(srcButton);

}

$('video').each(function(){
    if ($(this).is(":in-viewport")) {
        $(this)[0].play();
    } else {
        $(this)[0].pause();
    }
})

$(window).scroll(function(){
    if ($(window).scrollTop() >= ($(document).height()-$(window).height() - 200)) {
        alert("We're at the bottom of the page!!");
    }
});