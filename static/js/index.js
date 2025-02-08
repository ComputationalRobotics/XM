window.HELP_IMPROVE_VIDEOJS = false;

var NUM_INTERP_FRAMES = 100;

var interpImagesDict = {}; // 用于存储不同 INTERP_BASE 的图片数组

function preloadInterpolationImages(INTERP_BASE) {
  // 如果该 INTERP_BASE 已经存在，则不需要重新加载
  if (interpImagesDict[INTERP_BASE]) return;

  interpImagesDict[INTERP_BASE] = []; // 创建新的数组

  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = "./static/interpolation/" + INTERP_BASE + "/stacked/" + String(i).padStart(6, '0') + '.jpg';
    var img = new Image();
    img.src = path;
    interpImagesDict[INTERP_BASE].push(img);
  }
}

function setInterpolationImage(INTERP_BASE, i, index) {
  var images = interpImagesDict[INTERP_BASE]; // 获取对应的图片数组
  if (!images || !images[i]) return; // 如果图片未加载，则不进行更新

  var image = images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper-' + String(index)).empty().append(image);
}


$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 1,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    preloadInterpolationImages("replica1");

    $('#interpolation-slider-1').on('input', function(event) {
      setInterpolationImage("replica1",this.value,1);
    });
    setInterpolationImage("replica1",0,1);
    $('#interpolation-slider-1').prop('max', NUM_INTERP_FRAMES - 1);

    preloadInterpolationImages("replica2");

    $('#interpolation-slider-2').on('input', function(event) {
      setInterpolationImage("replica2",this.value,2);
    });
    setInterpolationImage("replica2",0,2);
    $('#interpolation-slider-2').prop('max', NUM_INTERP_FRAMES - 1);

    bulmaSlider.attach();

})
