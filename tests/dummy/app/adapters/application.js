import JSONAPIAdapter from '@ember-data/adapter/json-api';
import AjaxServiceSupport from 'ember-ajax/mixins/ajax-support';
import { inject as service } from '@ember/service';
import ENV from '../config/environment';

export default class ApplicationAdapter extends JSONAPIAdapter {
  @service application;

  namespace = '/smilecrm-web';

  host = ENV.host;
}
