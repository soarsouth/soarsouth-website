import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Calculator, 
  Download, 
  Send, 
  DollarSign, 
  Package,
  Info,
  CheckCircle
} from 'lucide-react';
import { pricingData, calculatePrice, getAllCategories, getProductsByCategory } from '../data/pricing';

const Quote = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1000);
  const [useMinPrice, setUseMinPrice] = useState(false);
  const [quoteItems, setQuoteItems] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });

  const categories = getAllCategories();
  const products = selectedCategory ? getProductsByCategory(selectedCategory) : [];
  const currentProduct = products.find(p => p.id === selectedProduct);

  const addToQuote = () => {
    if (!currentProduct || !quantity) return;

    const pricing = calculatePrice(currentProduct, quantity, useMinPrice);
    if (!pricing) return;

    const newItem = {
      id: Date.now(),
      category: categories.find(c => c.id === selectedCategory),
      product: currentProduct,
      quantity,
      pricing,
      useMinPrice
    };

    setQuoteItems([...quoteItems, newItem]);
    
    // Reset form
    setSelectedCategory('');
    setSelectedProduct('');
    setQuantity(1000);
    setUseMinPrice(false);
  };

  const removeFromQuote = (id) => {
    setQuoteItems(quoteItems.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return quoteItems.reduce((total, item) => ({
      cny: total.cny + item.pricing.totalCNY,
      usd: total.usd + item.pricing.totalUSD
    }), { cny: 0, usd: 0 });
  };

  const generateQuotePDF = () => {
    // 这里可以集成PDF生成库
    alert('PDF quote generation feature will be implemented');
  };

  const submitQuote = () => {
    if (!customerInfo.name || !customerInfo.email) {
      alert('Please fill in your name and email');
      return;
    }
    
    // 这里可以集成邮件发送或API提交
    alert('Quote submitted successfully! We will contact you soon.');
  };

  const totalPrice = getTotalPrice();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Get Your Custom Quote</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Calculate pricing for your board game project. Add multiple products to create a comprehensive quote.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Selection */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="h-5 w-5 mr-2" />
                  Product Selection
                </CardTitle>
                <CardDescription>
                  Choose your product category and specifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Category Selection */}
                <div>
                  <Label htmlFor="category">Product Category</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Product Selection */}
                {selectedCategory && (
                  <div>
                    <Label htmlFor="product">Product</Label>
                    <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a product" />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map((product) => (
                          <SelectItem key={product.id} value={product.id}>
                            {product.name} - {product.description}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Product Details */}
                {currentProduct && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">{currentProduct.name}</h4>
                    <p className="text-blue-700 text-sm mb-3">{currentProduct.description}</p>
                    
                    {currentProduct.specifications && (
                      <div className="space-y-1">
                        {Object.entries(currentProduct.specifications).map(([key, value]) => (
                          <div key={key} className="text-sm">
                            <span className="font-medium text-blue-800 capitalize">{key.replace(/([A-Z])/g, ' $1')}: </span>
                            <span className="text-blue-700">{value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Quantity and Pricing Options */}
                {currentProduct && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input
                        id="quantity"
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                        min="1"
                        placeholder="Enter quantity"
                      />
                    </div>
                    
                    {currentProduct.minPrice && (
                      <div className="flex items-center space-x-2 pt-6">
                        <input
                          type="checkbox"
                          id="useMinPrice"
                          checked={useMinPrice}
                          onChange={(e) => setUseMinPrice(e.target.checked)}
                          className="rounded"
                        />
                        <Label htmlFor="useMinPrice" className="text-sm">
                          Use minimum pricing (bulk orders)
                        </Label>
                      </div>
                    )}
                  </div>
                )}

                {/* Price Preview */}
                {currentProduct && quantity > 0 && (
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Price Preview</h4>
                    {(() => {
                      const pricing = calculatePrice(currentProduct, quantity, useMinPrice);
                      if (!pricing) return <p className="text-red-600">Price not available</p>;
                      
                      return (
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-green-700">Unit Price:</div>
                            <div className="font-semibold">¥{pricing.unitPriceCNY.toFixed(2)} / ${pricing.unitPriceUSD.toFixed(2)}</div>
                          </div>
                          <div>
                            <div className="text-green-700">Total Price:</div>
                            <div className="font-semibold">¥{pricing.totalCNY.toFixed(2)} / ${pricing.totalUSD.toFixed(2)}</div>
                          </div>
                          {pricing.discount > 0 && (
                            <div className="col-span-2">
                              <Badge variant="secondary" className="bg-green-100 text-green-800">
                                {pricing.discount}% Quantity Discount Applied
                              </Badge>
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* Add to Quote Button */}
                {currentProduct && quantity > 0 && (
                  <Button onClick={addToQuote} className="w-full">
                    <Package className="h-4 w-4 mr-2" />
                    Add to Quote
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Exchange Rate Info */}
            <Card className="mt-6">
              <CardContent className="pt-6">
                <div className="flex items-center text-sm text-gray-600">
                  <Info className="h-4 w-4 mr-2" />
                  <span>Exchange Rate: 1 CNY = ${pricingData.exchangeRate} USD (rates may vary)</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quote Summary */}
          <div>
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Quote Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                {quoteItems.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    No items in quote yet. Add products to get started.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {/* Quote Items */}
                    {quoteItems.map((item) => (
                      <div key={item.id} className="border rounded-lg p-3">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{item.product.name}</h4>
                            <p className="text-xs text-gray-600">{item.category.name}</p>
                          </div>
                          <button
                            onClick={() => removeFromQuote(item.id)}
                            className="text-red-500 hover:text-red-700 text-xs"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="text-xs space-y-1">
                          <div>Qty: {item.quantity.toLocaleString()}</div>
                          <div className="font-semibold">
                            ¥{item.pricing.totalCNY.toFixed(2)} / ${item.pricing.totalUSD.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Total */}
                    <div className="border-t pt-4">
                      <div className="text-lg font-bold">
                        Total: ¥{totalPrice.cny.toFixed(2)} / ${totalPrice.usd.toFixed(2)}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2">
                      <Button onClick={generateQuotePDF} variant="outline" className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Customer Information */}
            {quoteItems.length > 0 && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>
                    Provide your details to receive the quote
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={customerInfo.company}
                      onChange={(e) => setCustomerInfo({...customerInfo, company: e.target.value})}
                      placeholder="Your company"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                      placeholder="Your phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Additional Requirements</Label>
                    <Textarea
                      id="message"
                      value={customerInfo.message}
                      onChange={(e) => setCustomerInfo({...customerInfo, message: e.target.value})}
                      placeholder="Any special requirements or questions..."
                      rows={3}
                    />
                  </div>
                  <Button onClick={submitQuote} className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Submit Quote Request
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quote;
