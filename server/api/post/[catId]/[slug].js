import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  console.log(event.context);
  const singlePost = await prisma.post.findFirst({
    where: {
      post_url: `${event.context.params.catId}/post/${event.context.params.slug}`,
    },
  });

  const author = await prisma.user.findFirst({
    where: {
      user_id: singlePost.authorId,
    },
  });

  const finalPostData = {
    ...singlePost,
    authorId: author.name,
  };

  return finalPostData;
});
