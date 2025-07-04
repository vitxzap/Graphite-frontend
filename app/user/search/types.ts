export type Alert = {
  nm_alert: string;
  id_alert: number;
  desc_alert: string;
  query_alert: string;
  tb_client: {
    id_client: number;
    nm_client: string;
  };
};
export interface formErrorHandler {
  name?: formErrorHandlerCamps,
  client?: formErrorHandlerCamps,
}
type formErrorHandlerCamps = {
  message?: string | undefined;
  invalid?: boolean
};
export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
}
export interface CreateAlertInput {
  name: string;
  description: string;
  clientId: number;
  query: string;
  link: string;
}
