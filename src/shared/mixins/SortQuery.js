import {identity, orderBy, pickBy} from "lodash";
/* Allow pages to easily implement sorting which sets a query param to the url, and reads from it when the page is loaded*/
export const sortQueryMixin = {
    data() {
        return {
            sort: '',
        };
    },
    mounted() {
        // When the page is loaded, fetch the 'search' query param from the url or default to an empty string
        this.sort = this.$route.query['sort'] || '';
    },
    watch: {
        // When the search value changes, add it to the query params
        sort(v) {
            const query = pickBy({...this.$route.query, sort: v}, identity);
            this.$router.replace({query});
        },
    },
    computed: {
        sortOrder() {
            return !this.sort.startsWith('-') ? 'asc' : 'desc';
        },
        sortField() {
            return this.sort.replace(/^-/, ''); // Remove first character if its a dash
        },
        // The components which use this mixin should override this computed property
        itemsToSort() {
            return [];
        },
        // This sorted list of items which should be used as an output by the component which implements this mixin
        sortedItems() {
            if (!this.sortField) return this.itemsToSort;
            return orderBy(this.itemsToSort, [this.sortField], [this.sortOrder]);
        }
    },
    methods: {
        toggleSortByCol(col) {
            if (!this.sort.endsWith(col)) {
                this.sort = col;
            } else {
                // Toggle direction
                const ascending = !this.sort.startsWith('-');
                if (ascending) {
                    this.sort = `-${col}`;
                } else {
                    this.sort = '';
                }
            }
        }
    },
};
