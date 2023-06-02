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
                id: parseInt(clinicId)
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




router.delete('/:clinicId', async (req, res) => {
    try {
      const clinicId = req.params.clinicId;
      const clinic = await prisma.clinic.deleteMany({
        where: { 
            userId: req.user.id,
          id: parseInt(req.params.clinicId)
        }
      });
      
      if (deleteClinic) {
        const clinicList = await prisma.clinic.findMany({
          where: {
            userId: req.user.id,
          }
        });
      res.status(200).json({
        success: true,
        message: "Clinic deleted successfully"
      });

    } else {
        res.status(400), json({
          message: "Something went wrong, post could not be deleted!"
        })
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server Error" });
    }
  });
  
  router.put('/:clinicId', async (req, res) => {
    try {
      const clinicId = req.params.clinicId;
      const { phonenumber, email, address, name, description } = req.body;
  
      const updatedClinic = await prisma.clinic.updateMany({
        where: {
          userId: req.user.id,
          id: parseInt(req.params.clinicId)
        },
        data: {
          phonenumber: req.body.phonenumber,
          email: req.body.email,
          address: req.body.address,
          name: req.body.name,
          description: req.body.description,
        }
      });
  
      if (updatedClinic) {
        const clinicList = await prisma.clinic.findMany({
          where: {
            userId: req.user.id,
          }
        });
  
        res.status(200).json({
          success: true,
          message: "Clinic updated successfully"
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Clinic not updated. Something failed"
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server Error" });
    }
  });
  
  




export default router