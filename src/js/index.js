import ServerCollection from "./collections/server-collection";
import Data from "./mock/data";
import ServerList from "./views/server-list";

new ServerList({collection: new ServerCollection(Data)});
