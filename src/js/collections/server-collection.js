import Backbone from "backbone";
import _ from "underscore";
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
          _.each(collection.models, (serverModel) => {
            serverModel.save();
          });
        }
      },
      error() {
        console.error(`collection fetch error`);
      }
    });
  },
});

export default ServerCollection;
