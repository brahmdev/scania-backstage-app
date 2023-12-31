import React from "react";
import { RenderHookResult, renderHook } from '@testing-library/react-hooks';
import { TestApiProvider } from '@backstage/test-utils';
import { CatalogApi } from '@backstage/catalog-client';
import { ErrorApi, createApiRef, errorApiRef } from '@backstage/core-plugin-api';

import { useWorkflows } from '../useWorkflows';
import { GithubActionsApi, githubActionsApiRef } from "../../types/GithubActionsApi";
import { waitFor } from "@testing-library/react";
import { getMockErrorApi, getMockGithubActionsApi } from "../../utils/__tests__/api.mock";

/**
 * The API reference for the {@link @backstage/catalog-client#CatalogApi}.
 * @public
 */
export const catalogApiRef = createApiRef<CatalogApi>({
  id: 'plugin.catalog.service',
});

type PropsTypes = {
  hostname?: string;
  owner: string;
  repo: string;
}
type Workflow = { 
  id: string; 
  workflowName: string; 
  state: "active" | "deleted" | "disabled_fork" | "disabled_inactivity" | "disabled_manually"; 
  url: string; 
  createdAt: string; 
  onRunClick: () => Promise<void>;
};
type ResultType = { 
  loading: boolean,
  workflows: Workflow[] | undefined,
  projectName: string,
  error: Error | undefined,
};

const mockRunWorkflow = jest.fn();
const mockErrorApiPost = jest.fn();

const Wrapper = (props: { children?: React.ReactNode }) => (
  <TestApiProvider
    apis={[
      [githubActionsApiRef, getMockGithubActionsApi(mockRunWorkflow)],
      [errorApiRef, getMockErrorApi(mockErrorApiPost)]
    ]}
  >
    {props.children}
  </TestApiProvider>
);

describe("useWorkflows", () => {
  let renderResult: RenderHookResult<PropsTypes, ResultType>;

  beforeEach(async() => {
    await waitFor(() => {
      renderResult = renderHook<PropsTypes, ResultType>(() => useWorkflows({
        hostname: "github.com",
        owner: "someowner",
        repo: "somerepo",
      }), {
        wrapper: Wrapper
      });
    })
  });

  it("returns workflows correctly", async () => {
    const { result } = renderResult;
    await waitFor(() => {
      const { current: { workflows, loading, projectName, error } } = result;
      expect(loading).toBeFalsy();
      expect(workflows).toHaveLength(1);
      expect(workflows?.at(0)?.workflowName).toEqual("workflow-1");
      expect(projectName).toEqual("someowner/somerepo");
      expect(error).toBeUndefined();
    });
  });

  it("runs workflow when manually triggered", async () => {
    const { result } = renderResult;
    await waitFor(() => {
      const { current: { workflows, loading, error } } = result;
      expect(loading).toBeFalsy();
      expect(workflows).toHaveLength(1);

      //trigger workflow manually
      workflows?.at(0)?.onRunClick();

      expect(mockRunWorkflow).toHaveBeenCalled();
      expect(workflows?.at(0)?.workflowName).toEqual("workflow-1");
      expect(error).toBeUndefined();
    });
  })
})