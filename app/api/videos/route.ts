import { NextRequest, NextResponse } from "next/server";
import { connectionToDatabase } from "@/lib/db";
import Video, { IVideo } from "@/models/Video";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
    try {
        await connectionToDatabase();
        const videos = await Video.find({}).sort({ createdAt: -1 }).lean();
        if (!videos || videos.length === 0) {
            return NextResponse.json([], { status: 200 });
        }

        return NextResponse.json(videos);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch videos" }, { status: 200 });
    }
}


export async function POST(req: NextRequest) {
try {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectionToDatabase();
    const body:IVideo = await req.json();

    if (
        !body.title ||
        !body.description || 
        !body.videoUrl 
        ) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    
    const videoData = {
        ...body,
        controls: body.controls ?? true,
        transformation: {
            height:1920,
            width:1080,
            quality:body.transformation?.quality ?? 100,
        }
    };

    const video = await Video.create(videoData);

    if (!video) {
        return NextResponse.json({ error: "Failed to create video" }, { status: 500 });
    }
    
    return NextResponse.json(video, { status: 201 });


} catch (error) {
    
}
}