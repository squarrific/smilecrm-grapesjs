import Component from '@glimmer/component';
import { all } from 'rsvp';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
// import grapesjs from 'grapesjs';
// import grapesjsPresetWebpage from 'grapesjs-preset-webpage';

export default class GrapesjsComponent extends Component {

  @tracked editor;

  @action
  async didInsert(element) {

    let grapesjs = await import('grapesjs').then(module => module.default);
    let plugins = await all(this.args.plugins.map(d => {
      switch(d) {
        case 'grapesjs-preset-webpage':
          return import('grapesjs-preset-webpage').then(module => module.default);
          break;
        case 'grapesjs-preset-newsletter':
          return import('grapesjs-preset-webpage').then(module => module.default);
          break;
        case 'grapesjs-mjml':
          return import('grapesjs-mjml').then(module => module.default);
          break;
      }
    }));

    this.editor = grapesjs.init({
      container: element,
      height: '100%',
      plugins,
      storageManager: { type: 'smilecrm' }
    });

    const SimpleStorage = {};

    this.editor.StorageManager.add('smilecrm', {

      load: (keys, clb, clbErr) => {
        clb(this.args.page.metaData);
      },

      store: (data, clb, clbErr) => {
        for (let key in data) {
          this.args.page.set(`metaData.${key}`, data[key]);
        }
        this.args.page.save().then(() => clb());
      }
    });

    this.editor.load();
  }

}
