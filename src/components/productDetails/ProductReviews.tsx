import { Star, User } from 'lucide-react';
import { Rating } from '../ui/Rating';
import type { Product } from '../../types/product';

interface ProductReviewsProps {
  product: Product;
}

export function ProductReviews({ product }: ProductReviewsProps) {
  const reviews = product.reviews ?? [];

  if (reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">No reviews yet for this product.</p>
      </div>
    );
  }

  // Calculate rating distribution
  const ratingCounts = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => Math.round(r.rating) === rating).length,
  }));

  const maxCount = Math.max(...ratingCounts.map((r) => r.count), 1);

  return (
    <div className="space-y-8">
      {/* Summary */}
      <div className="flex flex-col sm:flex-row gap-8 p-6 bg-slate-50 rounded-xl">
        {/* Average Rating */}
        <div className="flex flex-col items-center sm:items-start gap-2">
          <div className="text-4xl font-bold text-slate-900">
            {product.rating.toFixed(1)}
          </div>
          <Rating value={product.rating} showValue={false} size="lg" />
          <p className="text-sm text-slate-500">
            Based on {reviews.length}{' '}
            {reviews.length === 1 ? 'review' : 'reviews'}
          </p>
        </div>

        {/* Rating Distribution */}
        <div className="flex-1 space-y-2">
          {ratingCounts.map(({ rating, count }) => (
            <div key={rating} className="flex items-center gap-3">
              <span className="text-sm text-slate-600 w-6">{rating}</span>
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all"
                  style={{ width: `${(count / maxCount) * 100}%` }}
                />
              </div>
              <span className="text-sm text-slate-500 w-8">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review, index) => (
          <article
            key={index}
            className="p-6 bg-white border border-slate-200 rounded-xl"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <User className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">
                    {review.reviewerName}
                  </p>
                  <p className="text-xs text-slate-500">
                    {new Date(review.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
              <Rating value={review.rating} showValue={false} size="sm" />
            </div>

            {/* Comment */}
            <p className="text-slate-600">{review.comment}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
