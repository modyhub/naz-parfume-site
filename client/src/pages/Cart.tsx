import { useState } from 'react';
import { Trash2, Plus, Minus, Send } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

/**
 * Cart Page - RESPONSIVE
 * Design Philosophy: Dark Luxury Cinema
 * - Shopping cart with product management
 * - Checkout form with WhatsApp integration
 * - Turkish Lira (₺) currency
 * - Smooth animations and transitions
 */

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalPrice = getTotalPrice();
  const whatsappNumber = '905555555555'; // Replace with your WhatsApp number

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim() || !customerPhone.trim() || !deliveryAddress.trim()) {
      toast.error('الرجاء ملء جميع الحقول المطلوبة');
      return;
    }

    if (cart.length === 0) {
      toast.error('السلة فارغة');
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate order summary
      const orderItems = cart
        .map(
          (item) =>
            `• ${item.name}\n  الكمية: ${item.quantity}\n  السعر: ₺${item.price.toLocaleString('tr-TR')} × ${item.quantity} = ₺${(item.price * item.quantity).toLocaleString('tr-TR')}`
        )
        .join('\n\n');

      const message = `
🎁 *طلب جديد من NAZ Parfume*

👤 *اسم العميل:* ${customerName}
📱 *رقم الهاتف:* ${customerPhone}
📍 *عنوان التسليم:* ${deliveryAddress}

📦 *المنتجات المطلوبة:*
${orderItems}

💰 *الإجمالي:* ₺${totalPrice.toLocaleString('tr-TR')}

شكراً لاختيارك NAZ Parfume! ✨
      `.trim();

      // Encode message for WhatsApp
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

      // Open WhatsApp
      window.open(whatsappUrl, '_blank');

      // Clear cart after successful submission
      setTimeout(() => {
        clearCart();
        setCustomerName('');
        setCustomerPhone('');
        setDeliveryAddress('');
        toast.success('تم إرسال الطلب بنجاح! سيتواصل معك فريقنا قريباً.');
      }, 1000);
    } catch (error) {
      console.error('Error:', error);
      toast.error('حدث خطأ أثناء إرسال الطلب');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="pt-24 pb-12">
        <div className="container px-3 sm:px-4 md:px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-50 mb-8 animate-fade-in">
            سلة التسوق
          </h1>

          {cart.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-amber-200 text-lg mb-6">السلة فارغة حالياً</p>
              <a href="/products">
                <Button className="bg-amber-500 hover:bg-amber-600 text-black font-bold">
                  تصفح المنتجات
                </Button>
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-gradient-to-b from-amber-900/10 to-black border border-amber-900/30 rounded-lg p-6">
                  <h2 className="text-xl font-bold text-amber-50 mb-6">المنتجات ({cart.length})</h2>

                  <div className="space-y-4">
                    {cart.map((item, index) => (
                      <div
                        key={item.id}
                        className="flex gap-4 pb-4 border-b border-amber-900/30 last:border-b-0 animate-fade-in"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {/* Product Image */}
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg"
                        />

                        {/* Product Details */}
                        <div className="flex-1">
                          <h3 className="text-sm sm:text-base font-bold text-amber-50 mb-1">
                            {item.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-amber-400 mb-2">
                            ₺{item.price.toLocaleString('tr-TR')}
                          </p>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 bg-amber-900/30 hover:bg-amber-900/50 rounded transition-colors"
                            >
                              <Minus size={14} className="text-amber-400" />
                            </button>
                            <span className="text-amber-50 text-sm font-semibold w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 bg-amber-900/30 hover:bg-amber-900/50 rounded transition-colors"
                            >
                              <Plus size={14} className="text-amber-400" />
                            </button>
                          </div>
                        </div>

                        {/* Price & Remove */}
                        <div className="flex flex-col items-end gap-2">
                          <p className="text-sm sm:text-base font-bold text-amber-400">
                            ₺{(item.price * item.quantity).toLocaleString('tr-TR')}
                          </p>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 bg-red-500/20 hover:bg-red-500/40 rounded transition-colors"
                          >
                            <Trash2 size={16} className="text-red-400" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Checkout Form */}
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-b from-amber-900/10 to-black border border-amber-900/30 rounded-lg p-6 sticky top-24">
                  <h2 className="text-xl font-bold text-amber-50 mb-6">ملخص الطلب</h2>

                  {/* Order Summary */}
                  <div className="mb-6 pb-6 border-b border-amber-900/30">
                    <div className="flex justify-between text-amber-200 mb-2">
                      <span>عدد المنتجات:</span>
                      <span>{cart.length}</span>
                    </div>
                    <div className="flex justify-between text-amber-200 mb-4">
                      <span>عدد العناصر:</span>
                      <span>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-amber-400">
                      <span>الإجمالي:</span>
                      <span>₺{totalPrice.toLocaleString('tr-TR')}</span>
                    </div>
                  </div>

                  {/* Checkout Form */}
                  <form onSubmit={handleCheckout} className="space-y-4">
                    <div>
                      <label className="text-amber-200 text-sm font-semibold mb-2 block">
                        اسم العميل *
                      </label>
                      <Input
                        type="text"
                        placeholder="أدخل اسمك"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="bg-black/50 border-amber-900/30 text-amber-50 placeholder-amber-900/50"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-amber-200 text-sm font-semibold mb-2 block">
                        رقم الهاتف *
                      </label>
                      <Input
                        type="tel"
                        placeholder="+90 5XX XXX XXXX"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="bg-black/50 border-amber-900/30 text-amber-50 placeholder-amber-900/50"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-amber-200 text-sm font-semibold mb-2 block">
                        عنوان التسليم *
                      </label>
                      <Textarea
                        placeholder="أدخل عنوان التسليم الكامل"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        className="bg-black/50 border-amber-900/30 text-amber-50 placeholder-amber-900/50 min-h-24 resize-none"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <Send size={18} />
                      {isSubmitting ? 'جاري الإرسال...' : 'إتمام الطلب عبر WhatsApp'}
                    </Button>

                    <Button
                      type="button"
                      onClick={() => clearCart()}
                      variant="outline"
                      className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10"
                    >
                      مسح السلة
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
