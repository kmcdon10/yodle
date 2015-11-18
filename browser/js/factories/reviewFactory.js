app.factory('ReviewFactory', function($http) {

    function getReviews() {
        return $http.get('/api/reviews/')
        .then(function(response) {
            return response.data;
        });
    };

    function getReview(review) {
        return $http.get('/api/reviews/' + review._id)
        .then(review => {
            return response.data;
        });
    };

    function deleteReview(product){
        return $http.delete('/api/reviews/' + product._id)
        .then(review => {
            return response.data;
        });
    };

    return {
        getReviews: getReviews,
        getReview: getReview,
        deleteReview: deleteReview,
    };
});
