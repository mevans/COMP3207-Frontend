import axios from 'axios';

const client = axios.create({
    baseURL: 'https://track-and-trace-functions.azurewebsites.net/api/',
});

export const Api = {
    execute({method, url, code, data = {}, params = {}}) {
        return client({
            method,
            url,
            data,
            params: {
                ...params,
                code,
            },
        }).then(res => res.data);
    },
    getUsers() {
        const code = 'q1EppTCah1LQ2u9kOHSoUWmtz2l1PaRkYg1knE009hAJygZIpRvwdQ==';
        return this.execute({method: 'GET', url: 'userread', code})
    },
    getUser(id) {
        const code = 'q1EppTCah1LQ2u9kOHSoUWmtz2l1PaRkYg1knE009hAJygZIpRvwdQ==';
        return this.execute({method: 'GET', url: 'userread', code, params: {id}});
    },
    createUser(user) {
        const code = 'se0caWzzaXGN7cK17aZHs7Wek/jI6Se4S4ZT/cqQljGVuzO88hDgCg==';
        return this.execute({method: 'POST', url: 'usercreate', code, data: user});
    },
    updateUser(user) {
        const code = 'M7QoWwQL80mAfRqm8f1ht/DpMvFTHaS1a2FZKjns3dJDjcOgrRsFFg==';
        return this.execute({method: 'PATCH', url: 'userupdate', code, data: user});
    },
    deleteUser(id) {
        const code = 'Ik0G2BUeKt/okvUisPaWHiRNORxYSgTAhQZ6hRfSaeHdnGj/qaQ2Aw==';
        return this.execute({method: 'DELETE', url: 'userdelete', code, params: {id}});
    }
}
