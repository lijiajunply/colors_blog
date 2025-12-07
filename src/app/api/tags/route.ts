import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { tagService } from '../../../services/tagService';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET() {
  try {
    const tags = await tagService.getAllTags();
    return NextResponse.json(tags);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tags' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions as any);

  if (!session || session.user.identity !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const tag = await tagService.createTag(data);
    return NextResponse.json(tag, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create tag' }, { status: 500 });
  }
}
