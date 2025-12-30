import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ items, total, canCheckout }) {
    const { flash, errors } = usePage().props;
    const [processing, setProcessing] = useState(false);

    const handleCheckout = () => {
        setProcessing(true);
        router.post(route('checkout.store'), {}, {
            onFinish: () => setProcessing(false),
        });
    };

    if (!canCheckout) {
        return (
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Checkout
                    </h2>
                }
            >
                <Head title="Checkout" />

                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-12 text-center">
                                <svg
                                    className="mx-auto h-16 w-16 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                                <h3 className="mt-4 text-lg font-medium text-gray-900">
                                    Your cart is empty
                                </h3>
                                <p className="mt-2 text-sm text-gray-500">
                                    Add some items to your cart before checking out.
                                </p>
                                <Link
                                    href={route('products.index')}
                                    className="mt-6 inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                                >
                                    Browse Products
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Checkout
                </h2>
            }
        >
            <Head title="Checkout" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {errors?.cart && (
                        <div className="mb-4 rounded-md bg-red-50 p-4">
                            <p className="text-sm text-red-700">{errors.cart}</p>
                        </div>
                    )}

                    {errors?.stock && (
                        <div className="mb-4 rounded-md bg-red-50 p-4">
                            <p className="text-sm text-red-700">{errors.stock}</p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        <div className="lg:col-span-2">
                            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                                <div className="p-6">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        Order Items
                                    </h3>
                                    <ul className="mt-6 divide-y divide-gray-200">
                                        {items.map((item) => (
                                            <li key={item.id} className="py-4 flex items-center">
                                                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                                                    {item.product.image ? (
                                                        <img
                                                            src={item.product.image}
                                                            alt={item.product.name}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full items-center justify-center">
                                                            <svg
                                                                className="h-6 w-6 text-gray-400"
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
                                                <div className="ml-4 flex flex-1 flex-col">
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <h4 className="text-sm font-medium text-gray-900">
                                                                {item.product.name}
                                                            </h4>
                                                            <p className="mt-1 text-sm text-gray-500">
                                                                Qty: {item.quantity} x ${parseFloat(item.product.price).toFixed(2)}
                                                            </p>
                                                        </div>
                                                        <span className="text-sm font-medium text-gray-900">
                                                            ${parseFloat(item.subtotal).toFixed(2)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
                                <h3 className="text-lg font-medium text-gray-900">
                                    Order Summary
                                </h3>
                                <div className="mt-6 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Subtotal</span>
                                        <span className="text-sm font-medium text-gray-900">
                                            ${parseFloat(total).toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Shipping</span>
                                        <span className="text-sm font-medium text-gray-900">Free</span>
                                    </div>
                                    <div className="border-t border-gray-200 pt-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-base font-medium text-gray-900">
                                                Total
                                            </span>
                                            <span className="text-xl font-bold text-gray-900">
                                                ${parseFloat(total).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    disabled={processing}
                                    className="mt-6 w-full rounded-md bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-50"
                                >
                                    {processing ? 'Processing...' : 'Place Order'}
                                </button>

                                <Link
                                    href={route('cart.index')}
                                    className="mt-4 block w-full text-center text-sm text-indigo-600 hover:text-indigo-500"
                                >
                                    Back to Cart
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
