$( document ).ready( function () {
	var gal;
	_.each( jetpacksGallery, function( gallery, key ) {
		$( "#portfolio-nav" ).append( "<div class='col-sm-4 col-xs-6'><a href='#" + key + "'>" + gallery.title + "</a></div>" );
		gal = $( "<div id='" + key + "' class='row portfolio portfolio-" + key + "'><div class='col-md-12'>"
			+ "<div class='row'><div class='col-md-12'><a name='" + key + "'></a><h3>" + gallery.title + "</h3></div></div>"
			+ "</div></div>" ).appendTo( "#portfolio-gallery" );

		_.each( gallery.pictures, function( picture ) {
			gal.append( "<div class='image col-sm-2 col-xs-6'>"
				+ "<a href='img/images/" + picture.source + "'>"
				+ "<img src='img/thumbnails/" + picture.source + "'>"
				+ "</a></div>" );
		})
	});

	$( ".portfolio-nav a" ).click( function (event) {

		event.preventDefault();
		var href = $( this ).attr( "href" );
		console.log( href );

		if ( $( this ).hasClass( "active" ) ) {
			$( this ).removeClass( "active" );
			$( ".portfolio" ).slideDown();
		} else {
			$( ".portfolio" ).not( href ).slideUp();
			$( href ).slideDown();
			$( ".portfolio-nav a" ).removeClass( "active" );
			$( this ).addClass( "active" );
		}
	});
});