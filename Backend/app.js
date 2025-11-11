const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000; // you can change this if needed

app.use(cors({
  origin: ['http://localhost:5173','https://hospital-appointment-0hnv.onrender.com'], 
  methods: ['GET', 'POST','PUT','DELETE'],
  credentials: true
}));
app.use(bodyParser.json());

// ============ MongoDB Connection ============
async function connectDB() {
  try {
    await mongoose.connect(
      'mongodb+srv://User01:y18a07s25hu@clusterrh.2lg54z5.mongodb.net/?appName=ClusterRH'
    );
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

// ============ Mongoose Schemas ============
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  address: String,
  doctor: String,
  date: String,
  time: String,
  status: { type: String, default: 'pending' }  
});

const User = mongoose.model('User', userSchema);
const Patient = mongoose.model('Patient', patientSchema);

// ============ Routes ============

// SIGNUP
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const newUser = new User({ username, password });
    await newUser.save();
    res.json({ message: 'Sign Up Successful!' });
  } catch (err) {
    res.status(500).json({ error: 'Error signing up user' });
  }
});

// LOGIN
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: 'Username and password are required.' });

  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password)
      return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role || 'user' },
      'mysecretkey', // use process.env.JWT_SECRET in production
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login Successful!',
      token,
      username: user.username,
      role: user.role || 'user',
    });
  } catch (err) {
    return res.status(500).json({ error: 'Database query error' });
  }
});


// GET ALL APPOINTMENTS
app.get('/appointments', async (req, res) => {
  try {
    const appointments = await Patient.find().sort({ date: 1, time: 1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching appointments' });
  }
});

app.post('/getappointment', async (req, res) => {
  const { name, age, gender, address, doctor, date, time } = req.body;

  try {
    const existing = await Patient.findOne({ doctor, date, time });

    if (existing) {
      return res.status(400).json({ error: 'Doctor already booked at this time.' });
    }

    const appointment = new Patient({
      name, age, gender, address, doctor, date, time, status: 'pending'
    });

    await appointment.save();
    res.json({ message: 'Appointment created successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Error saving appointment' });
  }
});


app.put('/appointments/:id/approve', async (req, res) => {
  console.log('PUT approve route hit for ID:', req.params.id);
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ error: 'Invalid appointment ID' });

    const appointment = await Patient.findByIdAndUpdate(
      id,
      { status: 'approved' },
      { new: true }
    );
    if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
    res.json({ message: 'Appointment approved', appointment });
  } catch (err) {
    console.error('Error approving appointment:', err);
    res.status(500).json({ error: 'Error approving appointment' });
  }
});

app.delete('/appointments/:id', async (req, res) => {
  console.log('DELETE route hit for ID:', req.params.id);
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ error: 'Invalid appointment ID' });

    const appointment = await Patient.findByIdAndDelete(id);
    if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
    res.json({ message: 'Appointment deleted successfully' });
  } catch (err) {
    console.error('Error deleting appointment:', err);
    res.status(500).json({ error: 'Error deleting appointment' });
  }
});


// ============ Start Server ============
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on http://localhost:${PORT}`);
});
