<!-- Navigation component which generates buttons to navigate to routes-->
<script>
import {h} from "@vue/runtime-core";
import {RouterLink} from 'vue-router';

export default {
  name: "Nav",
  render() {
    // List of navigatable items which should be shown on the sidebar
    const navItems = [
      {path: '/users', title: 'Users'},
      {path: '/venues', title: 'Venues'},
      {path: '/checkins', title: 'Checkins'},
      {path: '/reports', title: 'Reports'},
    ];
    return h('div',
        // Create a router link component for each item, add the classes / path / title
        navItems.map(({path, title}) => {
          return h(RouterLink, {
            'class': 'list-group-item list-group-item-action border-right-0',
            'exact-active-class': 'active',
            'to': path,
          }, title);
        })
    );
  }
}
</script>

<style scoped>

</style>
