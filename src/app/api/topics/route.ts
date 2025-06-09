import prisma from "@/lib/prisma";
import { authenticate } from "@/lib/useAuthentication";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Задай стойности по подразбиране
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);

  const { user, error, status } = await authenticate();

  if (error) {
    return new Response(JSON.stringify({ error }), { status });
  }

  const skip = (page - 1) * pageSize;

  // Брой на всички теми за текущия потребител
  const [topics, totalCount] = await Promise.all([
    prisma.topic.findMany({
      where: { ownerId: user?.id },
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
    }),
    prisma.topic.count({
      where: { ownerId: user?.id },
    }),
  ]);

  const pageCount = Math.ceil(totalCount / pageSize);

  return NextResponse.json({
    data: topics,
    pageCount,
  });
}