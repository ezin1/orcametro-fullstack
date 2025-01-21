// "use server";

// import { auth } from "@clerk/nextjs/server";
// import { db } from "@/app/_lib/prisma";

// export const sellerInfo = async (email: string) => {
//   const { userId } = await auth();
//   if (!userId) {
//     throw new Error("Unauthorized");
//   }

//   const verifyIfUserIsRegistered = await db.sellers.findUnique({
//     select: {
//         sellerId: true,
//         sellerName: true,
//         sellerEmail: true,

//   });

//   return { verifyIfUserIsRegistered };
// };
