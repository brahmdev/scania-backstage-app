import { createGithubActionsDispatchAction } from "@backstage/plugin-scaffolder-backend";
import { ScmIntegrations } from "@backstage/integration";


export const githubDispatchActions = (integrations: ScmIntegrations) => {
    return createGithubActionsDispatchAction(
        {
            integrations
        }
    )
}