import axios from 'axios';

const masterCode = 'UxokqFkAblY9TsHRiGadj/Kf7zShNpPxV4Vu9CisBiwyvJo1amXI7A==';

const client = axios.create({
    baseURL: 'https://track-and-trace-functions.azurewebsites.net/api/',
    params: {
        code: masterCode,
    },
});

export const ApiService = (() => {
    const listeners = {};
    const execute = ({method, url, topic, data = {}, params = {}}) => {
        return client({
            method,
            url,
            data,
            params,
        }).then(res => {
            if (listeners[topic]) {
                listeners[topic]();
            }
            return res.data;
        });
    };
    const controller = {
        addListener(topic, cb) {
            listeners[topic] = cb;
        },
        /* Users */
        getUsers() {
            return execute({method: 'GET', url: 'userread'})
        },
        getUser(id) {
            return execute({method: 'GET', url: 'userread', params: {id}});
        },
        createUser(user) {
            return execute({topic: 'users', method: 'POST', url: 'usercreate', data: user});
        },
        updateUser(user) {
            return execute({topic: 'users', method: 'PATCH', url: 'userupdate', data: user});
        },
        deleteUser(id) {
            return execute({topic: 'users', method: 'DELETE', url: 'userdelete', params: {id}});
        },
        /* Venues */
        getVenues() {
            return execute({method: 'GET', url: 'venueread'});
        },
        getVenue(id) {
            return execute({method: 'GET', url: 'venueread', params: {id}});
        },
        createVenue(venue) {
            return execute({topic: 'venues', method: 'POST', url: 'venuecreate', data: venue});
        },
        deleteVenue(id) {
            return execute({topic: 'venues', method: 'DELETE', url: 'venuedelete', params: {id}});
        },
        /* Checkins */
        getCheckins() {
            return execute({method: 'GET', url: 'checkinread'})
        },
        createCheckin(checkin) {
            return execute({topic: 'checkins', method: 'POST', url: 'checkincreate', data: checkin});
        },
        /* Reports */
        reportUser(id) {
            return execute({method: 'POST', url: 'reportpositive', params: {id}});
        },
    };
    return controller;
})();
