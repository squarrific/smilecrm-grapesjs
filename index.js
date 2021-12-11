'use strict';

module.exports = {
  name: require('./package').name,

  options: {
    babel: {
      plugins: [require.resolve('ember-auto-import/babel-plugin')],
    },
  },

  included(app) {

    this._super.included.apply(this, arguments);

    // let app = this._findHost();

    const addonOptions = (app.options && app.options.grapesjs) || {};

    const dependencies = Object.keys(this.project.dependencies());
    const hasFastboot = dependencies.includes('ember-cli-fastboot');

    const importOptions = {};
    if (hasFastboot) {
      importOptions.using = [{ transformation: 'fastbootShim' }];
    }

    this.import('node_modules/grapesjs/dist/css/grapes.min.css');

    this.import('node_modules/grapesjs/dist/fonts/main-fonts.eot',  { destDir: '/fonts' });
    this.import('node_modules/grapesjs/dist/fonts/main-fonts.svg',  { destDir: '/fonts' });
    this.import('node_modules/grapesjs/dist/fonts/main-fonts.ttf',  { destDir: '/fonts' });
    this.import('node_modules/grapesjs/dist/fonts/main-fonts.woff', { destDir: '/fonts' });

  }
};
