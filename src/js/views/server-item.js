import Backbone from "backbone";
import templates from "../../../assets/templates";

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
    console.log(this.model.toJSON());
  }
});

export default ServerItem;
