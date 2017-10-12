$(document).ready(function(){

	$('img').eq(0).css('height', '160px').css('margin-top', '25px');
	$('img').eq(0).hide();


	var weatherObj = [
		{
			main: "Clouds"
		},
		{

		}
	]


	var str = "";
	var city;
	$('#city-input').on('keypress', function(e){
		str += e.key;
		if(str.length > 3){
			if(e.key === "Enter"){
				$('img').eq(0).show();
				city = $('#city-input').val().toLowerCase().split(" ").join("+");
				$('#city-input').val("");
				$('.weather-div').remove();
				setTimeout(function(){
					$('img').eq(0).hide();
					var apiKey = '275d5dfdea53a2d3e3869f48d154e9ac';
					var weatherApiUrl = 'http://api.openweathermap.org/data/2.5/weather?appid=' + apiKey + '&units=imperial&q=';
					weatherApiUrl += city;
					$.ajax({
						type: 'GET',
						url: weatherApiUrl,
						success: function(response){
							console.log(response)
							var weatherDiv = $('<div>');
							weatherDiv.addClass('weather-div progress');
							var gaugeDiv = $('<div id="gauge-div" role="progressbar" aria-valuenow="' + response.main.temp + '" aria-valuemin="0" aria-valuemax="100" style="width:' + response.main.temp + '%">');
							gaugeDiv.addClass("progress-bar progress-bar-" + colorWeatherMatcher(response.main.temp));
							gaugeDiv.text(Math.floor(response.main.temp) + "\xB0 F");
							weatherDiv.append(gaugeDiv).append("<br>");
							$(".weather-temp").append(weatherDiv)
						}
					});
				}, 3000);
			}
		}

	});

	function colorWeatherMatcher(temp){
		if (temp < 50){
			return "info";
		} else if (temp < 75){
			return "warning";
		} else {
			return "danger";
		}
	};

});