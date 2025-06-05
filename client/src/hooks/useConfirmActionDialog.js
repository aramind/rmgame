import React, { useCallback, useState } from "react";
import ConfirmActionDialog from "../components/ConfirmActionDialog";
import useIsInMobile from "./useIsInMobile";

const useConfirmActionDialog = (setOpenParentDialog) => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [dialogProps, setDialogProps] = useState({
    title: "",
    content: "",
    confirmCallback: null,
  });

  const handleOpen = useCallback((title, content, confirmCallback) => {
    setDialogProps({
      title,
      content,
      confirmCallback,
    });
    setOpenConfirm(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpenConfirm(false);
  }, []);

  const handleConfirm = useCallback(() => {
    dialogProps.confirmCallback();
  }, [dialogProps]);

  const renderConfirmActionDialog = useCallback(() => {
    return (
      <ConfirmActionDialog
        open={openConfirm}
        setOpen={setOpenConfirm}
        title={dialogProps?.title}
        content={dialogProps.content}
        handleConfirm={handleConfirm}
        maxWidth={useIsInMobile ? "xl" : "md"}
      />
    );
  }, [dialogProps.content, dialogProps?.title, handleConfirm, openConfirm]);

  return { handleOpen, handleClose, renderConfirmActionDialog };
};

export default useConfirmActionDialog;
