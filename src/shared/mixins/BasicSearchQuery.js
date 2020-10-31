import {identity, pickBy} from "lodash";
/* Allow pages to easily implement a search bar which sets a query param to the url, and reads from it when the page is loaded*/
export const basicSearchQueryMixin = {
    data() {
        return {
            search: '',
        };
    },
    mounted() {
        // When the page is loaded, fetch the 'search' query param from the url or default to an empty string
        this.search = this.$route.query['search'] || '';
    },
    watch: {
        // When the search value changes, add it to the query params
        search(v) {
            const query = pickBy({...this.$route.query, search: v}, identity);
            this.$router.replace({query});
        },
    },
};
