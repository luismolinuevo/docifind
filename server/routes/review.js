import prisma from "../db/index.js";
import express from "express";
const router = express.Router();

//get all reviews for clinic
router.get("/:clinicId", async (req, res) => {

})

//get specifc review
router.get("/:reviewId", async (req, res) => {

})

//create review
router.post("/:clinicId", async (req, res) => {

})

//edit review
router.put("/:clinicId", async (req, res) => {

})

//delete review
router.delete("/:clinicId", async (req, res) => {
    
})


export default router;