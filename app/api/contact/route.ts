import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Contact from '@/models/Contact';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    
    const contact = await Contact.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      company: body.company,
      phone: body.phone,
      service: body.service,
      serviceId: body.serviceId || null,
      budget: body.budget,
      message: body.message,
    });

    return NextResponse.json({ success: true, data: contact }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
