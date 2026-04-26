'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * NavLink component with instant prefetching
 * Use this for your navigation links to enable instant page loads
 */
export default function NavLink({ href, children, className, ...props }) {
  const router = useRouter();

  useEffect(() => {
    // Prefetch the route immediately when component mounts
    router.prefetch(href);
  }, [router, href]);

  return (
    <Link 
      href={href} 
      className={className}
      prefetch={true}
      {...props}
    >
      {children}
    </Link>
  );
}