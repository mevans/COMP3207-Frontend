import {v4 as uuid} from 'uuid';

export const ToastService = (() => {
    let toasts = [];
    let onAdd = (t) => {
        console.log(`new toast: ${JSON.stringify(t)}`)
    };
    let onRemove = (t) => {
        console.log(`toast removed: ${JSON.stringify(t)}`)
    };
    const controller = {
        initialise(_onAdd, _onRemove) {
            onAdd = _onAdd;
            onRemove = _onRemove;
        },
        createToast(toast) {
            const id = uuid();
            toast = {
                ...{
                    text: toast.text || 'Default toast',
                    duration: toast.duration || 2000,
                    title: toast.title || 'Toast title'
                }, id
            };
            onAdd(toast);
            setTimeout(() => this.removeToast(id), toast.duration);
        },
        removeToast(id) {
            toasts = toasts.filter(toast => toast.id !== id);
            onRemove(id);
        }
    };
    return controller;
})();


