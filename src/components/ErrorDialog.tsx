import React, { useState } from "react";
import { t } from "../i18n";

import { Dialog } from "./Dialog";

export const ErrorDialog = ({
  message,
  onClose,
}: {
  message: string;
  onClose?: () => void;
}) => {
  const [modalIsShown, setModalIsShown] = useState(!!message);

  const handleClose = React.useCallback(() => {
    setModalIsShown(false);

    if (onClose) {
      onClose();
    }
  }, [onClose]);

  return (
    <>
      {modalIsShown && (
        <Dialog
          maxWidth={500}
          onCloseRequest={handleClose}
          title={t("errorDialog.title")}
          hide={null}
        >
          <div>{message}</div>
        </Dialog>
      )}
    </>
  );
};
