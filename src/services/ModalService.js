export const ModalService = (() => {
    let onShow = (m) => {
        console.log(`showing modal: ${m}`);
    };
    let onDismiss = () => {
        console.log(`dismissing modal`);
    };
    let resolve;
    const controller = {
        initialise(_onShow, _onDismiss) {
            onShow = _onShow;
            onDismiss = _onDismiss;
        },
        showModal(m) {
            onShow(m);
            return new Promise((_resolve) => {
                resolve = _resolve;
            });
        },
        dismiss(data) {
            onDismiss();
            resolve(data);
        },
    };
    return controller;
})();
