import MainLayout from '@/Layouts/MainLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Show({ product }) {
    const { auth, flash, errors } = usePage().props;
    const user = auth?.user;
    const [quantity, setQuantity] = useState(1);

    const { post, processing } = useForm();

    const addToCart = (e) => {
        e.preventDefault();
        post(route('cart.add', product.id), {
            data: { quantity },
        });
    };

    return (
        <MainLayout
            header={
                <div className="flex items-center">
                    <Link
                        href={route('products.index')}
                        className="mr-4 text-indigo-600 hover:text-indigo-500"
                    >
                        &larr; Back to Products
                    </Link>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        {product.name}
                    </h2>
                </div>
            }
        >
            <Head title={product.name} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {flash?.success && (
                        <div className="mb-4 rounded-md bg-green-50 p-4">
                            <p className="text-sm text-green-700">{flash.success}</p>
                        </div>
                    )}

                    {errors?.quantity && (
                        <div className="mb-4 rounded-md bg-red-50 p-4">
                            <p className="text-sm text-red-700">{errors.quantity}</p>
                        </div>
                    )}

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
                            <div className="aspect-w-3 aspect-h-2 bg-gray-200 rounded-lg">
                                {product.image ? (
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-80 w-full object-cover rounded-lg"
                                    />
                                ) : (
                                    <div className="flex h-80 items-center justify-center bg-gray-100 rounded-lg">
                                        <svg
                                            className="h-24 w-24 text-gray-400"
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

                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                                <p className="mt-4 text-2xl font-bold text-indigo-600">
                                    ${parseFloat(product.price).toFixed(2)}
                                </p>
                                <p className="mt-4 text-gray-600">{product.description}</p>

                                <div className="mt-6">
                                    <span
                                        className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                                            product.stock_quantity <= 5
                                                ? 'bg-red-100 text-red-800'
                                                : 'bg-green-100 text-green-800'
                                        }`}
                                    >
                                        {product.stock_quantity > 0
                                            ? `${product.stock_quantity} in stock`
                                            : 'Out of stock'}
                                    </span>
                                </div>

                                {user && product.stock_quantity > 0 && (
                                    <form onSubmit={addToCart} className="mt-8">
                                        <div className="flex items-center space-x-4">
                                            <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                                                Quantity
                                            </label>
                                            <input
                                                type="number"
                                                id="quantity"
                                                min="1"
                                                max={product.stock_quantity}
                                                value={quantity}
                                                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                                className="w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="mt-4 w-full rounded-md bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                                        >
                                            {processing ? 'Adding...' : 'Add to Cart'}
                                        </button>
                                    </form>
                                )}

                                {!user && (
                                    <div className="mt-8">
                                        <Link
                                            href={route('login')}
                                            className="block w-full rounded-md bg-gray-600 px-6 py-3 text-center text-base font-semibold text-white shadow-sm hover:bg-gray-500"
                                        >
                                            Login to Buy
                                        </Link>
                                    </div>
                                )}

                                {product.stock_quantity === 0 && (
                                    <div className="mt-8">
                                        <button
                                            disabled
                                            className="w-full rounded-md bg-gray-400 px-6 py-3 text-base font-semibold text-white cursor-not-allowed"
                                        >
                                            Out of Stock
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
