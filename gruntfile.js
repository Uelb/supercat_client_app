'use strict';
var LIVERELOAD_PORT = 35729;
var SERVER_PORT = 9001;
var mountFolder = function(connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {
    grunt.initConfig({

        sass: {
            dev: {
                src: ['src/sass/*.scss'],
                dest: 'public/css/main.css',
            },
        },
        coffee: {
            compileBare: {
                options: {
                    bare: true
                },
                files: {
                    'public/js/supercat.js': 'src/coffee/supercat.coffee',
                    'public/js/models.js': 'src/coffee/models/*.coffee',
                    'public/js/views.js': 'src/coffee/views/**/*.coffee',
                    'public/js/routers.js': 'src/coffee/routers/*.coffee',
                }
            },
        },
        watch: {
            sass: {
                // We watch and compile sass files as normal but don't live reload here
                files: ['src/sass/*.scss'],
                tasks: ['sass'],
                livereload: true,
            },
            coffee: {
                // We watch and compile sass files as normal but don't live reload here
                files: ['src/coffee/*.coffee', 'src/coffee/**/*.coffee'],
                tasks: ['coffee'],
                livereload: true,
            },
            livereload: {
                // Here we watch the files the sass task will compile to
                // These files are sent to the live reload server after sass compiles to them
                options: {
                    livereload: true
                },
                files: ['src/**/*'],
            },
            tasks: ['sass', 'coffee', 'open', 'connect:server:keepalive', ],
        },
        connect: {
            server: {
                options: {
                    port: SERVER_PORT,
                    base: ''
                },
                keepalive: true
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.server.options.port %>'
            }
        },
    });

    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.registerTask('default', ['sass', 'coffee', 'open', 'connect:server', 'watch']);
}