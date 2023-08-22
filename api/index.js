const express=require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const Place =require('./models/Place');
const Booking = require('./models/Booking');
const jwt=require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const fs=require('fs');
require('dotenv').config();
var cors = require('cors');
const app=express();
const jwtSecret="1rg5e1gd5f8e54g19621fe6d2wewgfg";


const corsOptions = {
    credentials:true,
    origin: 'http://localhost:5173', //set our frontend url
    optionsSuccessStatus: 200 
  };

  app.use(cors(corsOptions));  
  app.use(cookieParser());
  app.use(express.json());
  app.use('/uploads',express.static(__dirname+'/uploads'));
console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL);

app.get('/test',(req,res)=>{
    res.json('test ok');
});
//mongodb varshneeld varsh2706
app.post('/register',async (req,res)=>{
    const name = req.body.name;  //get data from req obj
    const email = req.body.email;
    const pwd = req.body.pwd;
    try {
        const UserDoc = await User.create({
            name,
            email,
            pwd,
        });
        res.json(UserDoc);
    } catch (e) {
        res.status(422).json(e);
    }
});

app.post('/login',async(req,res)=>{
    const {email,pwd}=req.body;
    const UserDoc = await User.findOne({email})
    if (UserDoc) {
        const pass = UserDoc.pwd;
        if(pass==pwd){
            jwt.sign({email:UserDoc.email,_id:UserDoc._id},jwtSecret,{},(err,token)=>{
                if (err) throw err;
                res.cookie('token',token).json(UserDoc);
                document.cookie = `token=${token}; path=/;`;
                res('Token cookie set:', document.cookie);
            });
        }
        else{
            res.json('Login failed');
        }
    } else {
        res.json('user not found');
        console.log('not found');
    }
})


app.get('/profile', (req, res) => {
    const { token } = req.cookies;
  
    if (!token) {
      // No token found in cookies
      return res.status(401).json({ error: 'No token found' });
    }
  
    // Verify the token
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) {
        // Invalid token
        return res.status(401).json({ error: 'Invalid token' });
      }
  
      try {
        const { name, email, _id } = await User.findById(userData._id);
        res.json({ name, email, _id });
      } catch (error) {
        // Error fetching user data
        res.status(500).json({ error: 'Error fetching user data' });
      }
    });
  });

  app.post('/logout', (req, res) => {
    try {
      res.cookie('token','').json(true);
    } catch (error) {
      res.json(error); 
    }
  });


  const photosmidware = multer({dest:'uploads'});
  app.post('/upload', photosmidware.array('photos', 100), (req, res) => {
    const uploadedFile = [];
    for (let i = 0; i < req.files.length; i++) {
      const { path, originalname } = req.files[i];
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      const newFileName = `${Date.now()}_${i}.${ext}`;
      const newPath = __dirname + '/uploads/' + newFileName;
  
      try {
        fs.renameSync(path, newPath);
        uploadedFile.push(newFileName); // Store the new filename in the array
      } catch (error) {
        console.error('Error renaming file:', error);
      }
    }
    res.json(uploadedFile); // Respond with the new filenames
  });


  app.post('/places',(req,res)=>{
    const {token} = req.cookies;
    const {title,address,pincode,photos,description,perks,extraInfo,cuisine,price,contact}=req.body;
    if (!token) {
      // No token found in cookies
      return res.status(401).json({ error: 'No token found' });
    }
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const placeDoc = await Place.create({
        owner:userData.id,
        title,address,pincode,photos,description,perks,extraInfo,cuisine,price,contact,
      });
      res.json(placeDoc); 
    });
  });


  app.get('/places',(req,res)=>{
    const {token} = req.cookies;
    if (!token) {
      // No token found in cookies
      return res.status(401).json({ error: 'No token found' });
    }
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const {id}=userData;
      res.json(await Place.find({owner:id})); 
    });
  });

  app.get('places/:id',async (req,res)=>{
    const {id} = req.params;
    res.json(await Place.findById(id));
  })


  app.get('/allplaces',async (req,res)=>{
    res.json(await Place.find());
  })
  
  app.get('/places/:id',async(req,res)=>{
    const {id} = req.params;
    res.json(await Place.findById(id));
  })

 // Server
 app.post('/bookings', async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ error: 'No token found' });
    }

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;

      const { user, date, time, count, name, phone, place } = req.body;

      const bookingData = {
        user: userData._id, // Get the user's ID from the JWT data
        place,
        date,
        time,
        count,
        name,
        phone,
      };

      const booking = new Booking(bookingData);

      const savedBooking = await booking.save();
      res.status(201).json(savedBooking);
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the booking.' });
  }
});

app.get('/bookings',async(req,res)=>{
  const {token} = req.cookies;
    if (!token) {
      return res.status(401).json({ error: 'No token found' });
    }
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      console.log(userData);
      res.json(await Booking.find({user:userData._id}).populate('place')); 
    });
})




app.listen(8080);