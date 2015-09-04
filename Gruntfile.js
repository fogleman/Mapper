module.exports = function(grunt) {
    grunt.initConfig({
        browserify: {
            build: {
                src: 'src/js/app.js',
                dest: 'build/js/bundle.js',
                options: {
                    browserifyOptions: {
                        debug: true
                    }
                }
            },
            watch: {
                src: 'src/js/app.js',
                dest: 'build/js/bundle.js',
                options: {
                    watch: true,
                    keepAlive: true,
                    browserifyOptions: {
                        debug: true
                    }
                }
            }
        },
        clean: {
            build: ['build']
        },
        concurrent: {
            options: {logConcurrentOutput: true},
            build: ['browserify:watch', 'watch']
        },
        copy: {
            css: {
                cwd: 'src',
                src: 'css/**',
                dest: 'build',
                expand: true
            },
            bootstrap: {
                cwd: 'node_modules/bootstrap/dist',
                src: '**',
                dest: 'build/bootstrap',
                expand: true
            },
            index: {
                cwd: 'src',
                src: 'index.html',
                dest: 'build',
                expand: true
            },
            favicon: {
                cwd: 'src',
                src: 'favicon.ico',
                dest: 'build',
                expand: true
            }
        },
        express: {
            serve: {
                options: {
                    port: 8000,
                    hostname: '0.0.0.0',
                    bases: ['build'],
                    livereload: true
                }
            }
        },
        touch: {
            build: ['build/js/bundle.js']
        },
        uglify: {
            prod: {
                files: {
                    'build/js/bundle.js': ['build/js/bundle.js']
                }
            },
        },
        watch: {
            options: {
                livereload: true,
                spawn: false
            },
            bundle: {
                files: 'build/js/bundle.js'
            },
            index: {
                files: 'src/index.html',
                tasks: 'copy:index'
            },
            css: {
                files: 'src/css/**',
                tasks: 'copy:css'
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-touch');

    grunt.registerTask('build', [
        'clean',
        'copy:css',
        'copy:bootstrap',
        'copy:index',
        'copy:favicon',
        'browserify:build',
        'uglify',
    ]);

    grunt.registerTask('default', [
        'clean',
        'copy:css',
        'copy:bootstrap',
        'copy:index',
        'copy:favicon',
        'touch',
        'express',
        'concurrent'
    ]);
};
