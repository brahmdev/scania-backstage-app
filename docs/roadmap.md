# Roadmap

This Backstage instance is just for demo purpose and there needs to be many more plugins needs to be written or integrated in order to provide a smooth experience as a Developer Portal.
Below are the few very certain things which needs to be implemented.



## Deployment Plan

Currently this Backstage instace is deployed and run using Docker images locally. But this can be run on any Cloud Providers which supports running docker images in container/pods.

### AWS Deployment Plan

#### With Amazon ECS

1. We need to setup Amazon ECS based on FARGATE, this can be done manually via Amazon console but preferred way would be to write IaaC (Infrastructure as a Code) using any available options like Terraform, Amazon CDK etc, so that if we need to spin up another environment then it can be done quickly with just one click/GitHub Action Trigger.
2. We need to write Task Definition which will specify the properties of Containers in ECS.
3. We can implement CI/CD pipeline using GitHub Actions which will build the docker image and push it to Aamazon ECR (Elastic Container Registry).
4. Once the image is build then we need to provide to Task Definition and need to push updated Task Definition so that it can run the updated/recently pushed image from ECR.
5. Ideally, there should be load balancer configured in this setup so that it balances the load between running cluster.


#### With Amazon EKS

The same setup can be deployed on Amazon EKS as well but instead of container there will be Pods which can be configured and deployed using Helm Charts.

## Workflow plugin

In the currently implementation of `Workflow Plugin`, it shows the list of available workflows in the provided repository and provision to run but it does not provide a feature to run the selected workflow on a specific branch like in GitHub Actions view in GitHub.

We also needs to increase the code coverage of this plugin.


## Logging and Monitoring

Logging & Monitoring is crucial part of debugging for any service/website and depending upon which logging technologies are implemented across the apps/service integrated with Backstage, there is need to integrate with those logging framework, that can be as a plugin written already, for example, [Datadog Plugin](https://roadie.io/backstage/plugins/datadog/?utm_source=backstage.io&utm_medium=marketplace&utm_campaign=datadog) or [Bugsnag Plugin](https://roadie.io/backstage/plugins/bugsnag/?utm_source=backstage.io&utm_medium=marketplace&utm_campaign=bugsnag).

## Design

UXers within the company uses different tools to put their design centrally and it would be good to integrate such tools like Figma with the Backstage. Currently there are no built in plugin for this so maybe a custom plugin needed here.


## Quality

Sonarqube is one of the nice tool for code quality management. So we can integrate [Sonarqube Plugin](https://github.com/backstage/backstage/blob/master/plugins/sonarqube/README.md) to check the code quality against number of Bugs, Vulnerabilities, Code Smells, Coverage, and Duplications


## Performance and SEO

Quality and Performance are the integral part of any app development, and there are tool like Lighthouse which can run test to identify any glitch in performance and quality. We can use [Lighthouse Plugin](https://github.com/backstage/backstage/tree/master/plugins/lighthouse) for this purpose.





