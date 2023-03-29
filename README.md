# Checkout JS

Checkout JS is a browser-based application providing a seamless UI for BigCommerce shoppers to complete their checkout. It is also known as [Optimized One-Page Checkout](https://support.bigcommerce.com/s/article/Optimized-Single-Page-Checkout), which is currently the recommended checkout option for all BigCommerce stores.

## Requirements

In order to build from the source code, you must have the following set up in your development environment.

* Node >= v14.
* NPM >= v6.
* Unix-based operating system.

One of the simplest ways to install Node is using [NVM](https://github.com/nvm-sh/nvm#installation-and-update). You can follow their instructions to set up your environment if it is not already set up.

## Development

Once you have cloned the repository and set up your environment, you can start developing with it.

First, you have to pull in the dependencies required for the application.

```sh
npm ci
```

After that, you can make changes to the source code and run the following command to build it.

```sh
npm run build
```

If you are developing the application locally and want to build the source code in watch mode, you can run the following command:

```sh
npm run dev
```

If you want to create a prerelease (i.e.: `alpha`) for testing in the integration environment, you can run the following command:

```sh
npm run release:alpha
```

After that, you need to push the prerelease tag to your fork so it can be referenced remotely.

## Custom Checkout installation

Follow [this guide](https://developer.bigcommerce.com/stencil-docs/customizing-checkout/installing-custom-checkouts) for instructions on how to fork and install this app as a Custom Checkout in your store.

If you want to test your checkout implementation, you can run:
```sh
npm run dev:server
```

And enter the local URL for `auto-loader-dev.js` in Checkout Settings, e.g `http://127.0.0.1:8080/auto-loader-dev.js`

## Release

To release this custom checkout, first run `npm run build`. This will update the files in the `dist` directory. After that, simply copy the changed files into the webdav directory by following https://developer.bigcommerce.com/stencil-docs/customizing-checkout/installing-custom-checkouts and update the loader version in the bigcommerce store ui.
