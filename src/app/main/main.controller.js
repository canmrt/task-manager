/**
 * Glues interface to the firebase array 
 * and keeps this local array in sync with 
 * any changes made to the remote database
 */
export class MainController {
  constructor (DataService, $log, $routeParams) {
    this.$log = $log;
    this.tasks = DataService.tasks;
    this.enum = DataService.enum;
    // set up filter
    let tmp = ($routeParams.filter == 'waiting') ? this.enum[0] : 
              ($routeParams.filter == 'inprogress') ? this.enum[1] : 
              ($routeParams.filter == 'completed') ? this.enum[2] : undefined;
    this.filter = { status : tmp }
  }

  /**
   * Create a new record in the database and add to our local synchronized array.
   */
  addTask() {
    this.tasks.$add({ 
      description : this.newTaskDescription, 
      status : this.enum[0]
    }).then((ref)=>{
      this.$log.info("Task added @ firebase", ref.key());
    });
    // clear input regardless of success, firebase will synchronize anyway
    this.newTaskDescription = ''; 
  }

  /**
   * Remove a task from the database and from the local array
   */
  deleteTask(ref) {
    this.tasks.$remove(ref).then((ref)=>{
      this.$log.info("Task deleted @ firebase", ref.key());
    });
  }

  /**
   * Save an existing, modified local record back to the database
   */
  updateTask(ref) {
    this.tasks.$save(ref).then((ref)=>{
      this.$log.info("Task changed @ firebase", ref.key());
    });
  }
}

MainController.$inject = ['DataService', '$log', '$routeParams'];
