{
  init: function(elevators, floors) {
    window._allDestinations = [];

    var self = this;
    floors.forEach(function(floor, index) {
      floor.on('up_button_pressed', function() {
        self._floor_button_pressed(floor);
        console.log('Global request queue is: ' + window._allDestinations.toString());
      });
      floor.on('down_button_pressed', function() {
        self._floor_button_pressed(floor);
        console.log('Global request queue is: ' + window._allDestinations.toString());
      });
    });
    // elevators.forEach(function(elevator, index, arr) {
    //   elevator.on('idle', function() {
    //     floors.forEach(function (floor) {
    //       elevator.goToFloor(floor.floorNum());
    //     });
    //   });
    // });
  },
  update: function(dt, elevators, floors) {
    // We normally don't need to do anything here
  },

  _floor_button_pressed: function(floor) {
    var floorNum = floor.floorNum();
    if (window._allDestinations.indexOf(floorNum) === -1) {
      window._allDestinations.push(floorNum);
      console.log('Added ' + floorNum + ' to requested floors.');
    } else {
      console.log('Received a request for ' + floorNum + ' but it\'s already in the queue.');
    }
  }
}