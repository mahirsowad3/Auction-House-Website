import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { PutObjectCommand, S3, ObjectCannedACL } from '@aws-sdk/client-s3';
import { NextRequest, NextResponse } from 'next/server';

const s3 = new S3({
    credentials: {
        accessKeyId: 'AKIAS2VS4VJA3RMJ6OEV',
        secretAccessKey: '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',
    },
    region: 'us-east-2',
});

export async function POST(req: NextRequest) {
    try {
        const { fileName, fileType } = await req.json();

        const params = {
            Bucket: 'auctionhouse-images',
            Key: `${Date.now()}_${fileName}`,
            ContentType: fileType,
            ACL: 'public-read' as ObjectCannedACL,
        };

        const uploadURL = await getSignedUrl(s3, new PutObjectCommand(params), {
            expiresIn: 60,
        });

        const response = NextResponse.json({ uploadURL });
        response.headers.set('Cache-Control', 'no-store');
        return response;
    } catch (error) {
        console.error("Error generating signed URL", error);
        return NextResponse.json({ error: "Could not generate upload URL" }, { status: 400 });
    }
}
