import React from 'react';

function CustomLink({ className, buttonText, ...props }) {
  return (
    <button style={{ ...props }} className={className}>
      {buttonText}
    </button>
  );
}

export default CustomLink;
