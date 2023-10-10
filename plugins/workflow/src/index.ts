export { workflowPlugin, WorkflowPage } from './plugin';
export * from './api';
export {
    Router,
    isGithubActionsAvailable,
    isGithubActionsAvailable as isPluginApplicableToEntity,
  } from './components/Router';
export { GITHUB_ACTIONS_ANNOTATION } from './components/getProjectNameFromEntity';
