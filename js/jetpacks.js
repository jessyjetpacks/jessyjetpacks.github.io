$( document ).ready( function () {
	var gal, title, description, href, thumbnail;
	var reg = new RegExp("\'", "gim");
	_.each( jetpacksGallery, function(gallery, key) {
		$( "#portfolio-nav" ).append( "<div class='col-sm-4 col-xs-6'><a href='#" + key + "'>" + gallery.title + "</a></div>" );
		gal = $( "<div id='" + key + "' class='row portfolio " + (gallery.type || 'image') + "'><div class='col-md-12'>"
			+ "<div class='row'><div class='col-md-12'><a name='" + key + "'></a><h3>" + gallery.title + "</h3></div></div>"
			+ "</div></div>" ).appendTo( "#portfolio-gallery" );

		_.each( gallery.pictures, function(picture) {
			title = picture.title ? "<span class=\"picture_title\">" + picture.title.replace(reg, "&#39") + "</span>" : "";
			description = picture.description ? '<span class=\"picture_description\">' + picture.description.replace(reg, "&#39") + '</span>': "";
			if (!gallery.type) {
				href = "img/images/" + picture.source;
				thumbnail = "img/thumbnails/" + picture.source;
			} else if (gallery.type === 'video') {
				if (picture.youtube) {
					href = "https://www.youtube.com/watch?v=" + picture.youtube;
					if (!picture.thumbnail) thumbnail = "http://img.youtube.com/vi/" + picture.youtube + "/0.jpg";
				}
			}
			gal.append("<div class='image col-sm-2 col-xs-6'>"
				+ "<a class='image-link' href='" + href + "' data-title='" + title + description + "'>"
				+ "<img src='" + thumbnail + "'>"
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

	$('.portfolio.image').each(function() {
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
	$('.portfolio.video').each(function() {
		$(this).magnificPopup({
			delegate: 'a.image-link', // the selector for gallery item
			type: 'iframe',
			gallery: {
				enabled: true
			},
			disableOn: 700,
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: false,
			image: {
				titleSrc: 'data-title'
			}
		});
	});
});
