export const useConfirm = (message = "", onConfirm, onCancel) => {
  if (!onConfirm && typeof onConfirm !== "function") {
    return;
  }
  if (!onCancel && typeof onCancel !== "function") {
    return;
  }
  const conFirmAction = () => {
    if (confirm(message)) {
      onConfirm();
    } else {
      onCancel();
    }
  };
  return conFirmAction;
};
