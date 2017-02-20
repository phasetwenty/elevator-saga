{
    init: function (elevators, floors) {
        var elevator = elevators[0];
        elevator.on("idle", function () {
            floors.forEach(function (floor) {
                elevator.goToFloor(floor.floorNum());
            });
        });
    },

    update: function (dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}