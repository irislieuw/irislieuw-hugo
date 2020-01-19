(function () {

	// default values
	const defaults = {
		transition_duration: 800,
		aboutMeSvg: "geo-map-svg",
		aboutMeChart: "aboutme-geo-map"
	};

	chart = document.getElementById(defaults.aboutMeChart);

	var focusCity = prevCity = -1;

	// data: [lon, lat]
	var citieslived = [
		{name: "Chino Hills", data: [-117.7326, 33.9898]},
		{name: "Claremont", data: [-117.7198, 34.0967]},
		{name: "San Francisco", data: [-122.4196396, 37.7771187]},
		{name: "Seattle", data:[-122.335167, 47.608013]}
	]

	const type = d3.annotationCallout;

	const annotations = citieslived.map(function(x) {
		return {
			note: {
				title: x.name
			},
			data: x.data,
			dy: -50,
			dx: 10
		}
	})

	function drawGeoMap(url) {

		clearGeoMap();

		w = chart.parentElement.clientWidth;
        defaults.width = w <= 768 ? w : w / 1.75;
		defaults.height = Math.min(defaults.width, window.innerHeight / 1.3);
		defaults.waypoint_offset = w <= 768 ? defaults.height + "px" : "15%";

		var svg = d3.select(`#${defaults.aboutMeChart}`)
			.append("svg")
			.attr("id", defaults.aboutMeSvg)
			.attr("width", defaults.width)
			.attr("height", defaults.height);

		svg.append("rect")
			.attr("class", "geo-map-background")
			.attr("width", defaults.width)
			.attr("height", defaults.height);

		var g = svg.append("g");

		var projection = d3.geoAlbersUsa()
			.scale(defaults.width)
			.translate([defaults.width / 2, defaults.height / 2]);

		var path = d3.geoPath()
			.projection(projection);

		d3.json(url, function(error, us) {

			if (error) throw error;

			g.append("g")
				.attr("class", "counties")
				.selectAll("path")
				// .data(topojson.feature(us, us.objects.counties).features)
				.data(topojson.feature(us, us.objects.states).features)
				.enter().append("path")
				.attr("d", path);

			g.selectAll("circle")
				.data(citieslived)
				.enter()
				.append("circle")
				.attr("cx", function(d) {return projection(d.data)[0];})
				.attr("cy", function(d) { return projection(d.data)[1];})
				.attr("r", "0.5%")
				.attr("class", "circle circle-hidden")
				.attr("id", function(d,i) {return "lived-" + i});

			const makeAnnotations = d3.annotation()
				.type(type)
				.accessors({
					x: d => projection(d)[0],
					y: d => projection(d)[1]
				})
				.annotations(annotations)

			// TODO fix blip when annotations draw and then become hidden
			g.append("g")
				.attr("class", "geo-map-annotations")
				.call(makeAnnotations)
				.selectAll(".annotations").selectAll(".annotation")
				.classed("ann-hidden", true)
				.attr("id", function(d, i) {return "ann-"+i});

		});

		function center(focusCity) {
			var centroid = projection(citieslived[focusCity].data)
			x = centroid[0];
			y = centroid[1];
			k = 3;

			focus(x, y, k, focusCity)
		}

		function reset() {
			x = defaults.width / 2;
		    y = defaults.height / 2;
		    k = 1;

		   focus(x, y, k, -1)
		}

		function focus(x, y, k, focusCity) {
			var translate = {
				width: (defaults.width / 2),
				height: (defaults.height / 2)
			}

			g.selectAll("path")
				.classed("active", function(d) {return true})

			g.selectAll("circle")
				.classed("circle-hidden", true);

			g.selectAll(".annotations").selectAll(".annotation")
				.classed("ann-hidden", true);


			if (k > 1) {
				g.select(`#lived-${focusCity}`)
					.classed("circle-hidden", false);

				g.select(`#ann-${focusCity}`)
					.classed("ann-hidden", false);

				translate.width = defaults.width / 3;
				translate.height = defaults.height / 1.5;
			}

			g.transition()
				.duration(defaults.transition_duration)
				.attr("transform", "translate(" + translate.width + "," + translate.height + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
				.style("stroke-width", 1.5 / k + "px");
		}

		var resizeBool;

		function resize() {
			clearTimeout(resizeBool);
			resizeBool = setTimeout(drawGeoMap("https://gist.githubusercontent.com/mbostock/4090846/raw/d534aba169207548a8a3d670c9c2cc719ff05c47/us.json"), 600);
			drawGeoMap("https://gist.githubusercontent.com/mbostock/4090846/raw/d534aba169207548a8a3d670c9c2cc719ff05c47/us.json");
		}

		d3.select(window).on("resize", resize);

		// **************************
		// Waypoint handlers below
		// **************************

		// Reset geo-map
		new Waypoint({
			element: document.getElementById('map-loc--1'),
			handler: function(direction) {
				reset()
			},
			offset: defaults.waypoint_offset
		})

		// Focus on lived cities
		citieslived.forEach(function(element, i) {
			new Waypoint({
				element: document.getElementById(`map-loc-${i}`),
				handler: function(direction) {
					center(i)
				},
				offset: defaults.waypoint_offset
			})
		})
	}



	function clearGeoMap(){
		d3.select("#" + defaults.aboutMeSvg).remove();
	}


	// TODO figure out how to draw world or us map given a few args
	//    - updae
	// Draw CitiesLived map
	drawGeoMap("https://gist.githubusercontent.com/mbostock/4090846/raw/d534aba169207548a8a3d670c9c2cc719ff05c47/us.json");

})();
