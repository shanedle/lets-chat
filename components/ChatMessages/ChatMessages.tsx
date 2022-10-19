import { FC } from "react";
import { Box, Flex, VStack } from "@chakra-ui/react";
import { collection, limit, orderBy, query, doc } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { db } from "@/firebase/config";

import { chatProps } from "@/utils/types";

import { Message } from "@/components/Message";

export const ChatMessages: FC<chatProps> = ({ scrollRef, id, chatType }) => {
  const [values] = useCollectionData(
    query(
      collection(db, `${chatType}`, id, "messages"),
      orderBy("createdAt", "asc")
    )
  );

  const messages = values?.map((msg) => (
    <Message
      key={Math.random()}
      id={msg.uid}
      message={msg.Message}
      photoURL={msg.photoURL}
    />
  ));

  return (
    <Flex grow="1" align="start" direction="column" overflowY="scroll" p="10px">
      {messages}
      <div ref={scrollRef}></div>
    </Flex>
  );
};