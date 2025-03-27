import NextAuth from "next-auth";

const handler = NextAuth({
  provier: [],
});

export { handler as GET, handler as POST };
