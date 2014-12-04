module.exports = function(grunt) {
  grunt.initConfig({
    esri_slurp: {
      options: {
        version: '3.11'
      },
      dev: {
        options: {
          beautify: true
        },
        dest: 'app/bower_components/esri'
      },
      travis: {
        dest: 'app/bower_components/esri'
      }
    }
  });

  grunt.loadNpmTasks('grunt-esri-slurp');

  grunt.registerTask('slurp', ['esri_slurp:dev']);
  grunt.registerTask('travis', ['esri_slurp:travis']);
};
