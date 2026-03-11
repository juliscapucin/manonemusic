import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(req: NextRequest) {
    const secret = req.nextUrl.searchParams.get('secret');

    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
        console.error('❌ Invalid secret:', secret);
        return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    try {
        const body = await req.json();

        const slug = body?.slug?.current;
        const documentType = body?._type;
        const section =
            body?.section ||
            body?.sectionSlug ||
            documentType.replace('Page', '');

        if (documentType === 'contactPage') {
            revalidateTag('contact-page', 'max');
        }

        // Always revalidate the homepage
        const pathsToRevalidate = ['/'];

        // Revalidate /[section] if section is present
        if (section) {
            pathsToRevalidate.push(`/${section}`);
        }

        // Revalidate /[section]/[slug] if both are present
        if (section && slug) {
            pathsToRevalidate.push(`/${section}/${slug}`);
        }

        await Promise.all(
            pathsToRevalidate.map((path) => revalidatePath(path))
        );

        console.log(
            '✅ Revalidated:',
            pathsToRevalidate,
            'Webhook body:',
            body
        );
        return NextResponse.json({ revalidated: true });
    } catch (err) {
        console.error('❌ Revalidation error:', err);
        return NextResponse.json(
            { message: 'Error revalidating' },
            { status: 500 }
        );
    }
}
