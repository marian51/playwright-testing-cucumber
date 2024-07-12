export default {
  loader: ["ts-node/esm"],
  import: ["src/**/*.ts"],
  forceExit: true,
  format: ['html:playwright-report/cucumber-report.html']
}