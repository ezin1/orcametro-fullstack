"use client";

import { DrawerUpsertProducts } from "./drawer-upsert-product";

const CreateProductButton = () => {
  return <DrawerUpsertProducts isUpdate={false} />;
};

export default CreateProductButton;
