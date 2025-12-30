import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ order }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center">
                    <Link
                        href={route('orders.index')}
                        className="mr-4 text-indigo-600 hover:text-indigo-500"
                    >
                        &larr; Back to Orders
                    </Link>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Order #{order.id}
                    </h2>
                </div>
            }
        >
            <Head title={`Order #${order.id}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        <div className="lg:col-span-2">
                            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                                <div className="p-6">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        Order Items
                                    </h3>
                                    <ul className="mt-6 divide-y divide-gray-200">
                                        {order.items.map((item) => (
                                            <li key={item.id} className="py-4 flex items-center">
                                                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                                                    {item.product?.image ? (
                                                        <img
                                                            src={item.product.image}
                                                            alt={item.product?.name}
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
                                                                href={route('products.show', item.product?.id)}
                                                                className="text-base font-medium text-gray-900 hover:text-indigo-600"
                                                            >
                                                                {item.product?.name || 'Product'}
                                                            </Link>
                                                            <p className="mt-1 text-sm text-gray-500">
                                                                Quantity: {item.quantity}
                                                            </p>
                                                            <p className="mt-1 text-sm text-gray-500">
                                                                Price: ${parseFloat(item.price).toFixed(2)} each
                                                            </p>
                                                        </div>
                                                        <span className="text-lg font-medium text-gray-900">
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
                                        <span className="text-sm text-gray-600">Order Number</span>
                                        <span className="text-sm font-medium text-gray-900">
                                            #{order.id}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Date</span>
                                        <span className="text-sm font-medium text-gray-900">
                                            {order.created_at}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Status</span>
                                        <span
                                            className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                                                order.status === 'completed'
                                                    ? 'bg-green-100 text-green-800'
                                                    : order.status === 'pending'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : 'bg-gray-100 text-gray-800'
                                            }`}
                                        >
                                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                        </span>
                                    </div>
                                    <div className="border-t border-gray-200 pt-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-base font-medium text-gray-900">
                                                Total
                                            </span>
                                            <span className="text-xl font-bold text-gray-900">
                                                ${parseFloat(order.total).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <Link
                                    href={route('products.index')}
                                    className="mt-6 block w-full rounded-md bg-indigo-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                                >
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
