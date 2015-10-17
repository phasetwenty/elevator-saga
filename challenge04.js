{
  init: function(elevators, floors) {
    elevators.forEach(function(elevator, index, arr) {
      var i = 0;
      elevator.on("idle", function() {
        elevator.goToFloor(i++);
        if (i > floors.length) {
          i = 0;
        }
      });
    });
  }
  update: function(dt, elevators, floors) {
    // We normally don't need to do anything here
  }
}