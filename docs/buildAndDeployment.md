# Build & Deployment

## Build

In order to build the Backstage, please following the steps mentioned below:
1. `yarn install --frozen-lockfile`
2. `yarn tsc`
3. `yarn build:backend --config ../../app-config.yaml`

**Note**: As part of 3rd step above, we can also provide `app-config.production.yaml`.

As a part of build process, there will be need to different environment variables which could be related to GITHUB, Postgres etc., and preferred way to store those variables in some secret managers provided by AWS/Hashicorp or some similar provider.

*As part of Build process for this instance as demo application, all such variables are stored in shell script file called **environment.sh** file.*

*Since this file contains the secrets so this shouldn't be pushed to any VCS and needs to shared among team members/evaluator of this application manually*


## Deployment

Preferred solution is to build the Docker image and push to some container registry.

We can build Backstage either as a part of CI/CD pipeline, where the build image can be deployed in any cloud provider like AWS or GCP.

Content for Dockerfile can be found at [packages/backend/Dockerfile](https://github.com/brahmdev/scania-backstage-app/blob/main/packages/backend/Dockerfile)

**Note:** *As a part of deployment for this backstage instance we can build the Docker image and using [docker-compose.yml](https://github.com/brahmdev/scania-backstage-app/blob/main/docker-compose.yml) * 