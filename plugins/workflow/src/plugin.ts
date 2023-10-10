import { githubActionsApiRef, GithubActionsClient } from './api';

import { configApiRef, createApiFactory, createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';
import { scmAuthApiRef } from '@backstage/integration-react';

import { rootRouteRef } from './routes';

export const workflowPlugin = createPlugin({
  id: 'workflow',
  apis: [
    createApiFactory({
      api: githubActionsApiRef,
      deps: { configApi: configApiRef, scmAuthApi: scmAuthApiRef },
      factory: ({ configApi, scmAuthApi }) =>
        new GithubActionsClient({ configApi, scmAuthApi }),
    }),
  ],
  routes: {
    root: rootRouteRef,
  },
});

export const WorkflowPage = workflowPlugin.provide(
  createRoutableExtension({
    name: 'WorkflowPage',
    component: () =>
      import('./components/WorkflowsComponent').then(m => m.WorkflowsComponent),
    mountPoint: rootRouteRef,
  }),
);
