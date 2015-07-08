module.exports = function (grunt) {
    grunt.initConfig({
        browserify: {
            main: {
                src: 'src/index.js',
                dest: 'static/js/app.js'
            },
            options: {
                watch: true
            }
        },
        less: {
            main: {
                src: 'src/style.less',
                dest: 'static/css/app.css'
            }
        },
        watch: {
            files: ['src/*.less'],
            tasks: ['less']
        }

    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask('default', ['browserify', 'less', 'watch']);

};