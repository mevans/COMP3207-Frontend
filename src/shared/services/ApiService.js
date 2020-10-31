import axios from 'axios';

const masterCode = 'UxokqFkAblY9TsHRiGadj/Kf7zShNpPxV4Vu9CisBiwyvJo1amXI7A==';

const client = axios.create({
    baseURL: 'https://track-and-trace-functions.azurewebsites.net/api/',
    params: {
        code: masterCode,
    },
});

/* Service for communicating with the api*/
export const ApiService = (() => {
    /* Api calls can have topics eg. users, checkins etc. here we can add listeners to those topics, to do something after an api call is done on them*/
    const listeners = {};
    /* Basic axios wrapper which also triggers a listener for the topic and returns the data*/
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
            // Here a topic is specified, so if a listener is added for 'users', then it will be called after this request has completed
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
        updateVenue(venue) {
            return execute({topic: 'venues', method: 'PATCH', url: 'venueupdate', data: venue});
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
        reportUser(report) {
            return execute({method: 'POST', url: 'reportpositive', data: report});
        },
        getReports() {
            return execute({method: 'GET', url: 'generatereport'});
        }
    };
    return controller;
})();
