/**
 * This is the entry point for our JavaScript program
 */
function main() {

	// initial, default query and spotter
	query = "unc asheville";
	$("#querybox").val("UNC Asheville");
	
	var s = new Spotter("twitter.search",
			{q:query, period:10},
			{buffer:true, bufferTimeout:1000});
			
	registerTweets(s, query);
	s.start();
	
	// search box callback
	$("#searchbutton").click(function() {
		// stop the spotter
		s.stop();
		
		// grab new query from input box
		query = $("#querybox").val();

		// throw away old tweets
		$("#tweets").empty();
		
		// make new spotter with new query
		s = new Spotter("twitter.search",
				{q:query, period:10, lang:"en"},
				{buffer:true, bufferTimeout:1000});
		
		// set it up and start
		registerTweets(s, query);
		s.start();
	});
	
	$("form").submit(function () { return false; });
    
}

function registerTweets(s, q) {
	var tweetarr = [];
	var numtweets = 0;
	
	s.register(function(tweet) {
		console.log(tweet);
	
		// only add stuff if this query (q) is the current query (query)
		if (q === query) {
			var profile_img = "<img class=profilepic src='" + tweet.profile_image_url + "' alt='profile image' />";

			// every other tweet in 'stripe' class, different background
			if (numtweets % 2 === 0)
				var stripe = 'stripe1';
			else
				var stripe = 'stripe2';

			// add tweet to page (and array)
			tweetarr.push(
				$("<div class='tweet " + stripe + " " + q + "'>" 
						+ profile_img 
						+ " <a href='http://www.twitter.com/#!/" + tweet.from_user + "'>" + tweet.from_user_name + ":</a> " 
						+ tweet.text + "</div>")
					.prependTo($("#tweets"))
					.hide()
					.slideDown()
			);

			numtweets++;
			
			// limit to 10 tweets, throw away last one
			if (tweetarr.length > 10) {
				lastTweet = tweetarr.shift();
				lastTweet.slideUp(function() {
					lastTweet.remove();
				});
			}
		}
	});
}

var query;
$(document).ready(function() {
	main();
});

