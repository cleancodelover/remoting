'use client';
import AuthProvider from "../authContext";
import LoaderProvider from "../loaderContext";
import PopOverProvider from "../popOverContext";
import QueryProvider from "../queryContext";
import ReadingProvider from "../readingContext";
import SearchContext from "../booksContext";
import ThemeProvider from "../themeContext";

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
          <SearchContext>
            {children}
        </SearchContext>
        </LoaderProvider>
      </AuthProvider>
      </PopOverProvider>
      </ReadingProvider>
    </ThemeProvider>
    </QueryProvider>
  );
}