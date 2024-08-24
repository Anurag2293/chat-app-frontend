import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import prisma from "@/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Google({
			clientId: process.env.AUTH_GOOGLE_ID,
			clientSecret: process.env.AUTH_GOOGLE_SECRET,
			async profile(profile) {
				console.log({ profile });
				return { ...profile };
			}
		})
	],
	callbacks: {
		async signIn(params) {
			const accountExists = await prisma.user.findFirst({
				where: {
					email: params.user.email || ""
				}
			});
			if (!accountExists) {
				const newAccount = await prisma.user.create({
					data: {
						id: params.user.id,
						email: params.user.email || "",
						name: params.user.name || "",
					}
				});
				console.log({ newAccount });
			}
			return true;
		},
	}
});
