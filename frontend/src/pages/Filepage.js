import { Box } from "@chakra-ui/react";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { FileState } from "../Context/FileProvider";
import UploadPage from "./UploadPage";

const Filepage = () => {
  const { user } = FileState();

  return (
    <Box w="100vw" h="100vh">
      {user && <SideDrawer />}
      {
        <Box
          display="flex"
          justifyContent="space-between"
          w="100%"
          h="91.5vh"
          p="10px"
        >
          <UploadPage />
        </Box>
      }
    </Box>
  );
};

export default Filepage;
