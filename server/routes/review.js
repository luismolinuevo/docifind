import prisma from "../db/index.js";
import express from "express";
const router = express.Router();

//get all reviews for clinic
router.get("/:clinicId", async (req, res) => {
    const clinicId = req.params.clinicId;

    const getReviews = await prisma.review.findMany({
        where: {
            clinicId: clinicId
        }
    });

    res.status(200).json({
        success: true,
        getReviews
    });
});

//get specifc review
router.get("/:reviewId", async (req, res) => {
    const reviewId = req.params.reviewId;

    const getReview = await prisma.review.findFirst({
        where: {
            id: reviewId
        }
    });

    res.status(200).json({
        success: true,
        getReview
    })
});

//create review
router.post("/:clinicId", async (req, res) => {
    const clinicId = req.params.clinicId;

    const createReview = await prisma.review.create({
        data: {
            rating: req.body.rating,
            comment: req.body.comment,
            clinicId: clinicId,
            userId: req.user.id
        }
    });
});

//edit review
router.put("/:clinicId", async (req, res) => {

})

//delete review
router.delete("/:clinicId", async (req, res) => {

})


export default router;