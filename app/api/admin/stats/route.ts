import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Service from '@/models/Service';
import Contact from '@/models/Contact';
import Project from '@/models/Project';

// GET - Fetch admin dashboard stats
export async function GET() {
  try {
    await dbConnect();
    
    const [
      totalServices,
      activeServices,
      totalContacts,
      newContacts,
      totalProjects,
      featuredProjects
    ] = await Promise.all([
      Service.countDocuments(),
      Service.countDocuments({ isActive: true }),
      Contact.countDocuments(),
      Contact.countDocuments({ status: 'new' }),
      Project.countDocuments(),
      Project.countDocuments({ featured: true })
    ]);

    // Get recent contacts
    const recentContacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('firstName lastName email service status createdAt');

    return NextResponse.json({
      success: true,
      data: {
        services: {
          total: totalServices,
          active: activeServices
        },
        contacts: {
          total: totalContacts,
          new: newContacts,
          recent: recentContacts
        },
        projects: {
          total: totalProjects,
          featured: featuredProjects
        }
      }
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
