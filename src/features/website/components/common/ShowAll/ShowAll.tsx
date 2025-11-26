import Link from 'next/link';
import React from 'react'

export default function ShowAll() {
  return (
    <button>
      <Link
        href="/products"
        className="mt-4 border border-red-900 px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors duration-300"
      >
        View All Products
      </Link>
    </button>
  );
}
