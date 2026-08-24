const mongoose = require('mongoose');
require('dotenv').config();

const Member = require('./models/Member');
const Trainer = require('./models/Trainer');
const ClassBooking = require('./models/ClassBooking');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/fitzone_db';

async function seedDatabase() {
  try {
    console.log(' Connecting to MongoDB for seeding...');
    await mongoose.connect(MONGO_URI);
    console.log(' Connected to MongoDB.');

    // Clear existing collection data
    await Member.deleteMany({});
    await Trainer.deleteMany({});
    await ClassBooking.deleteMany({});
    console.log('🧹 Cleared existing database collections.');

    // 1. Seed Members
    const members = await Member.insertMany([
      {
        name: 'Bhargav Rathod',
        email: '24cs086@charusat.edu.in',
        membershipType: 'platinum'
      },
      {
        name: 'Alex Johnson',
        email: 'alex@fitzone.com',
        membershipType: 'premium'
      },
      {
        name: 'Priya Sharma',
        email: 'priya@fitzone.com',
        membershipType: 'basic'
      }
    ]);
    console.log(` Seeded ${members.length} Members.`);

    // 2. Seed Trainers
    const trainers = await Trainer.insertMany([
      {
        name: 'John Doe',
        specialization: 'HIIT & Cardio Blast',
        available: true
      },
      {
        name: 'Sarah Smith',
        specialization: 'Yoga & Pilates Mindset',
        available: false
      },
      {
        name: 'Mike Johnson',
        specialization: 'Heavy Weightlifting & Strength',
        available: true
      },
      {
        name: 'Emma Davis',
        specialization: 'Zumba & Aerobics',
        available: true
      }
    ]);
    console.log(` Seeded ${trainers.length} Trainers.`);

    // 3. Seed Class Bookings
    const booking = await ClassBooking.create({
      memberId: members[0]._id,
      trainerId: trainers[0]._id,
      className: 'Morning HIIT Cardio',
      date: '2026-08-25',
      timeSlot: '07:00 AM - 08:00 AM',
      status: 'booked'
    });

    console.log(' Seeded initial ClassBooking:', booking._id);

    // Verify Population
    const populatedBooking = await ClassBooking.findById(booking._id)
      .populate('memberId', 'name email')
      .populate('trainerId', 'name specialization');

    console.log('\n--- VERIFYING POPULATED BOOKING ---');
    console.log('Member Name:', populatedBooking.memberId.name);
    console.log('Member Email:', populatedBooking.memberId.email);
    console.log('Trainer Name:', populatedBooking.trainerId.name);
    console.log('Trainer Specialization:', populatedBooking.trainerId.specialization);

    console.log('\n✅ Database Seeding Completed Successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seedDatabase();
