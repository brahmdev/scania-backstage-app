import { GithubActionsClient } from "./GithubActionsClient";
import { ConfigApi } from '@backstage/core-plugin-api';

const mockListRepoWorkflows = jest.fn(() => {});
const mockCreateWorkflowDispatch = jest.fn(() => {});
jest.mock('@octokit/rest', () => ({
    Octokit: jest.fn(() => ({ 
        actions: {
            listRepoWorkflows: mockListRepoWorkflows,
            createWorkflowDispatch: mockCreateWorkflowDispatch,
        }
     })),
  }));
  

describe("GithubActionsClint Test", () => {

    let githubActionsClient: any;

    beforeEach(() => {
        githubActionsClient = new GithubActionsClient({ 
            configApi: {
                getOptionalConfigArray: jest.fn(),
              } as unknown as ConfigApi, 
            scmAuthApi: {
                getCredentials: jest.fn().mockReturnThis()
            },
        });
    });

    it("Test getWorkflows", async() => {
        await githubActionsClient.getWorkflows({
            hostname: "somehost",
            owner: "someowner",
            repo: "somerepo",
        });
        expect(mockListRepoWorkflows).toHaveBeenCalledTimes(1);
        expect(mockListRepoWorkflows).toHaveBeenCalledWith({
            owner: "someowner",
            repo: "somerepo",
        })
    });

    it("Test runWorkflow", async() => {
        await githubActionsClient.runWorkflow({
            hostname: "somehost",
            owner: "someowner",
            repo: "somerepo",
            workflow_id: "someId",
        });
        expect(mockCreateWorkflowDispatch).toHaveBeenCalledTimes(1);
        expect(mockCreateWorkflowDispatch).toHaveBeenCalledWith({
            owner: "someowner",
            repo: "somerepo",
            workflow_id: "someId",
            ref: 'main'
        })
    });
});