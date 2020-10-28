import {identity, pickBy} from "lodash";

export const basicSearchQueryMixin = {
    data() {
        return {
            search: '',
        };
    },
    mounted() {
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
