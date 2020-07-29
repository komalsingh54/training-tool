const scanner = require('sonarqube-scanner');

scanner(
  {
    serverUrl: 'http://localhost:9000',
    options: {
      'sonar.projectName': 'user-management',
      'sonar.projectDescription': 'user management project...',
      'sonar.sources': 'src',
      'sonar.tests': 'tests',
      'sonar.exclusions': 'node_modules/**, coverage/**, test/**',
      'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
      'sonar.textExecutionReportPaths': 'test-report.xml',
    },
  },
  () => process.exit()
);
