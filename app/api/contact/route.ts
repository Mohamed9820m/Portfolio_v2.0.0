import { NextRequest, NextResponse } from 'next/server';
import { sendContactFormEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log('Contact form submission received:', formData);

    // Send email notification to admin
    try {
      console.log('📧 Sending contact form email to mohamedhabibmarouani8@gmail.com...');
      const emailResult = await sendContactFormEmail(formData);
      console.log('✅ Contact form email sent successfully');
      console.log('📧 Email result:', emailResult);
    } catch (emailError) {
      console.error('❌ Email sending error:', emailError);
      console.error('❌ Full error:', JSON.stringify(emailError, null, 2));
      // Don't fail the request if email fails
    }

    return NextResponse.json(
      { 
        success: true,
        message: 'Message received successfully'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

