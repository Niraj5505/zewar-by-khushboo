import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Printer,
  FileText,
  Truck,
  CreditCard,
  User,
  MapPin,
  Lock,
  ExternalLink,
} from 'lucide-react';
import { StatusBadge } from '../../components/StatusBadge';
import { useCmsStore } from '../../lib/cmsStore';
import { formatINR } from '../../../lib/formatINR';

export const OrderDetail = () => {
  const { id } = useParams();

  const orders = useCmsStore((s) => s.orders);
  const updateOrderStatus = useCmsStore((s) => s.updateOrderStatus);
  const updateOrderShipment = useCmsStore((s) => s.updateOrderShipment);
  const updateOrderNotes = useCmsStore((s) => s.updateOrderNotes);
  const cancelOrder = useCmsStore((s) => s.cancelOrder);
  const issueRefund = useCmsStore((s) => s.issueRefund);

  const order = orders.find((o) => o.id === id);

  const [internalNotes, setInternalNotes] = useState(order?.internalNotes || '');
  const [isEditingShipment, setIsEditingShipment] = useState(false);
  const [shipmentData, setShipmentData] = useState(
    order?.shipment || {
      courier: 'BlueDart Express',
      trackingNumber: '',
      trackingUrl: '',
      estimatedDelivery: '',
      status: 'Manifested',
    }
  );

  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [refundModalOpen, setRefundModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('Customer requested cancellation before dispatch');
  const [refundReason, setRefundReason] = useState('Customer return / exchange');

  if (!order) {
    return (
      <div className="p-8 text-center bg-white border border-sand-border rounded-[4px]">
        <h2 className="font-serif text-xl font-medium text-espresso">Order Not Found</h2>
        <p className="text-xs text-espresso/60 mt-1 mb-4">No order found matching ID: {id}</p>
        <Link
          to="/admin/orders"
          className="px-4 py-2 bg-champagne text-espresso text-xs font-semibold rounded-[2px]"
        >
          Return to Orders
        </Link>
      </div>
    );
  }

  const handleStatusChange = (newFulfillment, newPayment) => {
    updateOrderStatus(order.id, newFulfillment, newPayment);
  };

  const handleSaveShipment = (e) => {
    e.preventDefault();
    updateOrderShipment(order.id, shipmentData);
    setIsEditingShipment(false);
  };

  const handleSaveNotes = () => {
    updateOrderNotes(order.id, internalNotes);
    alert('Internal notes saved.');
  };

  const handleConfirmCancel = () => {
    cancelOrder(order.id, cancelReason);
    setCancelModalOpen(false);
  };

  const handleConfirmRefund = () => {
    issueRefund(order.id, order.pricing?.grandTotalPaise || 0, refundReason);
    setRefundModalOpen(false);
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-sand-border/80">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/orders"
            className="p-2 border border-sand-border hover:bg-sand/30 rounded-[2px] text-espresso/70 hover:text-espresso transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl font-medium text-espresso font-mono">
                {order.id}
              </h1>
              <StatusBadge status={order.paymentStatus} />
              <StatusBadge status={order.fulfillmentStatus} />
            </div>
            <p className="font-sans text-xs text-espresso/60 mt-0.5">
              Placed on {new Date(order.date).toLocaleDateString('en-IN', {
                dateStyle: 'medium',
                timeStyle: 'short',
              })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrintInvoice}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-sand-border hover:bg-sand/30 text-espresso text-xs font-semibold rounded-[2px] transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-champagne-dark" />
            <span>Print Invoice</span>
          </button>
          <button
            type="button"
            onClick={handlePrintInvoice}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-sand-border hover:bg-sand/30 text-espresso text-xs font-semibold rounded-[2px] transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-champagne-dark" />
            <span>Packing Slip</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Line Items & Totals */}
        <div className="lg:col-span-8 space-y-6">
          {/* Line Items Card */}
          <div className="bg-white border border-sand-border/80 rounded-[4px] shadow-subtle p-6 space-y-4">
            <h2 className="font-serif text-base font-medium text-espresso pb-3 border-b border-sand-border/70">
              Purchased Jewellery Items
            </h2>

            <div className="divide-y divide-sand-border/40">
              {order.items?.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-14 rounded-[2px] bg-sand/30 border border-sand-border overflow-hidden flex-shrink-0">
                      <img
                        src={item.image || '/images/hero-jewellery.jpg'}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/images/hero-jewellery.jpg';
                        }}
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-espresso text-xs">{item.name}</p>
                      <p className="text-[11px] text-espresso/60">{item.variant}</p>
                      <p className="text-[10px] font-mono text-espresso/40">SKU: {item.sku}</p>
                    </div>
                  </div>

                  <div className="text-right text-xs">
                    <p className="font-semibold text-espresso">
                      {formatINR(item.subtotalPaise)}
                    </p>
                    <p className="text-[11px] text-espresso/50">
                      {item.qty} × {formatINR(item.pricePaise)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="pt-4 border-t border-sand-border/70 space-y-2 text-xs">
              <div className="flex justify-between text-espresso/70">
                <span>Subtotal</span>
                <span>{formatINR(order.pricing?.subtotalPaise)}</span>
              </div>
              {order.pricing?.discountPaise > 0 && (
                <div className="flex justify-between text-emerald-800">
                  <span>Promotional Discount</span>
                  <span>- {formatINR(order.pricing?.discountPaise)}</span>
                </div>
              )}
              <div className="flex justify-between text-espresso/70">
                <span>Pan-India Shipping</span>
                <span>
                  {order.pricing?.shippingPaise === 0
                    ? 'Free Shipping'
                    : formatINR(order.pricing?.shippingPaise)}
                </span>
              </div>
              <div className="flex justify-between text-espresso/70">
                <span>Taxes & GST (Included)</span>
                <span>{formatINR(order.pricing?.taxPaise)}</span>
              </div>
              <div className="pt-2 border-t border-sand-border flex justify-between text-sm font-bold text-espresso">
                <span>Grand Total Paid</span>
                <span className="font-serif text-base text-espresso">
                  {formatINR(order.pricing?.grandTotalPaise)}
                </span>
              </div>
            </div>
          </div>

          {/* Fulfillment Controls */}
          <div className="bg-white border border-sand-border/80 rounded-[4px] shadow-subtle p-6 space-y-4">
            <h2 className="font-serif text-base font-medium text-espresso pb-3 border-b border-sand-border/70">
              Fulfillment & Order Actions
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-espresso/70 mb-1">
                  Update Fulfillment Status:
                </label>
                <select
                  value={order.fulfillmentStatus}
                  onChange={(e) => handleStatusChange(e.target.value, null)}
                  className="w-full px-3 py-2 text-xs border border-sand-border rounded-[2px] bg-white font-medium outline-none focus:ring-1 focus:ring-champagne"
                >
                  <option value="unfulfilled">Unfulfilled</option>
                  <option value="processing">Processing (In Studio)</option>
                  <option value="shipped">Shipped (In Transit)</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-espresso/70 mb-1">
                  Payment Status:
                </label>
                <select
                  value={order.paymentStatus}
                  onChange={(e) => handleStatusChange(null, e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-sand-border rounded-[2px] bg-white font-medium outline-none focus:ring-1 focus:ring-champagne"
                >
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="refunded">Refunded</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-sand-border/60">
              {order.paymentStatus === 'paid' && (
                <button
                  type="button"
                  onClick={() => setRefundModalOpen(true)}
                  className="px-3.5 py-1.5 border border-purple-300 text-purple-900 bg-purple-50 hover:bg-purple-100 rounded-[2px] text-xs font-semibold transition-colors"
                >
                  Trigger Razorpay Refund
                </button>
              )}
              {order.fulfillmentStatus !== 'cancelled' && (
                <button
                  type="button"
                  onClick={() => setCancelModalOpen(true)}
                  className="px-3.5 py-1.5 border border-rose-300 text-rose-800 bg-rose-50 hover:bg-rose-100 rounded-[2px] text-xs font-semibold transition-colors"
                >
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Customer, Addresses, Shipment & Notes */}
        <div className="lg:col-span-4 space-y-6">
          {/* Customer Summary Card */}
          <div className="bg-white border border-sand-border/80 rounded-[4px] shadow-subtle p-5 space-y-3 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-sand-border/70">
              <span className="font-serif font-medium text-sm text-espresso flex items-center gap-1.5">
                <User className="w-4 h-4 text-champagne-dark" />
                Customer
              </span>
              <Link
                to={`/admin/customers/${order.customer.id || 'CUST-101'}`}
                className="text-[11px] text-champagne-dark hover:text-espresso font-semibold flex items-center gap-1"
              >
                <span>View Profile</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
            <div>
              <p className="font-semibold text-espresso">{order.customer.name}</p>
              <p className="text-espresso/60">{order.customer.email}</p>
              <p className="text-espresso/60">{order.customer.phone}</p>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white border border-sand-border/80 rounded-[4px] shadow-subtle p-5 space-y-2 text-xs">
            <div className="flex items-center gap-1.5 pb-2 border-b border-sand-border/70 text-espresso font-serif font-medium text-sm">
              <MapPin className="w-4 h-4 text-champagne-dark" />
              <span>Shipping Address</span>
            </div>
            <p className="font-medium text-espresso">{order.shippingAddress?.name}</p>
            <p className="text-espresso/70 leading-relaxed">
              {order.shippingAddress?.street}
              <br />
              {order.shippingAddress?.city}, {order.shippingAddress?.state} —{' '}
              {order.shippingAddress?.pincode}
            </p>
            <p className="text-espresso/60 font-mono">Ph: {order.shippingAddress?.phone}</p>
          </div>

          {/* Payment Details */}
          <div className="bg-white border border-sand-border/80 rounded-[4px] shadow-subtle p-5 space-y-2 text-xs">
            <div className="flex items-center gap-1.5 pb-2 border-b border-sand-border/70 text-espresso font-serif font-medium text-sm">
              <CreditCard className="w-4 h-4 text-champagne-dark" />
              <span>Payment Gateway</span>
            </div>
            <div className="space-y-1">
              <p className="text-espresso font-medium">{order.paymentMethod}</p>
              <p className="text-[11px] text-espresso/60 font-mono">
                Txn: {order.transactionId || 'pay_live_masked'}
              </p>
              <p className="text-emerald-800 font-semibold pt-1">
                Settled Amount: {formatINR(order.pricing?.grandTotalPaise)}
              </p>
            </div>
          </div>

          {/* Shipment Card (Editable) */}
          <div className="bg-white border border-sand-border/80 rounded-[4px] shadow-subtle p-5 space-y-3 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-sand-border/70">
              <span className="font-serif font-medium text-sm text-espresso flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-champagne-dark" />
                Courier Shipment
              </span>
              <button
                type="button"
                onClick={() => setIsEditingShipment(!isEditingShipment)}
                className="text-[11px] text-champagne-dark hover:text-espresso font-semibold"
              >
                {isEditingShipment ? 'Cancel' : 'Edit'}
              </button>
            </div>

            {isEditingShipment ? (
              <form onSubmit={handleSaveShipment} className="space-y-2.5">
                <div>
                  <label className="text-[10px] uppercase font-semibold text-espresso/60 block">
                    Courier Partner
                  </label>
                  <input
                    type="text"
                    value={shipmentData.courier}
                    onChange={(e) => setShipmentData({ ...shipmentData, courier: e.target.value })}
                    className="w-full px-2 py-1 text-xs border border-sand-border rounded"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-semibold text-espresso/60 block">
                    Tracking AWB #
                  </label>
                  <input
                    type="text"
                    value={shipmentData.trackingNumber}
                    onChange={(e) => setShipmentData({ ...shipmentData, trackingNumber: e.target.value })}
                    placeholder="e.g. BD994827110IN"
                    className="w-full px-2 py-1 text-xs border border-sand-border rounded font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-semibold text-espresso/60 block">
                    Est. Delivery Date
                  </label>
                  <input
                    type="date"
                    value={shipmentData.estimatedDelivery}
                    onChange={(e) => setShipmentData({ ...shipmentData, estimatedDelivery: e.target.value })}
                    className="w-full px-2 py-1 text-xs border border-sand-border rounded"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-1.5 bg-champagne hover:bg-champagne-hover text-espresso font-semibold text-xs rounded"
                >
                  Save Shipment
                </button>
              </form>
            ) : (
              <div className="space-y-1.5">
                <p className="font-medium text-espresso">{order.shipment?.courier || 'Unassigned'}</p>
                {order.shipment?.trackingNumber && (
                  <p className="font-mono text-espresso/70">
                    AWB: {order.shipment.trackingNumber}
                  </p>
                )}
                {order.shipment?.estimatedDelivery && (
                  <p className="text-espresso/60 text-[11px]">
                    Est. Delivery: {order.shipment.estimatedDelivery}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Internal Private Notes */}
          <div className="bg-white border border-sand-border/80 rounded-[4px] shadow-subtle p-5 space-y-3 text-xs">
            <div className="flex items-center gap-1.5 pb-2 border-b border-sand-border/70 text-espresso font-serif font-medium text-sm">
              <Lock className="w-4 h-4 text-champagne-dark" />
              <span>Studio Internal Notes</span>
            </div>
            <p className="text-[10px] text-espresso/50">
              Private notes strictly for studio karigars and back-of-house staff.
            </p>
            <textarea
              rows={3}
              value={internalNotes}
              onChange={(e) => setInternalNotes(e.target.value)}
              placeholder="e.g. Include handwritten gift card for anniversary..."
              className="w-full p-2.5 bg-ivory/40 border border-sand-border rounded text-xs outline-none focus:ring-1 focus:ring-champagne"
            />
            <button
              type="button"
              onClick={handleSaveNotes}
              className="w-full py-1.5 bg-white border border-sand-border hover:bg-sand/30 text-espresso font-semibold text-xs rounded transition-colors"
            >
              Save Internal Notes
            </button>
          </div>
        </div>
      </div>

      {/* Cancel Order Modal */}
      {cancelModalOpen && (
        <div className="fixed inset-0 bg-espresso/60 backdrop-blur-[2px] z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-sand-border rounded-[4px] p-6 max-w-md w-full space-y-4">
            <h3 className="font-serif text-lg font-medium text-espresso">
              Cancel Order {order.id}?
            </h3>
            <p className="text-xs text-espresso/70 leading-relaxed">
              Cancelling this order will mark it as cancelled, stop dispatch preparation, and create an audit log event.
            </p>
            <div>
              <label className="text-[11px] font-semibold uppercase text-espresso/70 block mb-1">
                Reason for Cancellation:
              </label>
              <textarea
                rows={2}
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full p-2 text-xs border border-sand-border rounded"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-sand-border">
              <button
                type="button"
                onClick={() => setCancelModalOpen(false)}
                className="px-3 py-1.5 border border-sand-border text-xs rounded"
              >
                Go Back
              </button>
              <button
                type="button"
                onClick={handleConfirmCancel}
                className="px-4 py-1.5 bg-rose-700 text-white text-xs font-semibold rounded"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Refund Modal */}
      {refundModalOpen && (
        <div className="fixed inset-0 bg-espresso/60 backdrop-blur-[2px] z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-sand-border rounded-[4px] p-6 max-w-md w-full space-y-4">
            <h3 className="font-serif text-lg font-medium text-espresso">
              Issue Refund for {order.id}
            </h3>
            <p className="text-xs text-espresso/70 leading-relaxed">
              Total refund amount: <strong className="text-espresso">{formatINR(order.pricing?.grandTotalPaise)}</strong> to original payment source ({order.paymentMethod}).
            </p>
            <div>
              <label className="text-[11px] font-semibold uppercase text-espresso/70 block mb-1">
                Refund Reason:
              </label>
              <textarea
                rows={2}
                value={refundReason}
                onChange={(e) => setRefundReason(e.target.value)}
                className="w-full p-2 text-xs border border-sand-border rounded"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-sand-border">
              <button
                type="button"
                onClick={() => setRefundModalOpen(false)}
                className="px-3 py-1.5 border border-sand-border text-xs rounded"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmRefund}
                className="px-4 py-1.5 bg-purple-700 text-white text-xs font-semibold rounded"
              >
                Process Refund
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
