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

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
};


