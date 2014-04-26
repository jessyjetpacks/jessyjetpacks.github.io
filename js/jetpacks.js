$( document ).ready( function () {
	$(".portfolio-nav a").click(function (event) {
		// Clear all existing highlights
		$( ".portfolio-nav a").removeClass("active");
		$( this ).addClass("active");

		console.log("Hey", $(this).attr("href");
	});
});