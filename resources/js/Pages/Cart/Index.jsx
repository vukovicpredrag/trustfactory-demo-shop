import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

// shoping cart page
export default function Index({ items, total }) {
    const { flash, errors } = usePage().props;
    // console.log('cart items:', items);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Shopping Cart
                </h2>
            }
        >
            <Head title="Cart" />

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

                    {items.length === 0 ? (
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
                                    Start shopping to add items to your cart.
                                </p>
                                <Link
                                    href={route('products.index')}
                                    className="mt-6 inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                                >
                                    Browse Products
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                            <div className="lg:col-span-2">
                                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                                    <ul className="divide-y divide-gray-200">
                                        {items.map((item) => (
                                            <CartItem key={item.id} item={item} />
                                        ))}
                                    </ul>
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
                                        <div className="border-t border-gray-200 pt-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-base font-medium text-gray-900">
                                                    Total
                                                </span>
                                                <span className="text-base font-bold text-gray-900">
                                                    ${parseFloat(total).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <Link
                                        href={route('checkout.index')}
                                        className="mt-6 block w-full rounded-md bg-indigo-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                                    >
                                        Proceed to Checkout
                                    </Link>
                                    <Link
                                        href={route('products.index')}
                                        className="mt-4 block w-full text-center text-sm text-indigo-600 hover:text-indigo-500"
                                    >
                                        Continue Shopping
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function CartItem({ item }) {
    const [quantity, setQuantity] = useState(item.quantity);
    const [updating, setUpdating] = useState(false);

    const updateQuantity = (newQuantity) => {
        if (newQuantity < 1) return;
        setUpdating(true);
        setQuantity(newQuantity);
        router.patch(
            route('cart.update', item.id),
            { quantity: newQuantity },
            {
                preserveScroll: true,
                onFinish: () => setUpdating(false),
            }
        );
    };

    const removeItem = () => {
        router.delete(route('cart.remove', item.id), {
            preserveScroll: true,
        });
    };

    return (
        <li className="p-6">
            <div className="flex items-center">
                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                    {item.product.image ? (
                        <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center">
                            <svg
                                className="h-8 w-8 text-gray-400"
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

                <div className="ml-6 flex flex-1 flex-col">
                    <div className="flex items-start justify-between">
                        <div>
                            <Link
                                href={route('products.show', item.product.id)}
                                className="text-base font-medium text-gray-900 hover:text-indigo-600"
                            >
                                {item.product.name}
                            </Link>
                            <p className="mt-1 text-sm text-gray-500">
                                ${parseFloat(item.product.price).toFixed(2)} each
                            </p>
                        </div>
                        <span className="text-base font-medium text-gray-900">
                            ${parseFloat(item.subtotal).toFixed(2)}
                        </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <button
                                type="button"
                                onClick={() => updateQuantity(quantity - 1)}
                                disabled={updating || quantity <= 1}
                                className="rounded-md border border-gray-300 p-1 hover:bg-gray-50 disabled:opacity-50"
                            >
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                </svg>
                            </button>
                            <span className="text-gray-900 w-8 text-center">{quantity}</span>
                            <button
                                type="button"
                                onClick={() => updateQuantity(quantity + 1)}
                                disabled={updating || quantity >= item.product.stock_quantity}
                                className="rounded-md border border-gray-300 p-1 hover:bg-gray-50 disabled:opacity-50"
                            >
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </button>
                        </div>

                        <button
                            type="button"
                            onClick={removeItem}
                            className="text-sm font-medium text-red-600 hover:text-red-500"
                        >
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </li>
    );
}
