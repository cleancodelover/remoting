'use client';
import AuthProvider from "../authContext";
import LoaderProvider from "../loaderContext";
import PopOverProvider from "../popOverContext";
import QueryProvider from "../queryContext";
import ReadingProvider from "../readingContext";
import ThemeProvider from "../themeContext";
import AuthorProvider from "../booksContext/user-books";
import BooksContext from "../booksContext";

type ProviderProps = {
    children: React.ReactNode
}

export function Providers({ children }: ProviderProps) {
  return (
    <QueryProvider>
    <ThemeProvider>
    <ReadingProvider>
    <PopOverProvider>
      <AuthProvider>
        <LoaderProvider>
          <BooksContext>
            <AuthorProvider>
            {children}
            </AuthorProvider>
        </BooksContext>
        </LoaderProvider>
      </AuthProvider>
      </PopOverProvider>
      </ReadingProvider>
    </ThemeProvider>
    </QueryProvider>
  );
}