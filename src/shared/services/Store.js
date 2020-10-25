import {computed, reactive, ref} from "@vue/reactivity";
import {ApiService} from "@/shared/services/ApiService";

export const Store = (() => {
    const initialising = ref(true);
    const _data = reactive({
        users: [],
        venues: [],
        checkins: [],
    });
    const controller = {
        initialise() {
            Promise.all([
                ApiService.getUsers(),
                ApiService.getVenues(),
                ApiService.getCheckins(),
                new Promise(resolve => setTimeout(resolve, 500))
            ]).then(([users, venues, checkins]) => {
                _data.users.push(...users);
                _data.venues.push(...venues);
                _data.checkins.push(...checkins);
                initialising.value = false;
            });
        },
        select: (name) => _data[name],
        initialising,
        refreshUsers: () => ApiService.getUsers().then(users => _data.users.splice(0, _data.users.length, ...users)),
        refreshVenues: () => ApiService.getVenues().then(venues => _data.venues.splice(0, _data.venues.length, ...venues)),
        refreshCheckins: () => ApiService.getCheckins().then(checkins => _data.checkins.splice(0, _data.checkins.length, ...checkins)),
    };
    return controller;
})();

export const Selectors = {
    initialising: Store.initialising,
    users: Store.select('users'),
    venues: Store.select('venues'),
    checkins: Store.select('checkins'),
    nestedCheckins: computed(() => {
        const checkins = Store.select('checkins');
        const users = Store.select('users');
        const venues = Store.select('venues');
        return checkins.map(checkin => ({
            ...checkin,
            venue: venues.find(v => v.id === checkin.venue),
            user: users.find(u => u.id === checkin.user),
        }));
    })
};
