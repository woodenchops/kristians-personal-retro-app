import Link from 'next/link';
import React from 'react';

function CustomLink({ className, buttonText, href, ...props }) {
  return (
    <Link href={href}>
      <a style={{ ...props }} className={className}>
        {buttonText}
      </a>
    </Link>
  );
}

export default CustomLink;
