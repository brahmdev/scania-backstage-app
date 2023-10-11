## Workflow Plugin (@internal/plugin-workflow)

Welcome to the workflow plugin!

_This plugin was created through the Backstage CLI_

## Need and Idea
Currently, there is already a plugin avaialable for github-action in [Backstage plugin repository](https://github.com/backstage/backstage/tree/master/plugins/github-actions).

It uses, [Octokit](https://www.npmjs.com/package/octokit) npm library to interact with GitHub API and in the `github-actions` plugin by Backstage it provides many apis but all are related to workflow runs.

So there was a need to have a API(s) that fetches list of Workflows from provided Github Repository and can also dispatch action against it. And the API needed was taken from [Octokit API docs](https://octokit.github.io/rest.js/v20)

Hence there was a need to write this Plugin and [Integrate into the Software Catalog](https://backstage.io/docs/plugins/integrating-plugin-into-software-catalog).

## Create plugin
To create a new frontend plugin, make sure you've run yarn install and installed dependencies, then run the following on your command line (a shortcut to invoking the backstage-cli new --select plugin) from the root of your project.

`yarn new --select plugin`

This will create a new Backstage Plugin based on the ID that was provided. It will be built and added to the Backstage App automatically.

## Getting started

Your plugin has been added to the example app in this repository, meaning you'll be able to access it by running `yarn start` in the root directory, and then navigating to [/workflow](http://localhost:3000/workflow).

## Run plugin

We can also serve the plugin in isolation by running `yarn start` in the plugin directory.
This method of serving the plugin provides quicker iteration speed and a faster startup and hot reloads.
It is only meant for local development, and the setup for it can be found inside the [/dev](./dev) directory.

## Publish

Currently there is no official documented way to publish plugin created in a privately, We can refer to [official documentation](https://backstage.io/docs/plugins/publish-private) for future updates.

If we think this plugin can be used by others then we need to publish it to npm and then we can use it from there like other available Backstage plugins.
