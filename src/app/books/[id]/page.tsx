'use client'
import FiltersSidebar from '@/components/shared/filter-sidebar';
import BookDetails from '@/views/books';
import { useParams } from 'next/navigation';
import React from 'react'

const Book = () => {
  const { id } = useParams<{id: string}>();
  return (
    <>
      <div className="grid h-screen px-10 py-3 font-[family-name:var(--font-geist-sans)]">
        <main className="flex-row gap-12 justify-between grid grid-cols-12">
          <FiltersSidebar />
          <BookDetails id={id} />
        </main>
      </div>
    </>
  );
};

export default Book;
