import React from 'react';
import { useEntity, } from '@backstage/plugin-catalog-react';
import { Entity } from '@backstage/catalog-model';
import {
    EmptyState,
    Table,
    TableColumn,
    Link,
  } from '@backstage/core-components';
import { useApi, alertApiRef, AlertApi } from '@backstage/core-plugin-api';

import {
    Typography,
    IconButton,
    Tooltip,
    Button,
    Card,
} from '@material-ui/core';
import RunIcon from '@material-ui/icons/PlayCircleFilled';
import GitHubIcon from '@material-ui/icons/GitHub';
import { Link as RouterLink } from 'react-router-dom';

import { getProjectNameFromEntity } from '../../utils/getProjectNameFromEntity';
import { getHostnameFromEntity } from '../../utils/getHostnameFromEntity';
import { Workflows, useWorkflows } from '../../hooks/useWorkflows';

type Props = {
    loading: boolean;
    workflows?: Workflows[];
    projectName: string;
};

function handleRunWorkflow(workflow: Partial<Workflows>, alertApi: AlertApi) {
    (workflow as Workflows).onRunClick();
    alertApi.post({
        message: "Workflow has been triggered successfully",
        severity: "success",
        display: "transient",
    })
}
const generatedColumns: TableColumn[] = [
    {
        title: 'ID',
        field: 'id',
        type: 'numeric',
        width: '8%',
    },
    {
        title: 'Workflow',
        field: 'workflowName',
        width: '30%',
    },
    {
        title: 'Workflow File',
        field: 'url',
        highlight: true,
        render: (row: Partial<Workflows>) => {
        const LinkWrapper = () => {
            return (
                <Link component={RouterLink} to={row.url!}>
                    {row.url}
                </Link>
            );
        };

        return <LinkWrapper />;
        },
    },   
    {
        title: 'Status',
        width: '150px',

        render: (row: Partial<Workflows>) => (
            row.state
        ),
    },
    {
        title: 'Actions',
        render: (row: Partial<Workflows>) => {
           const alertApi = useApi(alertApiRef);

            return (
                <Tooltip title="Run workflow">
                    <IconButton data-testid="run-workflow" onClick={() => handleRunWorkflow(row, alertApi)}>
                    <RunIcon />
                    </IconButton>
                </Tooltip>
            )
        },
        width: '10%',
    },
];

export const WorkflowsTableView = ({
    projectName,
    loading,
    workflows,
}: Props) => {
    return (
        <Table
            isLoading={loading}
            totalCount={workflows?.length}
            data={workflows ?? []}
            style={{ width: '100%' }}
            title={
                <Card>
                    <GitHubIcon />
                    <Typography variant="h6">{projectName}</Typography>
                </Card>
            }
            columns={generatedColumns}
        />
    );
};
  
export const WorkflowsComponent = () => {
    const { entity } = useEntity<Entity>();
    const projectName = getProjectNameFromEntity(entity);
    const hostname = getHostnameFromEntity(entity);
    const [owner, repo] = (projectName ?? '/').split('/');

    const { workflows, ...tableProps } = useWorkflows({
      hostname,
      owner,
      repo,
    });

    const githubHost = hostname || 'github.com';
    const hasNoWorkflows = !tableProps.loading && (!workflows || workflows.length === 0);

    return hasNoWorkflows ? (
        <EmptyState
          missing="data"
          title="No Workflow Data"
          description="This component has GitHub Actions enabled, but no data was found. Have you created any Workflows? Click the button below to create a new Workflow."
          action={
            <Button
              variant="contained"
              color="primary"
              href={`https://${githubHost}/${projectName}/actions/new`}
            >
              Create new Workflow
            </Button>
          }
        />
      ) : (
        <WorkflowsTableView
          {...tableProps}
          workflows={workflows}
          loading={tableProps.loading}
        />
      );
}