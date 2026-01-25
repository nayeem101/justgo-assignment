import { useSearchParams } from 'react-router';

export function SearchPage() {
  const [searchParams] = useSearchParams();

  const query = searchParams.get('q') || '';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-foreground">
        {query ? `Search results for "${query}"` : 'Search Products'}
      </h1>
      {/* Search results with filters will go here */}
    </div>
  );
}
