/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['lib/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    coffee: {
      compile: {
        options: {
          sourceMap: true
        },
        files: [
          {
            expand: true,     // Enable dynamic expansion.
            cwd: 'www/scripts/',      // Src matches are relative to this path.
            src: ['**/**/**/*.coffee'], // Actual pattern(s) to match.
            dest: 'www/scripts/prod',   // Destination path prefix.
            ext: '.js'   // Dest filepaths will have this extension.
          }
        ]
      }
    },
    compass: {
      dist: {
        options: {
          cssDir: 'www/styles/prod',
          sassDir: 'www/styles',
          imagesDir: 'www/images',
          javascriptsDir: 'www/scripts',
          force: true
        }
      }
    },
    clean: {
      compass: {
        src: 'www/styles/prod/*.min.css'
      },
      coffee: {
        src: 'www/scripts/prod/*.js'
      },
      rjs: {
        src: 'www/scripts/build'
      }
    },
    cssmin: {
      minify: {
        expand: true,
        cwd: 'www/styles/prod',
        src: ['**/*.css'],
        dest: 'www/styles/prod/',
        ext: '.min.css'
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: 'www/scripts/',
          mainConfigFile: 'www/scripts/common.js',
          modules: [
            {
              name: 'home',
              include: ['app/slider', 'app/bubbles']
            },

            {
              name: 'secondary',
              include: ['app/slider']
            }
          ],
          // optimize: 'none',
          // name: 'home',
          // include: ['app/slider'],
          dir: 'www/scripts/build'
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 3000,
          base: 'www'
        }
      }
    },
    watch: {
      coffee: {
        files: [
          'www/scripts/**/*.coffee'
        ],
        tasks: ['clean:coffee', 'coffee']
        // tasks: ['coffee', 'uglify']
      },
      compass: {
        files: [
          'www/styles/**/*.{scss,sass}'
        ],
        tasks: ['compass', 'clean:compass', 'cssmin']
        // tasks: ['compass', 'cssmin']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Default task.
  grunt.registerTask('default', ['connect', 'watch']);
  grunt.registerTask('rjs', ['clean:rjs', 'requirejs']);

};
