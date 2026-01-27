import { Truck, RotateCcw, Shield, Clock } from 'lucide-react';
import type { Product } from '../../types/product';
import type { ReactNode } from 'react';

interface ProductShippingProps {
  product: Product;
}

interface InfoCard {
  icon: ReactNode;
  title: string;
  description: string | undefined;
}

export function ProductShipping({ product }: ProductShippingProps) {
  const infoCards: InfoCard[] = [
    {
      icon: <Truck className="w-6 h-6 text-indigo-600" />,
      title: 'Shipping',
      description: product.shippingInformation,
    },
    {
      icon: <RotateCcw className="w-6 h-6 text-indigo-600" />,
      title: 'Returns',
      description: product.returnPolicy,
    },
    {
      icon: <Shield className="w-6 h-6 text-indigo-600" />,
      title: 'Warranty',
      description: product.warrantyInformation,
    },
    {
      icon: <Clock className="w-6 h-6 text-indigo-600" />,
      title: 'Availability',
      description:
        product.availabilityStatus ||
        (product.stock > 0 ? 'In Stock' : 'Out of Stock'),
    },
  ].filter((card) => card.description);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {infoCards.map((card) => (
        <div key={card.title} className="flex gap-4 p-6 bg-slate-50 rounded-xl">
          <div className="shrink-0 w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center">
            {card.icon}
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 mb-1">{card.title}</h3>
            <p className="text-sm text-slate-600">{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
