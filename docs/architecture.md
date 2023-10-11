# Overview

There are 3 main components in this architecture:

1. The core Backstage UI
2. The UI plugins (and their backing services)
3. Databases

## The core Backstage UI

![core-backstage-ui](./assets/core-backstage-ui.png)

The core Backstage UI consists of the following components:

1. Software Catalog: The Backstage Software Catalog is a centralized system that keeps track of ownership and metadata for all the software in your ecosystem (services, websites, libraries, data pipelines, etc). The catalog is built around the concept of [metadata YAML files](https://backstage.io/docs/features/software-catalog/descriptor-format/) stored together with the code, which are then harvested and visualized in Backstage. For more information, please refer to [documentation](https://backstage.io/docs/features/software-catalog/).
2. Kubernetes: For more information, please refer to [documentation](https://backstage.io/docs/features/kubernetes/), as this is not currently implemented as part of this setup.
3. Software Templates: For more information, please refer to [documentation](https://backstage.io/docs/features/software-templates/), as this is not currently implemented as part of this setup.
4. Backstage Search: For more information, please refer to [documentation](https://backstage.io/docs/features/search/), as this is not currently implemented as part of this setup.

## The UI Plugins

Each plugin is a client-side application that mounts itself on the UI. Plugins are written in TypeScript or JavaScript. They each live in their own directory in backstage/plugins. For example, the source code for the workflow plugin for this task is available at [scania-backstage-app/plugins/workflow](https://github.com/brahmdev/scania-backstage-app/tree/main/plugins/workflow).
To create a new FE plugin, we can use the below commands,

`yarn new --select plugin`

Please refer to [workflow plugin](https://github.com/brahmdev/scania-backstage-app/blob/main/docs/workflow-plugin.md)

For details, Plugin architecture please refer to this [link](https://backstage.io/docs/overview/architecture-overview#plugin-architecture)


## Databases

Backstage uses 2 types of databases mainly:

1. In-memory
2. Postgres

### In-memory Database
By default, the in-memory database is configured for local Backstage development.
The configuration for the same looks like below in the `app-config.yaml` or `app-config.local.yaml` file.

`
backend:
   database:
    client: better-sqlite3
    connection: ':memory:'
`

### Postgres

Postgres database can be configured if we want to have a persistent layer for data that is being added/configured in the Backstage. This is by default option in the production environment, and the configuration can be found inside `app-config.production.yaml` and it looks like below:

`
backend:
  database:
    client: pg
    connection:
      host: ${POSTGRES_HOST}
      port: ${POSTGRES_PORT}
      user: ${POSTGRES_USER}
      password: ${POSTGRES_PASSWORD}
`

We need to make sure the above-mentioned environment variables are available when Backstage is being run in production mode.


