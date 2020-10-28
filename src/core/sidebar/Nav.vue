<script>
import {h} from "@vue/runtime-core";
import {RouterLink} from 'vue-router';

export default {
  name: "Nav",
  render() {
    const navItems = [
      {path: '/home', title: 'Home'},
      {path: '/users', title: 'Users'},
      {path: '/venues', title: 'Venues'},
      {path: '/checkins', title: 'Checkins'},
      {path: '/reports', title: 'Reports'},
    ];
    return h('div',
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
