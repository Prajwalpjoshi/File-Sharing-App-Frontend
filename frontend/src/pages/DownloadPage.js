import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Input, Text, Heading, VStack } from "@chakra-ui/react";
import { toast } from "react-toastify";

const DownloadPage = () => {
  const { id: fileId } = useParams();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  const backendURL = process.env.REACT_APP_BACKEND_URL;

  const verifyPassword = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${backendURL}/files/${fileId}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Password verification failed");
      }

      const fileRes = await fetch(
        `${backendURL}/files/${fileId}?password=${password}`
      );
      const fileData = await fileRes.json();

      if (!fileRes.ok) {
        throw new Error(fileData.message || "Failed to fetch file URL");
      }

      const blobRes = await fetch(fileData.url);
      const blob = await blobRes.blob();

      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileData.name || "downloaded_file";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl);

      toast.success("File downloaded successfully!");
      setVerified(true);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="400px" mx="auto" mt="100px" p="6" shadow="lg" borderRadius="xl">
      <VStack spacing={4}>
        <Heading size="md">Download File</Heading>
        {!verified ? (
          <>
            <Text>Please enter the password to download the file:</Text>
            <Input
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
            <Button
              colorScheme="blue"
              onClick={verifyPassword}
              isLoading={loading}
              loadingText="Verifying"
            >
              Verify & Download
            </Button>
          </>
        ) : (
          <Text color="green.500">File downloaded successfully!</Text>
        )}
      </VStack>
    </Box>
  );
};

export default DownloadPage;
