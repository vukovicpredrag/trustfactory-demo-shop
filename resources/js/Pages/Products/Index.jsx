import MainLayout from '@/Layouts/MainLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

// products listing page
export default function Index({ products }) {
    const { auth, flash } = usePage().props;
    const user = auth?.user;

    return (
        <MainLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Products
                </h2>
            }
        >
            <Head title="Products" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {flash?.success && (
                        <div className="mb-4 rounded-md bg-green-50 p-4">
                            <p className="text-sm text-green-700">{flash.success}</p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} user={user} />
                        ))}
                    </div>

                    {products.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500">No products available.</p>
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}

// product card componet
function ProductCard({ product, user }) {
    const { post, processing } = useForm({
        quantity: 1,
    });

    // handle add to cart
    const addToCart = (e) => {
        e.preventDefault();
        post(route('cart.add', product.id));
    };

    return (
        <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="aspect-w-3 aspect-h-2 bg-gray-200">
                {product.image ? (
                    <img
                        src={product.image}
                        alt={product.name}
                        className="h-48 w-full object-cover"
                    />
                ) : (
                    <div className="flex h-48 items-center justify-center bg-gray-100">
                        <svg
                            className="h-12 w-12 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                    </div>
                )}
            </div>
            <div className="p-4">
                <Link href={route('products.show', product.id)}>
                    <h3 className="text-lg font-medium text-gray-900 hover:text-indigo-600">
                        {product.name}
                    </h3>
                </Link>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>
                <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">
                        ${parseFloat(product.price).toFixed(2)}
                    </span>
                    <span
                        className={`text-sm ${
                            product.stock_quantity <= 5
                                ? 'text-red-600'
                                : 'text-green-600'
                        }`}
                    >
                        {product.stock_quantity > 0
                            ? `${product.stock_quantity} in stock`
                            : 'Out of stock'}
                    </span>
                </div>
                {user && product.stock_quantity > 0 && (
                    <button
                        onClick={addToCart}
                        disabled={processing}
                        className="mt-4 w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                    >
                        {processing ? 'Adding...' : 'Add to Cart'}
                    </button>
                )}
                {!user && (
                    <Link
                        href={route('login')}
                        className="mt-4 block w-full rounded-md bg-gray-600 px-4 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-500"
                    >
                        Login to Buy
                    </Link>
                )}
            </div>
        </div>
    );
}
