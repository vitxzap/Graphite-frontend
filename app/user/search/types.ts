export interface Alert {
  nm_alert: string;
  id_alert: number;
  desc_alert: string;
  query_alert: string;
  tb_client: {
    id_client: number;
    nm_client: string;
    num_project: string,
    id_server: number,
    tb_server: {
      id_server: number
      nm_server: string
      id_host: number;
      tb_host: {
        id_host: number
        nm_host: string,
        id_cloud_provider: number
        tb_cloud_provider: {
          id_cloud_provider: number,
          nm_cloud_provider: string
        }
      }
    }
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
