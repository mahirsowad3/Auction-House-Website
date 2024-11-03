import AWS from 'aws-sdk';
import { NextRequest, NextResponse } from 'next/server';

AWS.config.update({
    accessKeyId: 'AKIAS2VS4VJA3RMJ6OEV',
    secretAccessKey: '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',
    region: 'us-east-2'
});

const s3 = new AWS.S3();

export async function POST(req: NextRequest) {
    try {
        const { fileName, fileType } = await req.json();

        const params = {
            Bucket: 'auctionhouse-images',
            Key: `${Date.now()}_${fileName}`,
            Expires: 60,
            ContentType: fileType,
            ACL: 'public-read',
        };

        const uploadURL = await s3.getSignedUrlPromise('putObject', params);
        return NextResponse.json({ uploadURL });
    } catch (error) {
        console.error("Error generating signed URL", error);
        return NextResponse.json({ error: "Could not generate upload URL" }, { status: 400 });
    }
}