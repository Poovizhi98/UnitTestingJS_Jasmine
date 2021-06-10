module.exports = function(config) {
    config.set({
        frameworks: ['jasmine', 'jasmine-matchers'],
        preprocessor: {
            '*.js': ['coverage']
        },
        files : [
            './custom-matchers.js',
            '*.js',
            '*.spec.js'
        ],
        plugins: [  
            'karma-jasmine', 
            'karma-jasmine-matchers', 
            'karma-chrome-launcher',
            'karma-coverage'
        ],
        reporters: ['progress', 'coverage'],
        browsers: ['ChromeHeadless'],
        color: true,
        // singleRun: true,
        coverageReporter: {
            dir: 'coverage/',
            reporters: [
                {
                    type: 'html',
                    subdir: 'html'
                }
            ]
        }
    })
}