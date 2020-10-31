import {computed, reactive, ref} from "@vue/reactivity";
import {ApiService} from "@/shared/services/ApiService";

/*
Reactive store for the app which contains users, venues and checkins. The data is all fetched when it is initialised
to reduce spinners while navigating around the app
*/
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
                // This function will at least take 500 ms, so the loading screen doesn't FLASH initially which could look jarring
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
        // Refresh the different models in the store by replacing all the items in place
        refreshUsers: () => ApiService.getUsers().then(users => _data.users.splice(0, _data.users.length, ...users)),
        refreshVenues: () => ApiService.getVenues().then(venues => _data.venues.splice(0, _data.venues.length, ...venues)),
        refreshCheckins: () => ApiService.getCheckins().then(checkins => _data.checkins.splice(0, _data.checkins.length, ...checkins)),
    };
    return controller;
})();

/*
Selectors are used by components so they don't have to interact directly with the store
This decreases coupling and means in the future this state management solution could easily be switched out
*/
export const Selectors = {
    initialising: Store.initialising,
    users: Store.select('users'),
    venues: Store.select('venues'),
    checkins: Store.select('checkins'),
    // The checkins from the api only return the venue id / user id, this selector 'inlines' the correct venue/user object for ease of use
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
