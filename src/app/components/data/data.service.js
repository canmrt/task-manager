export class DataService {
  constructor($firebaseArray, URL, $log){
    DataService.$inject = ['$firebaseArray', 'URL', '$log'];
    let fb = new Firebase(URL);
    this.$log = $log;
    this.tasks = $firebaseArray(fb);
    this.tasks.$loaded().then(()=>{
      $log.info("Tasks loaded from Firebase")
    });
    this.enum = ["waiting", "in progress", "completed"];
  }
}