import React from 'react';
import { Entity } from '@backstage/catalog-model';
import { createDevApp } from '@backstage/dev-utils';
import { EntityProvider } from '@backstage/plugin-catalog-react';

import { workflowPlugin, WorkflowPage } from '../src/plugin';
import { GithubActionsApi, githubActionsApiRef } from '../src';

const mockEntity: Entity = {
  apiVersion: 'backstage.io/v1alpha1',
  kind: 'Component',
  metadata: {
    name: 'backstage',
    description: 'backstage.io',
    annotations: {
      'github.com/project-slug': 'backstage/backstage',
      'backstage.io/source-location':
        'url:https://ghes.acme.co/backstage/backstage/tree/master/',
    },
  },
  spec: {
    lifecycle: 'development',
    type: 'website',
    owner: 'user:guest',
  },
};

const mockGithubActionsApi: GithubActionsApi = {
  async getWorkflows() {
    return {} as any;
  },
  async runWorkflow() {
    return {} as any;
  },
};

createDevApp()
  .registerApi({
    api: githubActionsApiRef,
    deps: {},
    factory: () => mockGithubActionsApi,
  })
  .registerPlugin(workflowPlugin)
  .addPage({
    element: (
      <EntityProvider entity={mockEntity}>
        <WorkflowPage />
      </EntityProvider>
    ),
    title: 'Workflows',
    path: '/workflow'
  })
  .render();
