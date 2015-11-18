app.config(function ($stateProvider) {

    // register review state
    $stateProvider.state('review', {
        url: '/review',
        controller: 'ReviewController',
        templateUrl: 'js/review/review.html',
        resolve: {
					reviewList: function(ReviewFactory) {
						return ReviewFactory.getReviews();
					},
					ratingSpread: function(reviewList){
						var disribution = [0,0,0,0,0];
						reviewList.forEach(function(review) {
							var stars = Math.floor(review.rating);
							disribution[--stars]++;
						});
						return disribution;
					}
        }
    });

});

app.controller('ReviewController', function ($scope, reviewList, ratingSpread, ReviewFactory) {
	$scope.reviews = reviewList;
	$scope.ratingSpread = ratingSpread;
  initChart();


	$scope.sortByStars = function(num){
		if (num) {
			$scope.reviews = reviewList.filter(function(post) {
				return post.rating === num;
			});
		} else {
			$scope.reviews = reviewList;
		}
	};

	$scope.findAverage = function(){
		var sum = 0;
		reviewList.forEach(function(review) {
			sum += review.rating;
		});
		return sum / reviewList.length;
	};

	function initChart() {
		var barData = {};
		barData.labels = ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"];
		barData.datasets = [{
			fillColor: "rgba(220,220,220,0.5)",
			strokeColor: "rgba(220,220,220,0.8)",
			highlightFill: "rgba(220,220,220,0.75)",
			highlightStroke: "rgba(220,220,220,1)",
			data: ratingSpread
		}];
		var context = document.getElementById('starDistChart').getContext('2d');
		var clientsChart = new Chart(context).Bar(barData);
	}
});
