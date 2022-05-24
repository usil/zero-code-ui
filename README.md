# Zero-code UI 0.0.3

This is the front end of the zero-code platform.

## Usage with the back-end

Check the [zero-code repositorie](https://github.com/usil/zero-code-api) to know how to configure the back end. Just make shure to reference the correct port in the enviroment variables.

```txt
ZERO_CODE_API_BASE_URL=http://localhost:2111
```

## Technologies Used

- Angular 13
- Webpack 5

## Requirement

- Nodejs >14

## Features

### Dynamic Settings

Are you tired of build again and again your spa just when settings change? Read [this](https://github.com/nodeboot/nodeboot-spa-server#features) to understand how I fixed!

This template have a npm library called **nodeboot-spa-server** that give you and endpoint `/settings.json` with variables ready to be consumed at the entrypoint of your spa application using ajax and then expose it to the rest of your application using localtorage, global variable, private field, etc

Steps:

- Just modify the included `settings.json` file, with env variables that your spa needs **by environment(dev, test, prod, etc)** like: microservices urls, some apikey, layout configurations, colors, etc and any kind of settings that your app needs.
- Only create one build instead of creating one build for each stage (testing, production, development, etc). Just modify or replace the `settings.json` file.
- You can change the name of the file if you desire to do so, then you will need to also modify the `custom-webpack.config.js` file.

## For Development

### Adding Angular Materials

Add the materials in the materials folder that is present in each module.

Just run `ng serve` like always. This template uses a modified angular development server.

## Testing

You can also look a the testing here as a template. The testing only covers the general parts of the app, adding for example a new angular material component, (in a any way different to the mentioned before), will break the testing. For more info take a look at <https://angular.io/guide/testing-components-scenarios>

`more functionalities in progress`

## For Production

First use `ng build` then `npm start`, this will run `nodeboot-spa-server dist/zero-code-ui -s settings.json -p 2112 --allow-routes`

## Contributors

<table>
  <tbody>
    <td>
      <img src="https://i.ibb.co/88Tp6n5/Recurso-7.png" width="100px;"/>
      <br />
      <label><a href="https://github.com/TacEtarip">Luis Huertas</a></label>
      <br />
    </td>
    <td>
      <img src="https://avatars0.githubusercontent.com/u/3322836?s=460&v=4" width="100px;"/>
      <br />
      <label><a href="http://jrichardsz.github.io/">JRichardsz</a></label>
      <br />
    </td>
  </tbody>
</table>
