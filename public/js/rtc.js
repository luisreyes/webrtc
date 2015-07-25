var rtc = rtc || {};

rtc.core = (function(){
	'use strict';
	var ui = {}, _stream;

	function _init(){
		
		// Initialize GUM
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

		// Initialize UI Elements
		ui.stopBtn = document.querySelector('#stopBtn');
		ui.activateBtn = document.querySelector('#activateBtn');
		ui.activeLbl = document.querySelector('#activeLbl');
		ui.activeLbl.innerHTML = 'Inactive';

		if(navigator.getUserMedia){
			ui.activateBtn.addEventListener('click', requestUserMedia);	
			ui.stopBtn.addEventListener('click', stopUserMedia);	
		}else{
			ui.activateBtn.setAttribute('disabled','');
			ui.activateBtn.setAttribute('value','Not Available');
		}
		
		
	}

	function stopUserMedia(){
		if(_stream){
			_stream.stop();
		}

	}

	function requestUserMedia(){
		

		if (navigator.getUserMedia) {
		   navigator.getUserMedia({ audio: false, video: { width: 1280, height: 720 } },
		      function(stream) {
		      	 _stream = stream;
		         var video = document.querySelector('video');
		         video.src = window.URL.createObjectURL(stream);

		         ui.activeLbl.innerHTML = 'Active';
				apollo.toggleClass(ui.stopBtn, 'hidden');
				apollo.toggleClass(ui.activateBtn, 'hidden');
		         
		         stream.addEventListener('active', function(){
		         	ui.activeLbl.innerHTML = 'Active';
		         	apollo.toggleClass(ui.stopBtn, 'hidden');
		         	apollo.toggleClass(ui.activateBtn, 'hidden');
		         });

		         stream.addEventListener('inactive', function(){
		         	ui.activeLbl.innerHTML = 'Inactive';
		         	apollo.toggleClass(ui.stopBtn, 'hidden');
		         	apollo.toggleClass(ui.activateBtn, 'hidden');
		         });

		         video.onloadedmetadata = function(e) {
		           video.play();
		         };
		      },
		      function(err) {
		         console.log("The following error occured: " + err.name);
		      }
		   );
		} else {
		   console.log("getUserMedia not supported");
		}
	}

	return{
		init: _init
	};
})()

rtc.core.init();