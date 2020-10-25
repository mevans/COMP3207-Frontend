import axios from 'axios';

const masterCode = 'UxokqFkAblY9TsHRiGadj/Kf7zShNpPxV4Vu9CisBiwyvJo1amXI7A==';

const client = axios.create({
    baseURL: 'https://track-and-trace-functions.azurewebsites.net/api/',
    params: {
        code: masterCode,
    },
});

export const Api = {
    execute({method, url, data = {}, params = {}}) {
        return client({
            method,
            url,
            data,
            params,
        }).then(res => res.data);
    },
    /* Users */
    getUsers() {
        return this.execute({method: 'GET', url: 'userread'})
    },
    getUser(id) {
        return this.execute({method: 'GET', url: 'userread', params: {id}});
    },
    createUser(user) {
        return this.execute({method: 'POST', url: 'usercreate', data: user});
    },
    updateUser(user) {
        return this.execute({method: 'PATCH', url: 'userupdate', data: user});
    },
    deleteUser(id) {
        return this.execute({method: 'DELETE', url: 'userdelete', params: {id}});
    },
    /* Venues */
    getVenues() {
        return this.execute({method: 'GET', url: 'venueread'});
    },
    getVenue(id) {
        return this.execute({method: 'GET', url: 'venueread', params: {id}});
    },
    createVenue(venue) {
        return this.execute({method: 'POST', url: 'venuecreate', data: venue});
    },
    deleteVenue(id) {
        return this.execute({method: 'DELETE', url: 'venuedelete', params: {id}});
    },
    /* Checkins */
    createCheckin(checkin) {
        return this.execute({method: 'POST', url: 'checkincreate', data: checkin});
    }
}
