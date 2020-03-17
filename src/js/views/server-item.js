import Backbone from "backbone";
import $ from "jquery";
import templates from "../../../assets/templates";
import ServerEdit from "./server-edit";

const ServerItem = Backbone.View.extend({
  tagName: `article`,
  className: `server-item js-server-item`,
  template: templates[`server-item`],

  events: {
    'click': 'handleClick',
  },

  initialize(props) {
    this.list = props.list;
    this.listenTo(this.model, `change`, this.render);
    this.listenTo(this.list, `removeActive`, this.toggleActive);
    this.render();
  },

  render() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },

  toggleActive(isActive) {
    this.$el.toggleClass(`active`, isActive || false);
  },

  createEditView() {
    this.editView = new ServerEdit({model: this.model});
    this.listenTo(this.editView, `close`, this.onEditClose);
    $(`#server-edit`).html(this.editView.$el);
  },

  onEditClose() {
    this.list.trigger(`removeActive`);
  },

  handleClick() {
    this.list.trigger(`removeActive`);
    this.toggleActive(true);
    this.createEditView();
  }
});

export default ServerItem;
