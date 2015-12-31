$( document ).ready( function () {
	var gal, title, description;
	var reg = new RegExp("\'", "gim");
	_.each( jetpacksGallery, function(gallery, key) {
		$( "#portfolio-nav" ).append( "<div class='col-sm-4 col-xs-6'><a href='#" + key + "'>" + gallery.title + "</a></div>" );
		gal = $( "<div id='" + key + "' class='row portfolio portfolio-" + key + "'><div class='col-md-12'>"
			+ "<div class='row'><div class='col-md-12'><a name='" + key + "'></a><h3>" + gallery.title + "</h3></div></div>"
			+ "</div></div>" ).appendTo( "#portfolio-gallery" );

		_.each( gallery.pictures, function(picture) {
			title = picture.title ? "<span class=\"picture_title\">" + picture.title.replace(reg, "&#39") + "</span>" : "";
			description = picture.description ? '<span class=\"picture_description\">' + picture.description.replace(reg, "&#39") + '</span>': "";
			gal.append( "<div class='image col-sm-2 col-xs-6'>"
				+ "<a class='image-link' href='img/images/" + picture.source + "' data-title='" + title + description + "'>"
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

	$('.portfolio').each(function() { // the containers for all your galleries
			$(this).magnificPopup({
					delegate: 'a.image-link', // the selector for gallery item
					type: 'image',
					gallery: {
						enabled: true
					},
					image: {
						titleSrc: 'data-title'
					}
			});
	});
});
