import Backbone from "backbone";
import templates from "../../../assets/templates";
import ServerEdit from "./server-edit";

const ServerItem = Backbone.View.extend({
  template: templates[`server-item`],

  events: {
    'click': 'handleClick',
  },

  initialize() {
    this.render();
  },

  render() {
    this.$el.html(this.template(this.model.toJSON()));
    this.setElement(this.el.children[0]);
    return this;
  },

  handleClick() {
    new ServerEdit({model: this.model}).render();
  }
});

export default ServerItem;
