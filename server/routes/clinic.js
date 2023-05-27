import prisma from "../db/index.js";
import express from "express";
const router = express.Router();

// GET route that gets all clinics
router.get('/userclinic', async (req, res) => {
    try {
        const clinics = await prisma.clinic.findMany({
            where: {
                userId: parseInt(req.user.id)
            },
        },

        )
        res.json(clinics);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" })
    }

});


// Get route to get all clinics for a certain user 
router.get('/', async (req, res) => {
    try {
        const clinics = await prisma.clinic.findMany({

        });

        res.json(clinics);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
});


router.get('/:clinicId', async (req, res) => {
    try {
        const clinicId = req.params.clinicId
        const clinic = await prisma.clinic.findFirst({
            where: {
                userId: parseInt(clinicId)
            }
        })
        res.status(200).json({
            sucess: true,
            clinic
        })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }

});



// post route 
router.post('/', async (req, res) => {
    const { phonenumber, email, address, name, description, userId } = req.body;

    try {
        const clinics = await prisma.clinic.create(
            {
                data: {
                    phonenumber: phonenumber,
                    email: email,
                    address: address,
                    name: name,
                    description: description,
                    userId: req.user.id


                },
            });

        res.status(201)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
});









export default router