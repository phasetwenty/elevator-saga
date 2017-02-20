{
  init: function(elevators, floors) {
    var allDestinations = [];

    var self = this;
    elevators.forEach(function(elevator, index) {
      elevator._id = index + 1;
      elevator.on('idle', function() {
        self._elevator_idle(elevator, allDestinations);
        console.log('Requested floors: ' + elevator.getPressedFloors());
      });
    });

    floors.forEach(function(floor) {
      floor.on('up_button_pressed', function() {
        self._floor_button_pressed(floor, allDestinations);
        console.log('Global request queue is: ' + allDestinations.toString());
      });
      floor.on('down_button_pressed', function() {
        self._floor_button_pressed(floor, allDestinations);
        console.log('Global request queue is: ' + allDestinations.toString());
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

  _elevator_idle: function(elevator, allDestinations) {
    var floorNum = allDestinations.shift();
    if (floorNum === undefined) {
      return;
    }
    console.log('Sending elevator to floor ' + floorNum);
    elevator.goToFloor(floorNum);
  },

  _floor_button_pressed: function(floor, allDestinations) {
    var floorNum = floor.floorNum();
    if (allDestinations.indexOf(floorNum) === -1) {
      allDestinations.push(floorNum);
      console.log('Added ' + floorNum + ' to requested floors.');
    } else {
      console.log('Received a request for ' + floorNum + ' but it\'s already in the queue.');
    }
  }
}