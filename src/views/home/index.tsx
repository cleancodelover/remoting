'use client'
import React from 'react'
import FiltersSidebar from '@/components/shared/filter-sidebar';
import BookList from '@/components/home/books';

export default function HomePage() {
  return <>
  <div className="grid h-screen px-10 py-3 font-[family-name:var(--font-geist-sans)]">
      <main className="flex-row gap-12 justify-between grid grid-cols-12">
      <FiltersSidebar />
      <BookList />
      </main>
    </div>
  </>
}
