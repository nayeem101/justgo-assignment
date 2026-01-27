import { Monitor, Package, Ruler, Scale } from 'lucide-react';
import type { Product } from '../../types/product';
import type { ReactNode } from 'react';

interface ProductSpecificationsProps {
  product: Product;
}

interface SpecGroup {
  icon: ReactNode;
  title: string;
  specs: { label: string; value: string | number | undefined }[];
}

export function ProductSpecifications({ product }: ProductSpecificationsProps) {
  // Build specification groups from product data
  const specGroups: SpecGroup[] = [
    {
      icon: <Package className="w-5 h-5 text-indigo-600" />,
      title: 'General',
      specs: [
        { label: 'Brand', value: product.brand },
        { label: 'SKU', value: product.sku },
        { label: 'Category', value: product.category },
        { label: 'Stock', value: `${product.stock} units` },
      ],
    },
    {
      icon: <Ruler className="w-5 h-5 text-indigo-600" />,
      title: 'Dimensions',
      specs: [
        {
          label: 'Width',
          value: product.dimensions?.width
            ? `${product.dimensions.width} cm`
            : undefined,
        },
        {
          label: 'Height',
          value: product.dimensions?.height
            ? `${product.dimensions.height} cm`
            : undefined,
        },
        {
          label: 'Depth',
          value: product.dimensions?.depth
            ? `${product.dimensions.depth} cm`
            : undefined,
        },
      ],
    },
    {
      icon: <Scale className="w-5 h-5 text-indigo-600" />,
      title: 'Weight',
      specs: [
        {
          label: 'Weight',
          value: product.weight ? `${product.weight} g` : undefined,
        },
      ],
    },
    {
      icon: <Monitor className="w-5 h-5 text-indigo-600" />,
      title: 'Additional Info',
      specs: [
        { label: 'Warranty', value: product.warrantyInformation },
        { label: 'Return Policy', value: product.returnPolicy },
        {
          label: 'Min Order',
          value: product.minimumOrderQuantity
            ? `${product.minimumOrderQuantity} unit(s)`
            : undefined,
        },
      ],
    },
  ];

  // Filter out groups with no valid specs
  const filteredGroups = specGroups
    .map((group) => ({
      ...group,
      specs: group.specs.filter(
        (spec) => spec.value !== undefined && spec.value !== '',
      ),
    }))
    .filter((group) => group.specs.length > 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
      {filteredGroups.map((group) => (
        <div
          key={group.title}
          className="p-2 border border-slate-100 rounded-xl"
        >
          {/* Group Header */}
          <div className="flex items-center gap-2 mb-2">
            {group.icon}
            <h3 className="font-semibold text-slate-900">{group.title}</h3>
          </div>

          {/* Specs List */}
          <dl className="space-y-3 bg-slate-50 p-2 rounded-lg">
            {group.specs.map((spec) => (
              <div key={spec.label} className="flex justify-between gap-4">
                <dt className="text-sm text-slate-500">{spec.label}</dt>
                <dd className="text-sm font-medium text-slate-900 text-right">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}
