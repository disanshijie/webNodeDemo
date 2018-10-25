module.exports = function(grunt) {
  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      clean: {
          src: 'build/'
      },
      useminPrepare: {
          html: 'build/index.html',
          options: {
              dest: 'build'
          }
      },
      uglify: {
          buildrelease: {
              options: {
                  report: "min" //输出压缩率
              }
          }
      },
      usemin: {
          html: 'build/index.html',
          options: {
              dest: 'build'
          }
      },
      copy: {
          html: {
              files: [{
                  expand: true,
                  cwd: 'src',
                  src: '**/*',
                  dest: 'build/'
              }]
          }
      }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-usemin');

  grunt.registerTask('default', ['clean', 'copy', 'useminPrepare', 'concat', 'uglify', 'usemin']);
};