# Render Test Platform UI

## Update log

| 日期       | 版本   | 說明                                  | 備註 |
| ---------- | ------ | ------------------------------------- | ---- |
| 2020/05/07 | v1.0.0 | first version complete                |      |
| 2020/05/13 | v1.1.0 | Optimization error message. Add i18n. |      |
| 2020/05/14 | v1.1.1 | Add static i18n of language options.  |      |

## Project setup
1. Install dependency
  ```
  npm install
  ```
2. Add enviroment file. File name is env.${NODE_ENV}.local
  ```
  # Application config
  VUE_APP_API_PROTOCOL = protocol
  VUE_APP_API_HOTS = host
  VUE_APP_API_PORT = port
  VUE_APP_API_VERSION = api version(ex: v1)
  ```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run with compiled files
```
npm run start
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
