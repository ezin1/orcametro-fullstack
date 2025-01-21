"use client";

import { Users } from "@prisma/client";
import { DrawerUpsertSeller } from "./drawer-upsert-seller";

interface CreateSellerButtonProps {
  userInfo: Users;
}

const CreateSellerButton = ({ userInfo }: CreateSellerButtonProps) => {
  return <DrawerUpsertSeller isUpdate={false} userInfo={userInfo} />;
};

export default CreateSellerButton;
