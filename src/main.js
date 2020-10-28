import {createApp} from 'vue'
import App from "./App";
import router from './router'
import ConfirmationModal from "@/shared/components/ConfirmationModal";
import ModalTemplate from "@/shared/components/ModalTemplate";
import SearchBar from "@/shared/components/SearchBar";
import SearchSelect from "@/shared/components/SearchSelect";
import Table from "@/shared/components/Table";

// Mount the root component on the element with the id of app
const app = createApp(App);
app.use(router);
app.component('ConfirmationModal', ConfirmationModal);
app.component('ModalTemplate', ModalTemplate);
app.component('SearchBar', SearchBar);
app.component('SearchSelect', SearchSelect);
app.component('Table', Table);
app.mount('#app');
