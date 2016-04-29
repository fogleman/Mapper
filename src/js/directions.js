var DirectionsCache = function() {
    this.cache = {};
    this.listeners = [];
};

DirectionsCache.prototype = {
    getDirections: function(a, b) {
        if (a.toUrlValue(3) === b.toUrlValue(3)) {
            return null;
        }
        var key = a.toUrlValue(3) + "|" + b.toUrlValue(3);
        if (this.cache[key] !== undefined) {
            return this.cache[key];
        }
        this.cache[key] = null;
        this.loadDirections(a, b, function(response) {
            this.cache[key] = response;
            this.listeners.forEach(function(listener) {
                listener();
            });
        }.bind(this));
        return null;
    },
    loadDirections: function(a, b, callback) {
        var request = {
            origin: a,
            destination: b,
            travelMode: google.maps.TravelMode.DRIVING,
            optimizeWaypoints: false,
        };
        var directionsService = new google.maps.DirectionsService();
        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                callback(response);
            } else {
                // callback(undefined);
            }
        });
    },
};

module.exports = new DirectionsCache();
