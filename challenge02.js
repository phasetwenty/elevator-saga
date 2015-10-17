{
  init: function(elevators, floors) {
    var elevator = elevators[0];
    var i = 0;
    elevator.on("idle", function() {
        elevator.goToFloor(i++);
        if (i > floors.length) {
          i = 0;
        }
    });
  },
  update: function(dt, elevators, floors) {
    // We normally don't need to do anything here
  }
}