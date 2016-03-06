export function routerConfig ($routeProvider) {
  'ngInject';
  var config = {
    templateUrl: 'app/main/main.html',
    controller: 'MainController',
    controllerAs: 'main'
  }
  
  $routeProvider
    .when('/', config)
    .when('/:filter', config)
    .otherwise({
      redirectTo: '/'
    });
}
routerConfig.$inject = ['$routeProvider'];
