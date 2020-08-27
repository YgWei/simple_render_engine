# Render Test Platform UI

## Update log

| 日期       | 版本   | 說明                                           | 備註 |
| ---------- | ------ | ---------------------------------------------- | ---- |
| 2020/05/07 | v1.0.0 | first version complete                         |      |
| 2020/05/08 | v1.0.1 | add config of render retry max count and timer |      |
| 2020/05/08 | v1.0.2 | remove timeout                                 |      |
| 2020/05/13 | v1.0.3 | Optimization exception process of response     |      |
| 2020/05/13 | v1.1.0 | Add paged.js support                           |      |
| 2020/06/12 | v1.1.1 | Change paged.js's source                       |      |
| 2020/08/14 | v1.1.2 | Fix zip mimetype problem                       |      |

## Project setup
1. Install dependency
  ```
  npm install
  ```
2. Add enviroment file. File name is .env
  ```
  # Log config
  LOG_DIRECTORY = Log's save directory. Default is logs
  LOG_FILENAME = Log's base file name. Default is render_test_platform_app
  LOG_LEVEL = Log's level. Default is info

  # Server config
  APP_PORT = Server port. Default is 8080

  # Deploy server
  DEPLOY_SERVER_PROTOCOL = 
  DEPLOY_SERVER_HOST = 
  DEPLOY_SERVER_PORT = 

  # Render Config
  RENDER_RETRY_TIMER=
  RENDER_RETRY_COUNT=
  ```
3. According to example, setup config/engine.json setting.
  ```
  // add object according to the latest object format.
  {
    "pt": {
      "name": "belstar",
      "value": "pt",
      "url": "http://localhost:9090/api/v1/render/webpage",
      "paged": true
    },
    "enginName": {
      "name": "enginName", // engine name in web options. Same as key
      "value": "engine value", // request.formdata.engine's value when option be selected
      "url": "render service url",
      "paged": false // whether or not use paged.js
    }
  }
  ```

### Run with development mode
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

### Run with compiled files
```
npm run start
```

## Volume
```
# Need volume with deploy server
/public/path:/home/node/app/uploads
# Render engine configuration
/config/path:/home/node/app/config
```