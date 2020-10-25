import ConfirmationModal from "@/shared/components/ConfirmationModal";

export const ModalService = (() => {
    let onShow = (m, props) => {
        console.log(`showing modal: ${m} with props ${props}`);
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
        showModal(m, props) {
            onShow(m, props);
            return new Promise((_resolve) => {
                resolve = _resolve;
            });
        },
        showConfirmationModal(data) {
            onShow(ConfirmationModal, data);
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
