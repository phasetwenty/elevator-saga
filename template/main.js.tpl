var x = {
  init: function(elevators, floors) {
    {{ log_definition|no_exports }}
    this._logger = new Logger(console);
  },

  update: function(dt, elevators, floors) {
    // We normally don't need to do anything here
  }
};
