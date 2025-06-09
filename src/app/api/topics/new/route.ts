import prisma from "@/lib/prisma";
import { authenticate } from "@/lib/useAuthentication";
import { NextResponse } from "next/server";

export const config = {
  runtime: 'nodejs',
  region: 'fra1', // Deploy to Frankfurt
};

export async function POST(request: Request) {
    try {

        const { user, error, status } = await authenticate();

        // 2. Вземаме данните от тялото на заявката
        const { youtubeVideoId, name, categoryKey, languageKey } = await request.json();

        if (!youtubeVideoId) {
            return NextResponse.json({ message: "Missing youtubeVideoId" }, { status: 400 });
        }

        if (error) {
            return new Response(JSON.stringify({ error }), { status });
        }

        if (user) {
            // 4. Създаваме видеото
            const newVideo = await prisma.topic.create({
                data: {
                    youtubeVideoId,
                    name,
                    categoryKey,
                    languageKey,
                    ownerId: user.id,
                },
            });
            return NextResponse.json(newVideo, { status: 201 });
        }
    } catch (error) {
        console.error("Error creating video:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}