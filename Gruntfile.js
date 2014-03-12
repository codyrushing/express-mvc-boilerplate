module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        // concatenate all client-side js
        concat: {
            build: {
                src: ["public/js/lib/**/*.js", "public/js/templates.js", "public/js/helpers.js", "!public/js/build/**/*.js"],
                dest: "public/js/build/<%=pkg.name %>.js",
            }
        },
        // minify all client-side js
        uglify: {
            build: {
                src: "public/js/build/<%=pkg.name %>.js",
                dest: "public/js/build/<%=pkg.name %>.min.js"
            }
        },
        compass: {
            dist: {
                options: {
                    config: "public/config.rb"
                }
            }
        },
        cssmin: {
            minify: {
                expand: true,
                cwd: "public/css",
                src: ["*.css", "!*.min.css"],
                dest: "public/css",
                ext: ".min.css"
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
        handlebars: {
            compile: {
                files: {
                   "public/js/templates.js": ["views/**/*.hbs"]
                }
            },
            options: {
                namespace: "Handlebars.templates",
                partialsUseNamespace: true,
                processName: function(filePath) {
                    var parts = filePath.split("/"),
                        target = parts[parts.length - 1];
                    return target.split(".")[0];
                }
            }
        },
        express: {
            options: {
                port: 3000
            },
            dev: {
                options: {
                    script: "app.js"
                }
            }
        },
        watch: {
            scripts: {
                files: ["public/js/**/*.js", "!public/js/build/**/*"],
                tasks: ["concat", "uglify"],
                options: {
                    spawn: false
                }
            },
            images: {
                files: ["public/images/*.{png,jpg,gif}", "!public/images/min/**/*"],
                tasks: ["imagemin"],
                options: {
                    spawn: false
                }
            },
            css: {
                files: ["public/sass/**/*.scss"],
                tasks: ["compass", "cssmin"]
            },
            templates: {
                files: ["views/**/*.hbs"],
                tasks: ["handlebars"]
            },
            server: {
                files: ["*.js", "models/*.js", "controllers/*.js" ,"!public/**/*.js", "!Gruntfile.js"],
                tasks: ["express:dev:stop", "express:dev"],
                options: {
                    spawn: false // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded
                }
            }
        }
    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-imagemin");
    grunt.loadNpmTasks("grunt-contrib-compass");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-handlebars");
    grunt.loadNpmTasks("grunt-express-server");
    grunt.loadNpmTasks("grunt-contrib-watch");

    grunt.registerTask("default", ["concat", "uglify", "imagemin", "compass", "cssmin", "handlebars", "express", "watch"]);

};