// src/pages/api
export const UploadFile = async (file, password = "") => {
  if (!file) {
    return { error: "No file selected" };
  }

  try {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("password", password);

    const response = await fetch(`${backendUrl}/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to upload");
    }

    return data;
  } catch (error) {
    console.error("Error while uploading file:", error.message);
    return { error: error.message };
  }
};
