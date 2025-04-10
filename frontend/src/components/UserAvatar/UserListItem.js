import { Avatar } from "@chakra-ui/react";
import { Box, Text } from "@chakra-ui/react";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      w="100%"
      display="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Avatar mr={3} size="sm" name={user?.name} src={user?.pic} />
      <Box>
        <Text fontWeight="bold">{user?.name}</Text>
        <Text fontSize="sm" color="gray.600">
          <b>Email:</b> {user?.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
