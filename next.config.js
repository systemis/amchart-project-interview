const withTM = require("next-transpile-modules")([
  "@amcharts/amcharts4/core",
  "@amcharts/amcharts4/charts",
  "@amcharts/amcharts4/themes/animated"
  ]); 
  
module.exports = withTM();

module.exports = {
  reactStrictMode: true,
  transpileModules: [
    "my-component",
    "redux/src"
  ]
}
