import Backbone from "backbone";

const ServerModel = Backbone.Model.extend({
  defaults: {
    customer_id: ``,
    server_name: ``,
    server_type: null,
  },
});

export default ServerModel;
