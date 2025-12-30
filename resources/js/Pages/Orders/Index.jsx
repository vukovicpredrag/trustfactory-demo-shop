import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Index({ orders }) {
    const { flash } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    My Orders
                </h2>
            }
        >
            <Head title="Orders" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {flash?.success && (
                        <div className="mb-4 rounded-md bg-green-50 p-4">
                            <p className="text-sm text-green-700">{flash.success}</p>
                        </div>
                    )}

                    {orders.length === 0 ? (
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
                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                    />
                                </svg>
                                <h3 className="mt-4 text-lg font-medium text-gray-900">
                                    No orders yet
                                </h3>
                                <p className="mt-2 text-sm text-gray-500">
                                    You haven't placed any orders yet.
                                </p>
                                <Link
                                    href={route('products.index')}
                                    className="mt-6 inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                                >
                                    Start Shopping
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {orders.map((order) => (
                                <div
                                    key={order.id}
                                    className="overflow-hidden bg-white shadow-sm sm:rounded-lg"
                                >
                                    <div className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-lg font-medium text-gray-900">
                                                    Order #{order.id}
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-500">
                                                    Placed on {order.created_at}
                                                </p>
                                            </div>
                                            <div className="text-right">
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
                                                <p className="mt-2 text-lg font-bold text-gray-900">
                                                    ${parseFloat(order.total).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-6 border-t border-gray-200 pt-6">
                                            <ul className="divide-y divide-gray-200">
                                                {order.items.map((item) => (
                                                    <li key={item.id} className="py-3 flex items-center">
                                                        <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                                                            {item.product?.image ? (
                                                                <img
                                                                    src={item.product.image}
                                                                    alt={item.product?.name}
                                                                    className="h-full w-full object-cover"
                                                                />
                                                            ) : (
                                                                <div className="flex h-full items-center justify-center">
                                                                    <svg
                                                                        className="h-5 w-5 text-gray-400"
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
                                                        <div className="ml-4 flex flex-1 items-center justify-between">
                                                            <div>
                                                                <h4 className="text-sm font-medium text-gray-900">
                                                                    {item.product?.name || 'Product'}
                                                                </h4>
                                                                <p className="text-sm text-gray-500">
                                                                    Qty: {item.quantity} x ${parseFloat(item.price).toFixed(2)}
                                                                </p>
                                                            </div>
                                                            <span className="text-sm font-medium text-gray-900">
                                                                ${parseFloat(item.subtotal).toFixed(2)}
                                                            </span>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="mt-6 flex justify-end">
                                            <Link
                                                href={route('orders.show', order.id)}
                                                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                                            >
                                                View Details &rarr;
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
