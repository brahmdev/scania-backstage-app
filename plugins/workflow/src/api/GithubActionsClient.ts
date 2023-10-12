/*
 * Copyright 2020 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { readGithubIntegrationConfigs } from '@backstage/integration';
import { ScmAuthApi } from '@backstage/integration-react';
import { GithubActionsApi } from '../types/GithubActionsApi';
import { Octokit, RestEndpointMethodTypes } from '@octokit/rest';
import { ConfigApi } from '@backstage/core-plugin-api';

/**
 * A client for fetching information about GitHub actions.
 *
 * @public
 */
export class GithubActionsClient implements GithubActionsApi {
  private readonly configApi: ConfigApi;
  private readonly scmAuthApi: ScmAuthApi;

  constructor(options: { configApi: ConfigApi; scmAuthApi: ScmAuthApi }) {
    this.configApi = options.configApi;
    this.scmAuthApi = options.scmAuthApi;
  }

  async getOctokit(hostname: string = 'github.com'): Promise<Octokit> {
    const { token } = await this.scmAuthApi.getCredentials({
      url: `https://${hostname}/`,
      additionalScope: {
        customScopes: {
          github: ['repo'],
        },
      },
    });
    const configs = readGithubIntegrationConfigs(
      this.configApi.getOptionalConfigArray('integrations.github') ?? [],
    );
    const githubIntegrationConfig = configs.find(v => v.host === hostname);
    const baseUrl = githubIntegrationConfig?.apiBaseUrl;
    return new Octokit({ auth: token, baseUrl });
  }

  async getWorkflows(options: {
    owner: string;
    repo: string;
    hostname?: string;
  }): Promise<RestEndpointMethodTypes["actions"]["listRepoWorkflows"]["response"]> {
    const { hostname, owner, repo } = options;
    const octokit = await this.getOctokit(hostname);
    return await octokit.actions.listRepoWorkflows({
      owner,
      repo,
    });
  }

  async runWorkflow(options: {
    owner: string;
    repo: string;
    workflow_id: string;
    hostname?: string;
  }): Promise<RestEndpointMethodTypes["actions"]["createWorkflowDispatch"]["response"]> {
    const { hostname, workflow_id, owner, repo } = options;

    const octokit = await this.getOctokit(hostname);
    const workflows = await octokit.actions.createWorkflowDispatch({
      owner,
      repo,
      workflow_id,
      ref: 'main'
    });

    return workflows;
  }
}