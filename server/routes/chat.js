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