module.exports = function(grunt) {

    // console.log(grunt);
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        dirs: {
            cssSrc: 'src/ecui-css',
            cssDest: 'dis/',

            jsSrc: 'src/ecui-js',
            jsDest: 'dis/'
        },
        //合并
        concat: {
            options: {
                separator: '\n'
            },
            css: {
                src: [
                    '<%= dirs.cssSrc %>/ecui-button.css',
                    '<%= dirs.cssSrc %>/ecui-label.css',
                    '<%= dirs.cssSrc %>/ecui-input.css',
                    '<%= dirs.cssSrc %>/ecui-scrollbar.css',
                    '<%= dirs.cssSrc %>/ecui-select.css',
                    '<%= dirs.cssSrc %>/ecui-checkbox.css',
                    '<%= dirs.cssSrc %>/ecui-radio.css',
                    '<%= dirs.cssSrc %>/ecui-table.css',
                    '<%= dirs.cssSrc %>/ecui-treeview.css',
                    '<%= dirs.cssSrc %>/ecui-check-tree.css',
                    '<%= dirs.cssSrc %>/ecui-calendar.css',
                    '<%= dirs.cssSrc %>/ecui-month-calendar.css',
                    '<%= dirs.cssSrc %>/ecui-multi-calendar.css',
                    '<%= dirs.cssSrc %>/ecui-pop.css',
                    '<%= dirs.cssSrc %>/ecui-form.css',
                    '<%= dirs.cssSrc %>/ecui-messagebox.css',
                    '<%= dirs.cssSrc %>/ecui-message-bar.css',
                    '<%= dirs.cssSrc %>/ecui-pager.css',
                    '<%= dirs.cssSrc %>/ecui-ext-pager.css',
                    '<%= dirs.cssSrc %>/ecui-query-tab.css',
                    '<%= dirs.cssSrc %>/ecui-multi-select.css',
                    '<%= dirs.cssSrc %>/ecui-editor.css',
                    '<%= dirs.cssSrc %>/ecui-area.css',
                    '<%= dirs.cssSrc %>/ecui-data-tree.css',
                    '<%= dirs.cssSrc %>/ecui-input-tree.css',
                    '<%= dirs.cssSrc %>/ecui-tip.css',
                    '<%= dirs.cssSrc %>/ecui-score.css',
                    '<%= dirs.cssSrc %>/ecui-messagebox.css',
                    '<%= dirs.cssSrc %>/ecui-lite-table.css',
                    '<%= dirs.cssSrc %>/ecui-custom.css',
                    '<%= dirs.cssSrc %>/ecui-custom-pager.css',
                    '<%= dirs.cssSrc %>/ecui-table-editor.css',
                    '<%= dirs.cssSrc %>/ecui-x-calendar.css'
                ],
                dest: '<%= dirs.cssDest %>/ecui-concat.css'
            },
            ecui: {
                src: [
                    '<%= dirs.jsSrc %>/base/ecui.js',
                    '<%= dirs.jsSrc %>/base/adapter.js',
                    '<%= dirs.jsSrc %>/base/core.js',
                    '<%= dirs.jsSrc %>/base/control.js',
                    '<%= dirs.jsSrc %>/base/button.js',
                    '<%= dirs.jsSrc %>/base/scrollbar.js',
                    '<%= dirs.jsSrc %>/base/panel.js',
                    '<%= dirs.jsSrc %>/base/items.js',
                    '<%= dirs.jsSrc %>/base/input-control.js',
                    // 'base/decorate.js',
                    // 'base/combine.js',

                    '<%= dirs.jsSrc %>/tools/messagebox.js',
                    '<%= dirs.jsSrc %>/tools/score.js',
                    '<%= dirs.jsSrc %>/tools/tip.js',

                    '<%= dirs.jsSrc %>/checkbox/checkbox.js',
                    '<%= dirs.jsSrc %>/radio/radio.js',
                    '<%= dirs.jsSrc %>/label/label.js',
                    '<%= dirs.jsSrc %>/input/input.js',
                    '<%= dirs.jsSrc %>/form/form.js',
                    '<%= dirs.jsSrc %>/form/pop.js',

                    '<%= dirs.jsSrc %>/select/select.js',
                    '<%= dirs.jsSrc %>/select/cascade-select.js',
                    '<%= dirs.jsSrc %>/select/multi-select.js',
                    '<%= dirs.jsSrc %>/select/listbox.js',

                    '<%= dirs.jsSrc %>/calendar/month-view.js',
                    '<%= dirs.jsSrc %>/calendar/month-calender.js',
                    '<%= dirs.jsSrc %>/calendar/calendar.js',
                    '<%= dirs.jsSrc %>/calendar/multi-calendar.js',
                    '<%= dirs.jsSrc %>/calendar/x-calendar-view.js',
                    '<%= dirs.jsSrc %>/calendar/x-calendar-layer.js',
                    '<%= dirs.jsSrc %>/calendar/x-calendar.js',

                    '<%= dirs.jsSrc %>/tree/tree-view.js',
                    '<%= dirs.jsSrc %>/tree/check-tree.js',
                    '<%= dirs.jsSrc %>/tree/data-tree.js',
                    '<%= dirs.jsSrc %>/tree/input-tree.js',

                    '<%= dirs.jsSrc %>/tab/tab.js',
                    '<%= dirs.jsSrc %>/tab/query-tab.js',

                    '<%= dirs.jsSrc %>/table/editor.js',
                    '<%= dirs.jsSrc %>/table/table-editor.js',
                    '<%= dirs.jsSrc %>/table/lite-table.js',
                    '<%= dirs.jsSrc %>/table/table.js',
                    '<%= dirs.jsSrc %>/table/locked-table.js',
                    '<%= dirs.jsSrc %>/table/custom-table.js',
                    '<%= dirs.jsSrc %>/table/ext-table.js',
                    '<%= dirs.jsSrc %>/table/fixed-table.js',
                    '<%= dirs.jsSrc %>/table/pager.js',
                    '<%= dirs.jsSrc %>/table/custom-pager.js',
                    '<%= dirs.jsSrc %>/table/ext-pager.js'
                ],
                dest: '<%= dirs.jsDest %>/ecui-concat.js'
            },
            business: {
                src: [
                    "<%= dirs.jsSrc %>/business/message-bar.js",
                ],
                dest: '<%= dirs.jsDest %>/business-concat.js'
            }
        },
        //js压缩
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            ecui: {
                // options: {
                //     sourceMap: '<%= dirs.jsDest %>/map/ecui-map.js'
                // },
                src: '<%= dirs.jsDest %>/ecui-concat.js',
                dest: '<%= dirs.jsDest %>/ecui.js'
            },
            business: {
                src: '<%= dirs.jsDest %>/business-concat.js',
                dest: '<%= dirs.jsDest %>/business.js'
            }
        },
        cssmin: {
            minify: {
                src: '<%= dirs.jsDest %>/ecui-concat.css',
                dest: '<%= dirs.jsDest %>/ecui.css'          
            }
        },
        clean: {
            removeMiddleFiles: [
                '<%= dirs.jsDest %>/ecui-concat.css',
                '<%= dirs.jsDest %>/ecui-concat.js',
                '<%= dirs.jsDest %>/business-concat.js'
            ]
        }
    });



    // Load the plugin that provides the "concat" task.
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Load the plugin that provides the "copy" task.
    grunt.loadNpmTasks('grunt-contrib-copy');
    
    // Load the plugin that provides the "cssmin" task.
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.loadNpmTasks('grunt-contrib-clean');

    // Default task(s).
    grunt.registerTask('default', ['concat', 'uglify', 'cssmin', 'clean']);
    //grunt.registerTask('debug', ['concat', 'minified']);
};