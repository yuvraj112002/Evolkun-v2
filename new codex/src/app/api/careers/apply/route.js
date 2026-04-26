import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    
    // Extract form fields
    const applicationData = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      experience: formData.get('experience'),
      salary: formData.get('salary'),
      position: 'Social Media Executive',
      appliedAt: new Date().toISOString(),
    };

    // Handle CV file upload
    const cvFile = formData.get('cv');
    let cvPath = null;

    if (cvFile) {
      const bytes = await cvFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create unique filename
      const fileName = `${Date.now()}-${cvFile.name.replace(/\s+/g, '-')}`;
      cvPath = path.join(process.cwd(), 'public', 'uploads', 'cvs', fileName);

      // Save file
      await writeFile(cvPath, buffer);
      applicationData.cvPath = `/uploads/cvs/${fileName}`;
    }

    // Here you would typically:
    // 1. Save to database
    // 2. Send confirmation email to applicant
    // 3. Send notification email to HR
    // 4. Store CV in cloud storage

    // Example: Save to database (uncomment and configure based on your DB)
    // const db = await connectToDatabase();
    // await db.collection('applications').insertOne(applicationData);

    // Example: Send email notification (uncomment and configure)
    // await sendEmail({
    //   to: applicationData.email,
    //   subject: 'Application Received - Evolkun',
    //   template: 'application-confirmation',
    //   data: applicationData
    // });

    console.log('Application received:', applicationData);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Application submitted successfully',
        data: applicationData 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing application:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to submit application',
        error: error.message 
      },
      { status: 500 }
    );
  }
}