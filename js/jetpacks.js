$( document ).ready( function () {
	console.log("yo");
	$(".portfolio-nav a").click(function (event) {
		// Clear all existing highlights
		$( ".portfolio-nav a").removeClass("active");
		$( this ).addClass("active");

		console.log("Hey", this);
	})
});