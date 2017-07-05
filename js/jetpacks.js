var _MONTH_NUM = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function num2month(num) {
	return _MONTH_NUM[num-1];
}

function clearTheStage() {
	$("#portfolio-nav").html("");
	$("#portfolio-gallery").html("");
}

function lightBoxInit() {
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
}

function newGallery(title, key, type) {
	return $( "<div id='" + key + "' class='row portfolio " + (type || 'image') + "'><div class='col-md-12'>"
		+ "<div class='row'><div class='col-md-12'><a name='" + key + "'></a><h3>" + title + "</h3></div></div>"
		+ "</div></div>" ).appendTo( "#portfolio-gallery" );
}

function gallerySort(pictures) {
	pictures = pictures || [];
	return pictures.sort(function(a, b) {
		if (a.year > b.year) return -1;
		if (a.year < b.year) return 1;
		if (a.month > b.month) return -1;
		if (a.month < b.month) return 1;
		if (_.isString(a.title) && _.isString(b.title) && a.title.toLowerCase() > b.title.toLowerCase()) return 1;
		return 0;
	});
}

function newPicture(galleryHTML, picture, galleryType) {
	var title, date, description, href, thumbnail;
	var reg = new RegExp("\'", "gim");

	title = picture.title ? "<span class=\"picture_title\">" + picture.title.replace(reg, "&#39") + "</span>" : "";
	date = "<span class=\"picture_date\">( " + num2month(picture.month) + " " + picture.year + " )</span>";
	description = picture.description ? '<span class=\"picture_description\">' + picture.description.replace(reg, "&#39") + '</span>': "";

	if (!galleryType) {
		href = "img/images/" + picture.source;
		thumbnail = "img/thumbnails/" + picture.source;
	}

	else if (galleryType === 'video') {
		if (picture.youtube) {
			href = "https://www.youtube.com/watch?v=" + picture.youtube;
			if (!picture.thumbnail) thumbnail = "http://img.youtube.com/vi/" + picture.youtube + "/0.jpg";
			else thumbnail = "img/thumbnails/" + picture.thumbnail;
		}
	}

	galleryHTML.append("<div class='image col-sm-2 col-xs-6'>"
		+ "<a class='image-link' href='" + href + "' data-title='" + title + date + description + "'>"
		+ "<img src='" + thumbnail + "'>"
		+ "</a></div>" );
}

function newAudio(galleryHTML, src) {
  if (src.manual) {
    galleryHTML.append('<div class="col-sm-6 col-xs-12">' +
      '<div class="manual-audio-box"><img src="img/images/' + src.thumbnail + '">' +
      '<div><h2>' + src.title +'</h2>' +
      '<div class="description">' + src.description + '</div>' +
      (src.shopURL ? '<a class="shopping-link" href="shop.html#' + src.shopURL + '">&gt;&gt; Buy in the shop</a>' : '') +
      '</div></div>');
  } else {
    // Assume soundcloud
    galleryHTML.append('<div class="col-sm-6 col-xs-12">' +
      '<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + src.source + '&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>' +
      '</div>');
  }
}

function showByMedia() {
	var gal;

	clearTheStage();

	_.each( jetpacksGallery, function(gallery, key) {
		$( "#portfolio-nav" ).append( "<div class='col-sm-4 col-xs-6'><a href='#" + key + "'>" + gallery.title + "</a></div>" );

		gal = newGallery(gallery.title, key, gallery.type);

		gallerySort(gallery.pictures).forEach(function(picture) {
			newPicture(gal, picture, gallery.type);
		});
	});

	// Portfolio media selector
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

	lightBoxInit();
}

function showByDate() {
	var images = [];
	var year = "";
	var gal;

	clearTheStage();

	_.each( jetpacksGallery, function(gallery, key) {
		images = images.concat(gallery.pictures);
	});

	gallerySort(images).forEach(function(image) {
		if (image.year != year) {
			year = image.year;
			gal = newGallery(year, year);
		}

		newPicture(gal, image);
	});

	lightBoxInit();
}

function renderPortfolio() {
	showByMedia();

	// Portfolio date/media selector
	$( ".sort-button" ).click(function (event) {
		if (!$(this).hasClass("selected")) {
			$(".sort-button").removeClass("selected");
			$(this).addClass("selected");

			if ( $(this).hasClass("sort-by-date") ) {
				showByDate();
			} else {
				showByMedia();
			}
		}
	});
}

function renderAudio() {
	var music = [];
	var year = "";
	var gal;

	clearTheStage();

	gal = newGallery("", "");

	gallerySort(jetpacksGallery).forEach(function(src) {
		newAudio(gal, src);
	});
}



/* Deprecated
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
*/
