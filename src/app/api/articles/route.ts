import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { articleService } from '../../../services/articleService';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET() {
  try {
    const articles = await articleService.getAllArticles();
    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const article = await articleService.createArticle({
      ...data,
      authorId: session.user.id,
    });
    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
  }
}
