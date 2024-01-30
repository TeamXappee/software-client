export interface IToast {
    (message: string | React.ReactNode, data?: ExternalToast): string | number;
    success: (message: string | React.ReactNode, data?: ExternalToast) => string | number;
    info: (message: string | React.ReactNode, data?: ExternalToast) => string | number;
    warning: (message: string | React.ReactNode, data?: ExternalToast) => string | number;
    error: (message: string | React.ReactNode, data?: ExternalToast) => string | number;
    custom: (jsx: (id: number | string) => React.ReactElement, data?: ExternalToast) => string | number;
    message: (message: string | React.ReactNode, data?: ExternalToast) => string | number;
    promise: <ToastData>(promise: PromiseT<ToastData>, data?: PromiseData<ToastData> | undefined) => string | number;
    dismiss: (id?: number | string) => string | number;
    loading: (message: string | React.ReactNode, data?: ExternalToast) => string | number;
}