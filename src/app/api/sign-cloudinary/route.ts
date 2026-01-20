import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const body = await request.json();
    const { paramsToSign } = body;

    // TODO: SECURITY CRITICAL
    // Ideally, verify the user is an admin using Firebase Admin SDK here.
    // const session = await getServerSession(); 
    // if (!session || session.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    // For now, implicit trust - but Cloudinary signs only specific uploads.


    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!apiSecret) {
        return NextResponse.json({ error: 'Missing Cloudinary API Secret' }, { status: 500 });
    }

    const signature = cloudinary.utils.api_sign_request(paramsToSign, apiSecret);

    return NextResponse.json({ signature });
}
