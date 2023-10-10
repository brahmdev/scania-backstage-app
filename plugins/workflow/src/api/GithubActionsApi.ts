import { RestEndpointMethodTypes } from '@octokit/rest';
import { createApiRef } from '@backstage/core-plugin-api';

/** @public */
export const githubActionsApiRef = createApiRef<GithubActionsApi>({
  id: 'workflow',
});

/**
 * A client for fetching information about GitHub actions.
 *
 * @public
 */
export type GithubActionsApi = {
  getWorkflows: (options: {
    hostname?: string;
    owner: string;
    repo: string;
  }) => Promise<RestEndpointMethodTypes["actions"]["listRepoWorkflows"]["response"]>;

  runWorkflow(options: {
    owner: string;
    repo: string;
    workflow_id: string;
    hostname?: string;
  }): Promise<RestEndpointMethodTypes["actions"]["createWorkflowDispatch"]["response"]>;
};
