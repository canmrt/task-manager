export function config ($logProvider) {
  // Enable log
  $logProvider.debugEnabled(true);
}
config.$inject = ['$logProvider'];
