import Backbone from "backbone";
import _ from "underscore";
import ServerItem from "./server-item";

const ServerList = Backbone.View.extend({
  el: `#server-list`,

  initialize() {
    this.collection.fetch();
    this.render();
  },

  render() {
    const fragment = document.createDocumentFragment();

    _.each(this.collection.models, (serverModel) => {
      fragment.appendChild(new ServerItem({model: serverModel, list: this}).el);
    });

    this.$el.html(fragment);
    return this;
  },
});

export default ServerList;
