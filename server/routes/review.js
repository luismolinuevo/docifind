import prisma from "../db/index.js";
import express from "express";
const router = express.Router();

//get all reviews for clinic
router.get("/:clinicId", async (req, res) => {
  const clinicId = req.params.clinicId;

  const getReviews = await prisma.review.findMany({
    where: {
      clinicId: clinicId,
    },
  });

  res.status(200).json({
    success: true,
    getReviews,
  });
});

//get specifc review
router.get("/:reviewId", async (req, res) => {
  const reviewId = req.params.reviewId;

  const getReview = await prisma.review.findFirst({
    where: {
      id: reviewId,
    },
  });

  res.status(200).json({
    success: true,
    getReview,
  });
});

//create review
router.post("/:clinicId", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const clinicId = req.params.clinicId;

  const createReview = await prisma.review.create({
    data: {
      rating: req.body.rating,
      comment: req.body.comment,
      clinicId: clinicId,
      userId: req.user.id,
    },
  });

  res.status(201).json({
    success: true,
  });
});

//edit review
router.put("/:clinicId", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const clinicId = req.params.clinicId;

  const editReview = await prisma.review.updateMany({
    where: {
      clinicId: clinicId,
      userId: req.user.id
    },
    data: {
      rating: req.body.rating,
      comment: req.body.comment,
      clinicId: clinicId,
    },
  });

  res.status(200).json({
    success: true,
    editReview
  })
});

//delete review
router.delete("/:clinicId", async (req, res) => {

});

export default router;
