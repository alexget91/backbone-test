import Backbone from "backbone";
import templates from "../../../assets/templates";
import {ServerType} from "../common/constants";

const INPUT_TIMEOUT = 500;

const ServerEdit = Backbone.View.extend({
  tagName: `article`,
  className: `server-edit`,
  template: templates[`server-edit`],

  events: {
    'keyup .js-server-name': 'handleNameChange',
    'change .js-server-type': 'saveField',
    'submit .js-edit-form': 'handleSubmit',
  },

  initialize() {
    this.modelData = this.model.toJSON();
    this.inputTimeout = null;
    this.render();
  },

  render() {
    const templateData = Object.assign({}, this.modelData, {
      serverTypes: Object.values(ServerType).map((type) => ({
        value: type,
        isSelected: this.modelData.server_type === type,
      }))
    });

    this.$el.html(this.template(templateData));
    return this;
  },

  saveField(evt) {
    this.model.save({[evt.currentTarget.name]: evt.currentTarget.value});
  },

  handleNameChange(evt) {
    clearTimeout(this.inputTimeout);

    this.inputTimeout = setTimeout(() => {
      if (this.modelData.server_name !== evt.currentTarget.value) {
        this.saveField(evt);
      }
    }, INPUT_TIMEOUT);
  },

  handleSubmit(evt) {
    evt.preventDefault();

    const formData = new FormData(evt.currentTarget);
    const dataToSave = {};

    for (let pair of formData.entries()) {
      dataToSave[pair[0]] = pair[1];
    }

    this.model.save(dataToSave);
    this.trigger(`close`);
    this.remove();
  },
});

export default ServerEdit;
