import Link from 'next/link';

export default function TopMenuItem({
  title, 
  pageRef,
  isMobile = false,
  onClick = () => {}
}: {
  title: string, 
  pageRef: string,
  isMobile?: boolean,
  onClick?: () => void
}) {
  return (
    <Link 
      href={pageRef} 
      className={`
        font-medium transition-colors duration-200 relative group
        ${isMobile 
          ? 'text-amber-800 hover:text-amber-600 text-lg py-3 block w-full text-center border-b border-gray-100' 
          : 'text-amber-800 hover:text-amber-600 text-lg py-2 mr-4'
        }
      `}
      onClick={onClick}
    >
      {title}
      <span className={`
        absolute bottom-0 left-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full
        ${isMobile ? 'w-0' : 'w-0'}
      `}></span>
    </Link>
  );
}