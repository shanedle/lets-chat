import { FC } from "react";
import { useRouter } from "next/router";
import { Avatar, Flex, Text, useColorMode } from "@chakra-ui/react";
import { collection, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { auth, db } from "@/firebase/config";

import { directMessageProps } from "@/utils/types";

const ChatRooms: FC = ({ users, id }: directMessageProps) => {
  const [user] = useAuthState(auth);
  const { colorMode } = useColorMode();

  const router = useRouter();

  const filtered = users?.filter((singleUser) => singleUser !== user.email)[0];

  const [foundUser] = useCollectionData(
    query(collection(db, "users"), where("email", "==", filtered))
  );

  const handleClick = () => {
    router.push(`/chats/${id}`);
  };

  return (
    <Flex
      align="center"
      p={4}
      cursor="pointer"
      _hover={{ bg: colorMode === "light" ? "gray.200" : "gray.700" }}
      onClick={handleClick}
    >
      {foundUser?.length > 0 ? (
        <Avatar
          mr={4}
          name={foundUser?.[0].displayName}
          src={foundUser?.[0].photoURL}
        />
      ) : (
        <Avatar
          mr={4}
          name={filtered}
          bg={colorMode === "light" ? "teal.600" : "teal.500"}
        />
      )}
      <Text>{filtered}</Text>
    </Flex>
  );
};

export default ChatRooms;
