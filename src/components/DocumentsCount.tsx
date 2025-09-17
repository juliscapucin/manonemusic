// This file exists to allow implementation of Sanity Live

export const sanityQuery = `count(*[_type == "page"])`;

export default function DocumentsCount({ data }: { data: number }) {
    return <div>There are {data} documents</div>;
}
