import { AlertApi, ErrorApi } from "@backstage/core-plugin-api";
import { GithubActionsApi } from "../../api";
import mockWorkflows from "./workflow.mock";

type MockAlertApi = jest.Mocked<Pick<AlertApi, "post">>;

const mockAlertApi: MockAlertApi = {
    post: jest.fn(),
};

export function getMockErrorApi(mockErrorApiPost: any): ErrorApi {
    return {
        post: mockErrorApiPost,
        error$: jest.fn()
    }
};

export function getMockAlertApi(mockAlertApiPost: any): ErrorApi {
    return {
        post: mockAlertApiPost,
        error$: jest.fn()
    }
};

export function getMockGithubActionsApi(mockRunWorkflow: any): GithubActionsApi {
    return {
        getWorkflows: jest.fn().mockReturnValue(mockWorkflows),
        runWorkflow: mockRunWorkflow,
    }
}
export const alertApi = mockAlertApi as unknown as AlertApi;
