import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { commentService } from '../../../services/commentService';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET() {
  try {
    const comments = await commentService.getAllComments({
      author: true,
      article: true,
    });
    return NextResponse.json(comments);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const comment = await commentService.createComment(
      {
        ...data,
        authorId: session.user.id,
      },
      {
        author: true,
        article: true,
      }
    );
    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
  }
}
