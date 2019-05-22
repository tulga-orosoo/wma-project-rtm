import { NbToastrService} from '@nebular/theme'


export class NotificationFactory {

    constructor(private toastService?: NbToastrService, public type?: string) {

    }

    makeToast(type?: string, message?: String, title?: String, ): void {

        switch (type) {

            case 'warning':
                this.toastService.warning(message, title)
                break;

            case 'error':
                this.toastService.danger(message, title)
                break;

            case 'info':
                this.toastService.info(message, title)
                break;

            case 'success':
                this.toastService.success(message, title)
                break;

            case 'primary':
                this.toastService.primary(message, title)
                break;

            case 'default':
                this.toastService.default(message, title)
                break;
        }
    }
}
