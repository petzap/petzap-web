import React from "react";
import { Avatar, Dialog, Flex, Text, VisuallyHidden } from "@radix-ui/themes";
import Image from "next/image";
interface DashboadCardProps {
  avatar?: string;
  fullName?: string;
  fallback?: string;
  timeago?: string;
  email?: string;
  userName?: string;
}

const ReusableAvatar: React.FC<DashboadCardProps> = ({
  avatar,
  fullName,
  fallback,
  timeago,
  email,
  userName = "User",
}) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Flex gap="3" align="center" className="cursor-pointer">
          <Avatar
            size="3"
            src={avatar}
            radius="full"
            fallback={fallback || "👤"}
          />
          <Text as="div" size="2" weight="bold">
            {fullName || userName}
          </Text>
        </Flex>
      </Dialog.Trigger>
      <Dialog.Content size="3" maxWidth="400px">
        <VisuallyHidden>
          <Dialog.Title />
        </VisuallyHidden>
        <Flex justify="center">
          <Flex direction="column" gap="3">
            <Image
              width={300}
              height={200}
              src={avatar || ""}
              alt="image"
              className="h-64 object-cover rounded-md"
            />
            <Flex
              direction="column"
              gap="3"
              className="bg-gray-100 rounded-md p-4"
            >
              <Flex gap="3">
                <Text size="2" className="font-semibold underline">
                  Full Name
                </Text>
                <Text size="2"> {fullName || userName}</Text>
              </Flex>
              {timeago && (
                <Flex gap="3">
                  <Text size="2" className="font-semibold underline">
                    Created At
                  </Text>
                  <Text size="2"> {timeago}</Text>
                </Flex>
              )}
              {email && (
                <Flex gap="3">
                  <Text size="2" className="font-semibold underline">
                    Email
                  </Text>
                  <Text size="2"> {email}</Text>
                </Flex>
              )}
              {userName && (
                <Flex gap="3">
                  <Text size="2" className="font-semibold underline">
                    User Name
                  </Text>
                  <Text size="2"> {userName}</Text>
                </Flex>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default ReusableAvatar;
