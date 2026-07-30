"use client";

import ItemList from "@/components/shared/item-list/ItemList";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import React from "react";
import DMconversationItem from "./_components/DMconversationItem";

type Props = React.PropsWithChildren<{}>;

const ConversationsLayout = ({ children }: Props) => {
  const conversations = useQuery(api.conversations.get);

  return (
    <>
      <ItemList title="Conversation">
        {conversations ? (
          conversations.length === 0 ? (
            <p className="w-full h-full flex items-center justify-center">
              No conversation founds
            </p>
          ) : (
            conversations.map((conversations) => {
              return conversations.conversation.isGroup ? null : (
                <DMconversationItem
                  key={conversations.conversation._id}
                  id={conversations.conversation._id}
                  username={conversations.otherMember?.username || ""}
                  imageUrl={conversations.otherMember?.imageUrl || ""}
                />
              );
            })
          )
        ) : (
          <div className="h-full w-full flex justify-center items-center">
            <Loader2 size={64} />
          </div>
        )}
      </ItemList>
      {children}
    </>
  );
};

export default ConversationsLayout;
