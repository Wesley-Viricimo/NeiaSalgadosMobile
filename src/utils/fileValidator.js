export const validateFile = (fileName) => {
    const validExtensions = ["png", "jpg", "jpeg"];
    const fileExtension = fileName.split(".").pop()?.toLowerCase();
    return validExtensions.includes(fileExtension || "");
  };  