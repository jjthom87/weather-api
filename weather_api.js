$(document).ready(function(){

	$('img').eq(0).css('height', '160px').css('margin-top', '25px');
	$('img').eq(0).hide();

	var str = "";
	var city;
	$('#city-input').on('keypress', function(e){
		str += e.key;
		if(str.length > 3){
			if(e.key === "Enter"){
				$('img').eq(0).show();
				city = $('#city-input').val().toLowerCase().split(" ").join("+");
				$('#city-input').val("");
				setTimeout(function(){
					$('img').eq(0).hide();
					var apiKey = '';
					var weatherApiUrl = 'http://api.openweathermap.org/data/2.5/weather?appid=' + apiKey + '&units=imperial&q=';
					weatherApiUrl += city;
					$.ajax({
						type: 'GET',
						url: weatherApiUrl,
						success: function(response){
							console.log(response)
							var weatherDiv = $('<div>');
							weatherDiv.addClass('weather-div');
						}
					});
				}, 3000);
			}
		}

	});

});