/**
 * This is the entry point for our JavaScript program
 */
function main() {

	// initial, default query and spotter
	query = "unc asheville";
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
				{q:query, period:10},
				{buffer:true, bufferTimeout:1000});
		
		// set it up and start
		registerTweets(s, query);		
		s.start();
	});
	
	$("form").submit(function () { return false; });
    
    
    //3. Make the tweets occur so the most recent are at the top


}

function registerTweets(s, q) {
	var tweetarr = [];
	var numtweets = 0;
	
	s.register(function(tweet) {
		// only add stuff if this query (q) is the current query (query)
		if (q === query) {
			var profile_img = "<img class=profilepic src='" + tweet.profile_image_url + "' alt='profile image' />";

			// every other tweet in 'stripe' class, different background
			if (numtweets % 2 === 0)
				var stripe = 'stripe';
			else
				var stripe = '';

			// add tweet to page (and array)
			tweetarr.push(
				$("<div class='tweet " + stripe + " " + q + "'>" + profile_img + tweet.text + "</div>")
					.prependTo($("#tweets"))
					.hide()
					.slideDown()
			);

			numtweets++;
			
			// limit to 10 tweets, throw away last one
			if (tweetarr.length > 10) {
				lastTweet = tweetarr.shift();
				lastTweet.fadeOut(function() {
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
