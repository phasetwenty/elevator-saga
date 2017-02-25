var x = {
  init: function(elevators, floors) {
    var allDestinations = [];

    var self = this;
    elevators.forEach(function(elevator, index) {
      elevator._id = index + 1;
      elevator._type = 'Elevator';
      elevator.on('idle', function() {
        self._elevator_idle(elevator, allDestinations);
        self._log('Requested floors: ' + elevator.getPressedFloors(), elevator);
      });
    });

    floors.forEach(function(floor) {
      floor._id = floor.floorNum();
      floor._type = 'Floor';
      floor.on('up_button_pressed', function () {
        self._floor_button_pressed(floor, allDestinations);
        self._log('Global request queue is: ' + allDestinations.toString());
      });
      floor.on('down_button_pressed', function () {
        self._floor_button_pressed(floor, allDestinations);
        self._log('Global request queue is: ' + allDestinations.toString());
      });

      // elevators.forEach(function(elevator, index, arr) {
      //   elevator.on('idle', function() {
      //     floors.forEach(function (floor) {
      //       elevator.goToFloor(floor.floorNum());
      //     });
      //   });
      // });
    });
  },
  update: function(dt, elevators, floors) {
    // We normally don't need to do anything here
  },

  _elevator_idle: function(elevator, allDestinations) {
    this._log('Idle.', elevator);
    var floorNum = allDestinations.shift();
    if (floorNum === undefined) {
      return;
    }
    this._log('Sending elevator to floor ' + floorNum, elevator);
    elevator.goToFloor(floorNum);
  },

  _floor_button_pressed: function(floor, allDestinations) {
    var floorNum = floor.floorNum();
    if (allDestinations.indexOf(floorNum) === -1) {
      allDestinations.push(floorNum);
      this._log('Added ' + floorNum + ' to requested floors.', floor);
    } else {
      this._log('Received a request for ' + floorNum + ' but it\'s already in the queue.', floor);
    }
  },

  _log: function(message, obj) {
    if (obj === undefined) {
      console.log(message);
    } else {
      var type = obj._type;
      var id = obj._id;
      console.log(type + ' ' + id + ': ' + message);
    }
  }
}