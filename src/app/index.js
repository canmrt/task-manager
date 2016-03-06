import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { DataService } from './components/data/data.service'

angular.module('task-manager', ['ngRoute', 'firebase', 'templates'])
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .constant('URL', 'https://sizzling-fire-364.firebaseio.com/tasks')
  .service('DataService', DataService)
  .controller('MainController', MainController)
  
angular.bootstrap(document, ['task-manager']);

