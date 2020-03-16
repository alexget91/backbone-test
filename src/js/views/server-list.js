import Backbone from "backbone";
import _ from "underscore";
import ServerItem from "./server-item";

const ServerList = Backbone.View.extend({
  el: '#server-list',

  initialize() {
    this.render();
  },

  render() {
    const fragment = document.createDocumentFragment();

    _.each(this.model.models, (serverModel) => {
      fragment.appendChild(new ServerItem({model: serverModel}).el);
    });

    this.$el.html(fragment);
    return this;
  },
});

export default ServerList;
