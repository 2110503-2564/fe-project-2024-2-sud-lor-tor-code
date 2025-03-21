import Link from 'next/link';

export default function TopMenuItem({
  title, pageRef
}: {
  title: string, pageRef: string
}) {
  return (
    <Link href={pageRef} className='text-amber-800 font-medium text-lg hover:text-amber-600 transition-colors duration-200 py-2 relative group mr-100'>
      {title}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );
}