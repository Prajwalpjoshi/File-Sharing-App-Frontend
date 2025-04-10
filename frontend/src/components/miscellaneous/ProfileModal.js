import { ViewIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
  Text,
  Image,
} from "@chakra-ui/react";

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children ? (
        <span onClick={onOpen} role="button" tabIndex="0">
          {children}
        </span>
      ) : (
        <IconButton
          display={{ base: "flex" }}
          icon={<ViewIcon />}
          onClick={onOpen}
          aria-label="View Profile"
        />
      )}

      <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent maxW="lg">
          <ModalHeader
            fontSize="2xl"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          >
            {user?.name || "Unknown User"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
            textAlign="center"
          >
            <Image
              borderRadius="full"
              boxSize="150px"
              src={user?.pic || "https://via.placeholder.com/150"}
              alt={user?.name || "Profile Picture"}
              border="2px solid #ccc"
              boxShadow="md"
              mb={4}
            />
            <Text
              fontSize={{ base: "20px", md: "24px" }}
              fontFamily="Work sans"
            >
              Email: {user?.email || "Not Available"}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
