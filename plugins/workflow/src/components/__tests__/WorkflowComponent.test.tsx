import React from "react";
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { fireEvent, render, screen } from "@testing-library/react";
import { TestApiProvider } from "@backstage/test-utils";
import { alertApiRef, errorApiRef } from "@backstage/core-plugin-api";
import { EntityProvider } from '@backstage/plugin-catalog-react';

import { WorkflowsComponent } from '../WorkflowsComponent';
import { githubActionsApiRef } from "../../api";
import mockEntity from "../../utils/__tests__/entity.mock";
import { getMockAlertApi, getMockErrorApi, getMockGithubActionsApi } from "../../utils/__tests__/api.mock";

const mockWorkflowRunClick = jest.fn();
let workflows = [{
    id: 123,
    workflowName: 'workflow-1',
    state: 'active',
    createdAt: "2023-10-12T20:41:25.421Z",
    url: "some-url",
    onRunClick: mockWorkflowRunClick,
}];

jest.mock("../../hooks/useWorkflows", () => {
    return {
        useWorkflows: () => {
            return {
                loading: false,
                workflows: workflows,
                projectName: "someowner/somerepo",
                error: null,
            }
        },
    };
});

const history = createMemoryHistory();
// mock push function
history.push = jest.fn();

const Wrapper = (props: { children?: React.ReactNode }) => (
    <TestApiProvider
        apis={[
            [githubActionsApiRef, getMockGithubActionsApi(jest.fn())],
            [errorApiRef, getMockErrorApi(jest.fn())],
            [alertApiRef, getMockAlertApi(jest.fn())]
        ]}
    >
        <EntityProvider entity={mockEntity}>
            <Router location={history.location} navigator={history}>
                {props.children}
            </Router>
        </EntityProvider>
    </TestApiProvider>
);

describe("WorkflowComponent", () => {
    describe("GitHub actions has workflows ", () => {
        beforeEach(() => {
            render(<WorkflowsComponent />, {
                wrapper: Wrapper
            });
        });

        it("renders workflow table when workflow(s) is present", () => {
            expect(screen.getByText("workflow-1")).toBeVisible();
        })

        it("runs workflow when clicked on run workflow icon", () => {
            fireEvent.click(screen.getAllByTestId("run-workflow")[0]);
            expect(mockWorkflowRunClick).toBeCalledTimes(1);
        });
    });

    describe("GitHub actions has workflows ", () => {
        beforeAll(() => {
            workflows = [];
        });
        beforeEach(() => {
            render(<WorkflowsComponent />, {
                wrapper: Wrapper
            });
        });
        it("shows empty state when no workflow is present", () => {
            expect(screen.getByText("No Workflow Data")).toBeVisible();
            expect(screen.queryByText("workflow-1")).not.toBeInTheDocument();
        });
    });

});