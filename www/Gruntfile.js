module.exports = function (grunt) {

    grunt.initConfig({
        watch: {
            templates: {
                files: ['jade/*.jade', 'jade/*.pug'],
                tasks: ['pug'],
                options: {
                    spawn: false
                }
            },
            styles: {
                files: ['sass/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false
                }
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    source: 'none'
                },
                files: {
                    'styles/main_global.css': 'sass/main_global.scss',
                    'styles/land_global.css': 'sass/land_global.scss'
                }
            }
        },
        pug: {
            release: {
                options: {
                    data: {
                        client: true,
                        debug: false,
                        pretty: false
                    }
                },
                files: [{
                    cwd: "jade/",
                    src: "*.jade",
                    dest: "",
                    expand: true,
                    ext: ".html"
                }]
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', ['watch']);
};