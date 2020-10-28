import ConfirmationModal from "@/shared/components/ConfirmationModal";

export const ModalService = (() => {
    let onShow = () => {
        throw 'Modal shown without initialising the modal service';
    };
    let onDismiss = () => {
        throw 'Modal dismissed without initialising the modal service';
    };
    let shown = false;
    let resolve;
    const controller = {
        initialise(_onShow, _onDismiss) {
            onShow = _onShow;
            onDismiss = _onDismiss;
        },
        showModal(m, props) {
            if (shown) {
                throw 'A modal is already visible';
            }
            shown = true;
            onShow(m, props);
            return new Promise((_resolve) => {
                resolve = _resolve;
            });
        },
        showConfirmationModal(data) {
            return this.showModal(ConfirmationModal, data);
        },
        dismiss(data) {
            if (!shown) {
                throw 'A modal is not currently visible';
            }
            shown = false;
            onDismiss();
            resolve(data);
        },
    };
    return controller;
})();
