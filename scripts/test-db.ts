import dbConnect from '../lib/mongodb';
import { Service, Contact, Project, Admin } from '../models';

async function testDatabase() {
  console.log('🧪 Testing MongoDB Connection...\n');

  try {
    // Connect to database
    await dbConnect();
    console.log('✅ Database connected successfully\n');

    // Test collections
    console.log('📊 Checking collections...');
    
    const serviceCount = await Service.countDocuments();
    const contactCount = await Contact.countDocuments();
    const projectCount = await Project.countDocuments();
    const adminCount = await Admin.countDocuments();

    console.log(`  - Services: ${serviceCount} documents`);
    console.log(`  - Contacts: ${contactCount} documents`);
    console.log(`  - Projects: ${projectCount} documents`);
    console.log(`  - Admins: ${adminCount} documents\n`);

    console.log('✅ All models are working correctly!\n');
    console.log('📝 Database Setup Complete!');
    console.log('\nNext steps:');
    console.log('  1. Update MONGODB_URI in .env with your MongoDB connection string');
    console.log('  2. Run: npm run db:seed (if you have seed script)');
    console.log('  3. Start using the models in your API routes\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Database connection test failed:');
    console.error(error);
    process.exit(1);
  }
}

testDatabase();
