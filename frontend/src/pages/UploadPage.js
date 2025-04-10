// src/pages/UploadPage.js
import {
  Box,
  Button,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
  Heading,
} from "@chakra-ui/react";
import { useRef, useState,  } from "react";
import { UploadFile } from "../pages/api";

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");
  const [uploads, setUploads] = useState([]);
  const uploadRef = useRef();
  const toast = useToast();

  const handleUpload = async () => {
    if (!file) return;

    try {
      const response = await UploadFile(file, password);

      if (response?.id || response?.path) {
        const newUpload = {
          name: file.name,
          id: response.id || response.path.split("/").pop(),
          url:
            response.path ||
            `${window.location.origin}/download/${response.id}`,
        };
        setUploads((prev) => [...prev, newUpload]);
        setPassword("");
        setFile(null);
        uploadRef.current.value = null;
        toast({
          title: "File uploaded successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      toast({
        title: "Upload failed.",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCopyLink = (fileId) => {
    const downloadUrl = `${window.location.origin}/download/${fileId}`;
    navigator.clipboard.writeText(downloadUrl);
    toast({
      title: "Link copied!",
      description: "Download link copied to clipboard.",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleDownload = async (fileId) => {
    const enteredPassword = prompt("Enter password:");
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    try {
      const res = await fetch(
        `${backendUrl}/files/${fileId}?password=${enteredPassword || ""}`
      );

      if (!res.ok) {
        const data = await res.json();
        toast({
          title: "Download failed",
          description: data.message || "Invalid password or file not found.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      const data = await res.json();

      const fileRes = await fetch(data.url);
      const blob = await fileRes.blob();
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = data.name;
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(downloadUrl);

      toast({
        title: "Download started",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "An error occurred during download.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async (fileId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this file?"
    );
    if (!confirmDelete) return;

    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    try {
      const res = await fetch(`${backendUrl}/files/${fileId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setUploads((prev) => prev.filter((upload) => upload.id !== fileId));
        toast({
          title: "File deleted",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        const data = await res.json();
        throw new Error(data.message || "Failed to delete file");
      }
    } catch (err) {
      toast({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      p={4}
      w="100%"
      maxW="1200px"
      mx="auto"
    >
      <Box
        w="100%"
        maxW={{ base: "100%", md: "500px" }}
        p={6}
        bg="white"
        borderRadius="lg"
        borderWidth="1px"
        boxShadow="md"
        mb={8}
      >
        <Heading size="md" mb={4} textAlign="center">
          Upload File
        </Heading>

        <Input
          type="password"
          placeholder="Enter password (optional)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          mb={3}
        />

        <Input
          type="file"
          ref={uploadRef}
          onChange={(event) => setFile(event.target.files[0])}
          display="none"
        />

        <Button
          colorScheme="gray"
          onClick={() => uploadRef.current.click()}
          w="100%"
          mb={3}
        >
          {file ? file.name : "Choose File"}
        </Button>

        <Button
          colorScheme="blue"
          onClick={handleUpload}
          w="100%"
          isDisabled={!file}
        >
          Upload
        </Button>
      </Box>

      {uploads.length > 0 && (
        <Box
          w="100%"
          p={4}
          bg="white"
          borderRadius="lg"
          borderWidth="1px"
          boxShadow="md"
          overflowX="auto"
        >
          <Heading size="md" mb={4}>
            Uploaded Files
          </Heading>

          <Table variant="striped" colorScheme="gray">
            <Thead>
              <Tr>
                <Th>File Name</Th>
                <Th>Copy Link</Th>
                <Th>Download</Th>
                <Th>Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {uploads.map((upload) => (
                <Tr key={upload.id}>
                  <Td>{upload.name}</Td>
                  <Td>
                    <Button
                      size="sm"
                      colorScheme="teal"
                      onClick={() => handleCopyLink(upload.id)}
                    >
                      Copy
                    </Button>
                  </Td>
                  <Td>
                    <Button
                      size="sm"
                      colorScheme="green"
                      onClick={() => handleDownload(upload.id)}
                    >
                      Download
                    </Button>
                  </Td>
                  <Td>
                    <Button
                      size="sm"
                      colorScheme="red"
                      onClick={() => handleDelete(upload.id)}
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </Box>
  );
};

export default UploadPage;
