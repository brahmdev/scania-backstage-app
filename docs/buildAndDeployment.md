# Build & Deployment

## Build

In order to build the Backstage, please following the steps mentioned below:

1. `yarn install --frozen-lockfile`
2. `yarn tsc`
3. `yarn build:backend --config ../../app-config.yaml`

**Note**: As part of 3rd step above, we can also provide `app-config.production.yaml` for the production build.

As a part of build process, there will be need to different environment variables which could be related to GITHUB, Postgres etc., and preferred way to store those variables in some secret managers provided by AWS/Hashicorp or some similar provider.

*As part of Build process for this instance as demo application, all such variables are stored in shell script file called **environment.sh** file.*

*Since this file contains the secrets so this shouldn't be pushed to any VCS and needs to shared among team members/evaluator of this application manually.*


## Deployment

Preferred solution is to build the Docker image and push to some container registry.

We can build Backstage either as a part of CI/CD pipeline, where the build image can be deployed in any cloud provider like AWS or GCP.

Content for Dockerfile can be found at [packages/backend/Dockerfile](https://github.com/brahmdev/scania-backstage-app/blob/main/packages/backend/Dockerfile)


## Running Locally

As a part of deployment for this backstage instance we can build and run the Docker image locally as mentioned below:

1. Clone this repository on your machine
2. Navigate to root folder
3. Provide executable access to build script using `chmod a+x backStage-build.sh`
4. Run the script which will build and spin up the docker image as well, `./backStage-build.sh`.
5. Acess the Backstage UI at http://localhost:3000.


