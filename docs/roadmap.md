# Roadmap

This Backstage instance is just for demo purpose and there needs to be many more plugins needs to be written or integrated in order to provide a smooth experience as a Developer Portal.
Below are the few very certain things which needs to be implemented.

## Logging and Monitoring

Logging & Monitoring is crucial part of debugging for any service/website and depending upon which logging technologies are implemented across the apps/service integrated with Backstage, there is need to integrate with those logging framework, that can be as a plugin written already, for example, [Datadog Plugin](https://roadie.io/backstage/plugins/datadog/?utm_source=backstage.io&utm_medium=marketplace&utm_campaign=datadog) or [Bugsnag Plugin](https://roadie.io/backstage/plugins/bugsnag/?utm_source=backstage.io&utm_medium=marketplace&utm_campaign=bugsnag).

## Design

UXers within the company uses different tools to put their design centrally and it would be good to integrate such tools like Figma with the Backstage. Currently there are no built in plugin for this so maybe a custom plugin needed here.


## Quality

Sonarqube is one of the nice tool for code quality management. So we can integrate [Sonarqube Plugin](https://github.com/backstage/backstage/blob/master/plugins/sonarqube/README.md) to check the code quality against number of Bugs, Vulnerabilities, Code Smells, Coverage, and Duplications


## Performance and SEO

Quality and Performance are the integral part of any app development, and there are tool like Lighthouse which can run test to identify any glitch in performance and quality. We can use [Lighthouse Plugin](https://github.com/backstage/backstage/tree/master/plugins/lighthouse) for this purpose.

