import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutationState } from "@/hooks/useMutationState";
import { ConvexError } from "convex/values";
import { Check, User, X } from "lucide-react";
import React from "react";
import { toast } from "sonner";

type Props = {
  id: Id<"requests">;
  imageUrl: string;
  userName: string;
  email: string;
};

const Request = ({ id, imageUrl, userName, email }: Props) => {
  const { mutate: denyRequest, pending: denyPending } = useMutationState(
    api.request.deny,
  );

  const denyRequestHandler = (id: number) => {
    denyRequest({ id })
      .then(() => {
        toast.success("friend request deleted");
      })
      .catch((error) => {
        toast.error(
          error instanceof ConvexError
            ? error.data
            : "unexpected error occured",
        );
      });
  };

  return (
    <Card className="w-full p-2 flex flex-row items-center justify-between gap-2">
      <div className="flex items-center gap-4 truncate">
        <Avatar>
          <AvatarImage src={imageUrl} />
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col truncate">
          <h4 className="truncate">{userName}</h4>
          <p className="text-xs text-muted-foreground truncate">{email}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          size="icon"
          onClick={() => {}}
        >
          <Check />
        </Button>
        <Button
          disabled={denyPending}
          variant="destructive"
          size="icon"
          onClick={() => denyRequestHandler(id)}
        >
          <X className="size-4" />
        </Button>
      </div>
    </Card>
  );
};

export default Request;
