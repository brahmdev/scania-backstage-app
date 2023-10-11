# Overview

There are 3 main components in this architecture:
1. The core Backstage UI
2. The UI plugins (and their backing services)
3. Databases

## The core Backstage UI

![core-backstage-ui](https://github.com/brahmdev/scania-backstage-app/blob/main/docs/assets/core-backstage-ui.png)

The core Backstage UI consists of the following components:
1. Software Catalog: The Backstage Software Catalog is a centralized system that keeps track of ownership and metadata for all the software in your ecosystem (services, websites, libraries, data pipelines, etc). The catalog is built around the concept of [metadata YAML files](https://backstage.io/docs/features/software-catalog/descriptor-format/) stored together with the code, which are then harvested and visualized in Backstage. For more information, please refer to [documentation](https://backstage.io/docs/features/software-catalog/).
2. Kubernetes: For more information, please refer to [documentation](https://backstage.io/docs/features/kubernetes/), as this is not currently implemented as part of this setup.
3. Software Templates: For more information, please refer to [documentation](https://backstage.io/docs/features/software-templates/), as this is not currently implemented as part of this setup.
4. Backstage Search: For more information, please refer to [documentation](https://backstage.io/docs/features/search/), as this is not currently implemented as part of this setup.



