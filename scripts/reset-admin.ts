import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin';
import 'dotenv/config';

async function resetPassword() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('✅ Connected to MongoDB');

    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const result = await Admin.updateOne(
      { email: 'admin@barrwit.com' },
      { 
        $set: { 
          password: hashedPassword,
          isActive: true 
        } 
      }
    );

    if (result.modifiedCount > 0) {
      console.log('✅ Password reset successfully!');
    } else {
      console.log('ℹ️  Admin user not found, creating new one...');
      await Admin.create({
        name: 'Admin User',
        email: 'admin@barrwit.com',
        password: hashedPassword,
        role: 'admin',
        isActive: true,
      });
      console.log('✅ Admin user created!');
    }

    console.log('\n📧 Login Credentials:');
    console.log('   Email: admin@barrwit.com');
    console.log('   Password: admin123\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

resetPassword();
