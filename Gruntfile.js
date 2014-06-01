module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
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
            options: {
                basePath: "public/",
                config: "public/config.rb"
            },
            compile: {

            },
            watch: {
                options: {
                    watch: true
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
        shell: {
            app: {
                command: "node ."
            },
            appFork: {
                command: "node . &"
            }
        },
        nodemon: {
            dev: {
                script: "<%=pkg.main %>",
                options: {
                    ignore: ["node_modules/**", ".git/", ".sass-cache/", "public/", "Gruntfile.js"]                    
                }
            },
            inspect: {
                script: "<%=pkg.main %>",
                options: {
                    nodeArgs: ["<%= nodemon.args %>"],
                    ignore: ["node_modules/**", ".git/", ".sass-cache/", "public/", "Gruntfile.js"]                    
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
                files: ["public/css/**/*.css", "!public/css/**/*.min.css"],
                tasks: ["cssmin"]
            },
            templates: {
                files: ["views/**/*.hbs"],
                tasks: ["handlebars"]
            }
        },
        concurrent: {
            options: {
                limit: 3,
                logConcurrentOutput: true                
            },
            dev: {
                tasks: ["nodemon:dev", "compass:watch", "watch"]
            },
            inspect: {
                tasks: ["nodemon:inspect", "compass:watch", "watch"]
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
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-shell");
    grunt.loadNpmTasks("grunt-nodemon");
    grunt.loadNpmTasks("grunt-concurrent");

    grunt.registerTask("default", ["concat", "uglify", "imagemin", "compass:compile", "cssmin", "handlebars", "shell:app"]);
    grunt.registerTask("fork", ["concat", "uglify", "imagemin", "compass:compile", "cssmin", "handlebars", "shell:appFork"]);
    grunt.registerTask("debug", function(inspect, breakOnFirstLine){
        var nodemonTask = "dev";
        if(inspect === "inspect"){

            // switch to inspect nodemon task
            nodemonTask = "inspect";
            // set nodemon args based on breakOnFirstLine grunt argument
            grunt.config.set("nodemon.args", breakOnFirstLine === "break" ? "--debug-brk" : "--debug");

            // spawn node-inspector as a child process
            grunt.util.spawn({
                cmd: "node-inspector"
            });
            
            console.log("Node inspector running at http://localhost:8080/debug?port=5858");
        }
        grunt.task.run(["concat", "uglify", "imagemin", "compass:compile", "cssmin", "handlebars", "concurrent:"+nodemonTask]);
    });

};