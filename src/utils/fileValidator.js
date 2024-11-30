export const validateFile = (fileName) => {
    const validExtensions = ["image/png", "image/jpg", "image/jpeg"];
    const fileExtension = fileName.split(".").pop()?.toLowerCase();
    return validExtensions.includes(fileExtension || "");
  };  