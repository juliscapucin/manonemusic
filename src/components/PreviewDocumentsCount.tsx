// This file exists to allow implementation of Sanity Live

'use client';

import dynamic from 'next/dynamic';
import { usePresentationQuery } from 'next-sanity/hooks';
import { sanityQuery } from '@/components';

const DocumentsCount = dynamic(() => import('./DocumentsCount'));

// Re-exported components using next/dynamic ensures they're not bundled
// and sent to the browser unless actually used, with draftMode().enabled.
export default function PreviewDocumentsCount(
    props: React.ComponentProps<typeof DocumentsCount>
) {
    const optimistic = usePresentationQuery({ query: sanityQuery });
    return <DocumentsCount {...props} data={optimistic.data || props.data} />;
}
