module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        concat: {
            // 2. Configuration for concatinating files goes here.
            build: {
                src: [],
                dest: "public/js/build/production.js",
            }
        },
        uglify: {
            build: {
                src: "public/js/build/production.js",
                dest: "public/js/build/production.min.js"
            }
        },
        imagemin: {
            options: {
                progressive: true
            },
            dynamic: {
                files: [{
                    expand: true,
                    cwd: "public/images/",
                    src: ["!min/**/*", "**/*.{png,jpg,gif}"],
                    dest: "public/images/min"
                }]
            }
        },
        watch: {
            scripts: {
                files: ['Gruntfile.js', "js/*.js", '!public/js/build/**/*'],
                tasks: ["concat", "uglify"],
                options: {
                    spawn: false
                }
            },
            images: {
                files: ["public/images/*.{png,jpg,gif}", '!public/images/min/**/*'],
                tasks: ["imagemin"],
                options: {
                    spawn: false
                }
            }
        }
    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-imagemin");
    grunt.loadNpmTasks("grunt-contrib-watch");

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask("default", ["concat", "uglify", "imagemin", "watch"]);

};