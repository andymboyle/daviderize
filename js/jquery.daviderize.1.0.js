/*
 * jQuery daviderize Plugin 1.0
 * Basically a hack of davidize
 * http://zurb.com/playground/jquery-davidize
 * Copyright 2010, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * Check me out at http://www.andymboyle.com
*/


(function($) {

    $.fn.daviderize = function(options) {

        //Yo' defaults
        var defaults = {  
            enterOn: 'click', //timer, konami-code, click
            delayTime: 5000 //time before david attacks on timer mode
            };  
        
        //Extend those options
        var options = $.extend(defaults, options); 
	
        return this.each(function() {

			var _this = $(this);
			var audioSupported = false;
			//Stupid Browser Checking which should be in jQuery Support
			if ($.browser.mozilla && $.browser.version.substr(0, 5) >= "1.9.2" || $.browser.webkit) { 
				audioSupported = true;
			}
			
			//david Vars
			var davidImageMarkup = '<img id="eldavid" style="display: none" src="img/eads_cut.png" />'
			var davidAudioMarkup = '<audio id="eldavidShriek" preload="auto"><source src="sound/david-sound.mp3" /><source src="sound/david-sound.ogg" /></audio>';	
			var locked = false;
			
			//Append david and Style
			$('body').append(davidImageMarkup);
 			if(audioSupported) { $('body').append(davidAudioMarkup); }
			var david = $('#eldavid').css({
				"position":"fixed",
				"bottom": "-300px",
				"right" : "0",
				"display" : "block"
			})
			
			// Animating Code
			function init() {
				locked = true;
			
				//Sound Hilarity
				if(audioSupported) { 
					function playSound() {
						document.getElementById('eldavidShriek').play();
					}
					playSound();
				}
								
				// Movement Hilarity	
				david.animate({
					"bottom" : "0"
				}, function() { 			
					$(this).animate({
						"bottom" : "-10px"
					}, 100, function() {
						var offset = (($(this).position().left)+400);
						$(this).delay(300).animate({
							"right" : offset
						}, 2200, function() {
							david = $('#eldavid').css({
								"bottom": "-700px",
								"right" : "0"
							})
							locked = false;
						})
					});
				});
			}
			
			
			//Determine Entrance
			if(options.enterOn == 'timer') {
				setTimeout(init, options.delayTime);
			} else if(options.enterOn == 'click') {
				_this.bind('click', function(e) {
					e.preventDefault();
					if(!locked) {
						init();
					}
				})
			} else if(options.enterOn == 'konami-code'){
			    var kkeys = [], konami = "38,38,40,40,37,39,37,39,66,65";
			    $(window).bind("keydown.davidz", function(e){
			        kkeys.push( e.keyCode );
			        if ( kkeys.toString().indexOf( konami ) >= 0 ) {
			        	init();
			        	$(window).unbind('keydown.davidz');
			        }
			    }, true);
	
			}
			
        });//each call
    }//orbit plugin call
})(jQuery);

