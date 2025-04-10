import { CloseIcon } from "@chakra-ui/icons";
import { Badge } from "@chakra-ui/react";

const UserBadgeItem = ({ user, handleFunction, admin }) => {
  return (
    <Badge
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize="12px"
      backgroundColor="cyan"
      color="white"
      cursor="pointer"
      display="flex"
      alignItems="center"
    >
      {user.name}
      {admin === user._id && <strong> (Admin)</strong>}
      <span
        onClick={handleFunction}
        style={{ marginLeft: "8px", cursor: "pointer" }}
      >
        <CloseIcon boxSize={3} />
      </span>
    </Badge>
  );
};

export default UserBadgeItem;
