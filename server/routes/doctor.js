import prisma from "../db/index.js";
import express from "express";
import passport from "passport";
import upload from "../middlewares/multer.js";
import cloudinary from "../utils/cloudinary.js";
const router = express.Router();

//finds all Doctors
router.get('/', async (req, res) => {
    try {
        const doctors = await prisma.doctor.findMany()
        res.json(doctors);
        res.status(200)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" })
    }

});

//find a specific doctor using id in the params

router.get('/:doctorId', async (req, res) => {
    try {
        const doctorId = req.params.doctorId
        const doctor = await prisma.doctor.findFirst({
            where: {
                id: parseInt(doctorId)
            }
        })
        res.status(200).json({
            sucess: true,
            clinic
        })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Jose" });
    }

});

//find all doctors for specific clinic using clinic id in the params
router.get('/userdoctor', async (req, res) => {
    try {
        const doctors = await prisma.doctor.findMany({
            where: {
                userId: parseInt(req.user.id)
            },
        },

        )
        res.json(doctors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" })
    }

});


//create a doctor
router.post('/', async (req, res) => {
    const {  firstName,lastName, specialization, address, city, state, zipcode, phonenumber, email,  hospital, userId } = req.body;

    try {
        const doctors = await prisma.doctor.create(   
            {
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    specialization: specialization,
                    address: address,      
                    city: city,         
                    state: state,       
                    zipcode: zipcode,        
                    phonenumber: phonenumber,
                    email: email,
                    hospital: hospital,
                    userId: req.user.id


                },
            });

        res.status(201)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
});

//delete a doctor
router.delete('/:doctorId', async (req, res) => {
    try {
      const doctorId = req.params.doctorId;
      const doctor = await prisma.doctor.deleteMany({
        where: { 
            userId: req.user.id,
          id: parseInt(req.params.doctorId)
        }
      });
      
      if (deleteDoctor) {
        const doctorList = await prisma.doctor.findMany({
          where: {
            userId: req.user.id,
          }
        });
      res.status(200).json({
        success: true,
        message: "Doctor deleted successfully"
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


  //edit a doctor
  router.put('/:doctorId', async (req, res) => {
    try {
      const doctorId = req.params.clinicId;
      const { firstName,lastName,specialization,phonenumber,email,address,city,state,zipcode,hospital } = req.body;
  
      const updatedDoctor = await prisma.doctor.updateMany({
        where: {
          userId: req.user.id,
          id: parseInt(req.params.doctorId)
        },
        data: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            specialization: req.body.specialization,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zipcode: req.body.zipcode,
            hospital: req.body.hospital,
            phonenumber: req.body.phonenumber,
            email: req.body.email,
          
        }
      });
  
      if (updatedDoctor) {
        const doctorList = await prisma.doctor.findMany({
          where: {
            userId: req.user.id,
          }
        });
  
        res.status(200).json({
          success: true,
          message: "Doctor updated successfully"
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Doctor not updated. Something failed"
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server Error" });
    }
  });

  //Upload a image and link to clinic. Need to put "image" as the key
router.post('/upload/:doctorId', upload.single('image'),  function (req, res) {
  cloudinary.uploader.upload(req.file.path, async function (err, result){
    if(err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Error"
      })
    } else {
      const addImg = await prisma.doctor.updateMany({
        where: {
          id: Number(req.params.doctorId)
        },
        data: {
          img: result.url
        }
      })
    }

    res.status(200).json({
      success: true,
      message:"Uploaded!",
      data: result
    })
  })
});
  
  


export default router;