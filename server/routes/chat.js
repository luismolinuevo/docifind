import prisma from "../db/index.js";
import express from "express";
import passport from "passport";
const router = express.Router();

//create a chatroom
router.post("/createroom", async (req, res) => {
  try {
    const { userId, userTwoId } = req.body;
    const chatroom = await prisma.chatRoom.create({
      data: {
        users: {
          //this will link user one
          connect: [{ id: Number(userId) }, { id: Number(userTwoId) }],
        },
      },
      include: { users: true },
    });

    res.status(201).json({
      success: true,
      chatroom,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

//get all chats for a user
router.get(
  "/userchats",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const chatRooms = await prisma.chatRoom.findMany({
        where: {
          users: {
            some: {
              id: parseInt(req.user.id),
            },
          },
        },
        include: {
          messages: {
            orderBy: {
              createAt: "asc",
            },
          },
          users: true,
        },
      });

      res.status(200).json({
        success: true,
        chatRooms,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server Error" });
    }
  }
);

//get chatroom by chatroom id
router.get("/:id", async (req, res) => {
  const chatId = req.params.id;

  const getChat = await prisma.chatRoom.findFirst({
    where: {
      id: Number(chatId),
    },
    include: {
      messages: true,
      users: true
    },
  });

  res.status(200).json({
    success: true,
    getChat,
  });
});
