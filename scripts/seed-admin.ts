import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin';
import Service from '../models/Service';
import Project from '../models/Project';
import 'dotenv/config';

async function seed() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('✅ Connected to MongoDB');

    // Create admin user
    const existingAdmin = await Admin.findOne({ email: 'admin@barrwit.com' });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await Admin.create({
        name: 'Admin User',
        email: 'admin@barrwit.com',
        password: hashedPassword,
        role: 'admin',
        isActive: true,
      });
      console.log('✅ Admin user created');
    } else {
      console.log('ℹ️  Admin user already exists');
    }

    // Create services if none exist
    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      const services = [
        {
          slug: 'software-development',
          title: 'Software Development',
          description: 'Custom software solutions tailored to your business needs',
          tagline: 'Build. Scale. Innovate.',
          longDescription: 'We deliver cutting-edge software solutions that transform how you operate.',
          imageSrc: '/services/software-development.svg',
          highlights: ['Web Applications', 'Mobile Apps', 'API Development', 'Cloud Solutions'],
          deliverables: ['Source Code', 'Documentation', 'Testing Reports', 'Deployment'],
          process: ['Discovery', 'Design', 'Development', 'Testing', 'Deployment'],
          isActive: true,
        },
        {
          slug: 'investment-management',
          title: 'Investment Management',
          description: 'Strategic investment solutions for wealth growth',
          tagline: 'Invest Smart. Grow Faster.',
          longDescription: 'Expert investment management to maximize your returns.',
          imageSrc: '/services/investment-management.svg',
          highlights: ['Portfolio Management', 'Risk Assessment', 'Market Analysis', 'Wealth Planning'],
          deliverables: ['Investment Strategy', 'Monthly Reports', 'Performance Metrics'],
          process: ['Consultation', 'Strategy', 'Implementation', 'Monitoring'],
          isActive: true,
        },
        {
          slug: 'business-development',
          title: 'Business Development',
          description: 'Accelerate your business growth',
          tagline: 'Grow Beyond Limits.',
          longDescription: 'Comprehensive business development strategies for sustainable growth.',
          imageSrc: '/services/business-development.svg',
          highlights: ['Market Research', 'Strategic Planning', 'Partnership Development', 'Revenue Growth'],
          deliverables: ['Business Plan', 'Market Analysis', 'Growth Strategy'],
          process: ['Analysis', 'Planning', 'Execution', 'Optimization'],
          isActive: true,
        },
        {
          slug: 'digital-transformation',
          title: 'Digital Transformation',
          description: 'Modernize your business for the digital age',
          tagline: 'Transform. Digitize. Succeed.',
          longDescription: 'End-to-end digital transformation to keep you competitive.',
          imageSrc: '/services/digital-transformation.svg',
          highlights: ['Process Automation', 'Digital Strategy', 'Technology Integration', 'Change Management'],
          deliverables: ['Transformation Roadmap', 'Implementation Plan', 'Training Materials'],
          process: ['Assessment', 'Strategy', 'Implementation', 'Training'],
          isActive: true,
        },
      ];

      await Service.insertMany(services);
      console.log('✅ Services created');
    } else {
      console.log('ℹ️  Services already exist');
    }

    // Create sample projects if none exist
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      const projects = [
        {
          title: 'Enterprise ERP System',
          slug: 'enterprise-erp-system',
          category: 'Software Development',
          description: 'Complete ERP solution for a multinational corporation',
          image: '/projects/erp.jpg',
          tags: ['React', 'Node.js', 'MongoDB', 'AWS'],
          results: [
            { metric: '50%', label: 'Efficiency Increase' },
            { metric: '3x', label: 'Faster Processing' },
          ],
          featured: true,
          isActive: true,
        },
        {
          title: 'Investment Portfolio Platform',
          slug: 'investment-portfolio-platform',
          category: 'Investment Management',
          description: 'Real-time portfolio management and analytics platform',
          image: '/projects/portfolio.jpg',
          tags: ['Next.js', 'Python', 'PostgreSQL', 'D3.js'],
          results: [
            { metric: '$10M+', label: 'Assets Managed' },
            { metric: '99.9%', label: 'Uptime' },
          ],
          featured: true,
          isActive: true,
        },
      ];

      await Project.insertMany(projects);
      console.log('✅ Projects created');
    } else {
      console.log('ℹ️  Projects already exist');
    }

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📧 Login Credentials:');
    console.log('   Email: admin@barrwit.com');
    console.log('   Password: admin123\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seed();
