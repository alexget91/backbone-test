import Backbone from "backbone";
import templates from "../../../assets/templates";
import {ServerType} from "../common/constants";

const ServerEdit = Backbone.View.extend({
  el: '#server-edit',
  template: templates[`server-edit`],

  render() {
    const modelData = this.model.toJSON();
    const templateData = Object.assign({}, modelData, {
      serverTypes: Object.values(ServerType).map((type) => {
        return {
          value: type,
          isSelected: modelData.server_type === type,
        };
      })
    });

    this.$el.html(this.template(templateData));
    return this;
  },
});

export default ServerEdit;
