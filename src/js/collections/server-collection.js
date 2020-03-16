import Backbone from "backbone";
import ServerModel from "../models/server-model";
import LocalStorage from "backbone.localstorage";

const ServerCollection = Backbone.Collection.extend({
  model: ServerModel,
  localStorage: new Backbone.LocalStorage(`server-list`),

  initialize(data) {
    this.fetch({
      success(collection) {
        if (!collection.length) {
          collection.set(data);
          Backbone.sync(`create`, collection);
        }
      },
      error() {
        console.error(`collection fetch error`);
      }
    });
  },
});

export default ServerCollection;
