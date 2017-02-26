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
    });
  },

  update: function(dt, elevators, floors) {
    // We normally don't need to do anything here
  },

  _elevator_floor_button_pressed: function(elevator, floorNum, allDestinations) {
    this._log('Elevator floor button pressed.');

    var nextFloor = this._pick_a_floor(elevator, allDestinations);
    elevator.goToFloor(nextFloor);
    this._log('Sending elevator to floor ' + nextFloor, elevator);
  },

  _elevator_idle: function(elevator, allDestinations) {
    this._log('Idle.', elevator);

    var floorNum = this._pick_a_floor(elevator, allDestinations);

    if (floorNum === undefined) {
      this._log('Nothing to do.', elevator);
      return;
    }

    elevator.goToFloor(floorNum);
    this._log('Sending elevator to floor ' + floorNum, elevator);
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

  /**
   *
   * @param elevator Elevator instance to decide a destination for.
   * @param passengerLocations Array of floor numbers where passengers have pressed up or down.
   * @param directionToCheck "up" or "down", the direction to look for destinations.
   * @private
   **/
  _get_next_destination: function(elevator, passengerLocations, directionToCheck) {
    var currentDirection = elevator.destinationDirection(), currentFloor = elevator.currentFloor();
  },

  _pick_a_floor: function(elevator, allDestinations) {
    var floorNum = undefined;
    [elevator.destinationQueue, allDestinations].some(function(queue) {
      floorNum = queue.shift();
      return floorNum !== undefined;
    });
    return floorNum;
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