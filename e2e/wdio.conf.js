exports.config = {
    runner: 'local',
    specs: [
        './test/**/*.js'
    ],

    exclude: [
        // 'path/to/excluded/files'
    ],
    
    maxInstances: 10,
    capabilities: [{
        browserName: 'firefox'
    }],


    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'error',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'mocha',
    reporters: [['allure', {outputDir: 'allure-results'}]],


    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

    
}
