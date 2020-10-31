import {v4 as uuid} from 'uuid';
/* Service for displaying toasts - messages which don't require interaction */
export const ToastService = (() => {
    // Default add/remove functions, should be overridden by the toast controller component
    let onAdd = () => {
        throw 'Toast added without initialising the toast service';
    };
    let onRemove = () => {
        throw 'Toast removed without initialising the toast service';
    };
    let toasts = [];
    const controller = {
        initialise(_onAdd, _onRemove) {
            onAdd = _onAdd;
            onRemove = _onRemove;
        },
        createToast(toast) {
            // Create a toast, then after the duration then remove it
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


