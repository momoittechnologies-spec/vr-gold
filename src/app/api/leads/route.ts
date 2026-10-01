import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const trackingQuery = searchParams.get('track');

    // If tracking query is supplied, allow public tracking lookup
    if (trackingQuery) {
      const lead = db.getLeadByIdOrCode(trackingQuery);
      if (!lead) {
        return NextResponse.json({ found: false, message: 'No record found with this reference code or phone number.' });
      }
      return NextResponse.json({
        found: true,
        type: 'LEAD',
        record: {
          trackingCode: lead.trackingCode,
          name: lead.name,
          serviceType: lead.serviceType,
          bankName: lead.bankName,
          estimatedGrams: lead.estimatedGrams,
          status: lead.status,
          createdAt: lead.createdAt,
          updatedAt: lead.updatedAt,
        },
      });
    }

    // Otherwise, require staff/admin session for full CRM leads view
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const leads = db.getLeads();
    return NextResponse.json({ success: true, leads });
  } catch (error) {
    console.error('Error in leads GET:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, serviceType, bankName, estimatedGrams, pledgeAmount, location, preferredDate, preferredTime, notes } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone number are required' }, { status: 400 });
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      return NextResponse.json({ error: 'Please enter a valid 10-digit mobile number' }, { status: 400 });
    }

    const newLead = db.createLead({
      name: name.trim(),
      phone: cleanPhone,
      serviceType: serviceType || 'DOORSTEP_RELEASE',
      bankName: bankName || 'Kadapa Bank Branch',
      estimatedGrams: Number(estimatedGrams) || 0,
      pledgeAmount: pledgeAmount ? Number(pledgeAmount) : undefined,
      location: location || 'Kadapa',
      preferredDate: preferredDate || 'Today',
      preferredTime: preferredTime || 'Immediate',
      notes: notes || '',
    });

    return NextResponse.json({
      success: true,
      message: 'Your request has been received by the VR GOLD Kadapa desk.',
      lead: newLead,
      trackingCode: newLead.trackingCode,
    });
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json({ error: 'Failed to submit request' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { id, status, notes, assignedStaff } = body;

    if (!id) {
      return NextResponse.json({ error: 'Lead ID is required' }, { status: 400 });
    }

    const updated = db.updateLead(id, {
      ...(status ? { status } : {}),
      ...(notes !== undefined ? { notes } : {}),
      ...(assignedStaff !== undefined ? { assignedStaff } : {}),
    });

    if (!updated) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, lead: updated });
  } catch (error) {
    console.error('Error updating lead:', error);
    return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 });
  }
}
