import { useApi, errorApiRef } from '@backstage/core-plugin-api';

import { githubActionsApiRef } from '../api/GithubActionsApi';
import useAsync from 'react-use/lib/useAsync';

export type Workflows = {
  id: string;
  workflowName: string;
  state: string;
  url: string;
  createdAt: string;
  onRunClick: () => void;
};

export function useWorkflows({
  hostname,
  owner,
  repo,
}: {
  hostname?: string;
  owner: string;
  repo: string;
}) {
  const api = useApi(githubActionsApiRef);

  const errorApi = useApi(errorApiRef);

  const {
    loading,
    value: workflows,
    error,
  } = useAsync(async () => {
    const workflowsData = await api.getWorkflows({
      hostname,
      owner,
      repo,
    });
    // Transformation here
    return workflowsData.data.workflows.map(workflow => ({
        id: `${workflow.id}`,
        workflowName: workflow.name,
        state: workflow.state,
        url: workflow.html_url,
        createdAt: workflow.created_at,
        onRunClick: async () => {
            try {
                await api.runWorkflow({
                    owner,
                    repo,
                    workflow_id: `${workflow.id}`,
                })
            } catch (e: unknown) {
                errorApi.post(
                    new Error(`Failed to run the workflow: ${(e as Error).message}`),
                );
            }
        }
    }));
  }, [repo, owner]);

  return {
      loading,
      workflows,
      projectName: `${owner}/${repo}`,
      error,
    } as const;
}