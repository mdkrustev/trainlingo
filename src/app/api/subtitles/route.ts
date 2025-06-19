// pages/api/get-captions.ts

import { NextRequest } from 'next/server';

//import { getServerSession } from 'next-auth';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const videoId = searchParams.get('videoId');
    const session = ''; //await getServerSession(authOptions);
    
   // const accessToken = await getYouTubeAccessToken();


    /*
    if (!videoId) {
        return Response.json({ error: 'Missing parameters' }, { status: 400 });
    }

    try {
        // 1. Намери captionId
        const listRes = await fetch(
            `https://www.googleapis.com/youtube/v3/captions?videoId=${videoId}&key=AIzaSyDgx9xi53vwF7eGM_ByKu-LnJprOZf8-m4`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        const listData = await listRes.json();

        if (!listData.items?.length) {
            return Response.json({ error: 'No captions found' }, { status: 404 });
        }

        const captionId = listData.items[0].id;

        // 2. Свали субтитрите
        const captionRes = await fetch(
            `https://www.googleapis.com/youtube/v3/captions/${captionId}?format=json3`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        const captionData = await captionRes.json();

        return Response.json(captionData);
    } catch (error) {
        console.error('Error fetching captions:', error);
        return Response.json({ error: 'Failed to load captions' }, { status: 500 });
    } */
   return Response.json({videoId, session})
}