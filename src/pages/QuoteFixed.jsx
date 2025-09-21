import React, { useState } from 'react';
import { Plus, Trash2, Upload, Send, Calculator, FileText, Mail, Phone, MessageCircle } from 'lucide-react';

// Simplified product data
const productCategories = {
  'game-boxes': {
    name: 'Game Boxes',
    nameZh: '游戏盒子',
    products: {
      'lid-bottom-box': {
        name: 'Lid & Bottom Box',
        nameZh: '天地盒',
        defaultSpecs: {
          material: '1200g Grey Board + 157g Art Paper',
          size: '295mm × 295mm × 70mm',
          printing: '4C/4C CMYK',
          finish: 'Matte Lamination',
          moq: 500
        },
        pricing: {
          basePrice: 45.00,
          minPrice: 38.00,
          customUpcharge: { min: 20, max: 40 }
        }
      },
      'tuck-box': {
        name: 'Tuck Box',
        nameZh: '开槽盒',
        defaultSpecs: {
          material: '350g Coated Paper',
          size: '100mm × 70mm × 25mm',
          printing: '4C/4C CMYK',
          finish: 'Gloss Varnish',
          moq: 1000
        },
        pricing: {
          basePrice: 8.50,
          minPrice: 6.80,
          customUpcharge: { min: 20, max: 40 }
        }
      }
    }
  },
  'game-cards': {
    name: 'Game Cards',
    nameZh: '游戏卡牌',
    products: {
      'poker-cards': {
        name: 'Poker Size Cards',
        nameZh: '扑克尺寸卡牌',
        defaultSpecs: {
          material: '350g Coated Paper',
          size: '63mm × 88mm',
          printing: '4C/4C CMYK',
          finish: 'Varnish + Shrink Wrap',
          quantity: '54pcs/set',
          moq: 500
        },
        pricing: {
          basePrice: 18.50,
          minPrice: 14.80,
          customUpcharge: { min: 20, max: 30 }
        }
      }
    }
  }
};

const EXCHANGE_RATE = 0.14;

function calculatePrice(basePrice, quantity, useMinPricing = false) {
  let unitPrice = basePrice;
  
  if (useMinPricing) {
    unitPrice = basePrice * 0.85; // Use minimum pricing
  } else {
    if (quantity >= 5000) {
      unitPrice = basePrice * 0.85;
    } else if (quantity >= 2000) {
      unitPrice = basePrice * 0.90;
    } else if (quantity >= 1000) {
      unitPrice = basePrice * 0.95;
    }
  }
  
  const totalCNY = unitPrice * quantity;
  const totalUSD = totalCNY * EXCHANGE_RATE;
  
  return {
    unitPriceCNY: unitPrice,
    unitPriceUSD: unitPrice * EXCHANGE_RATE,
    totalCNY: totalCNY,
    totalUSD: totalUSD
  };
}

function calculateCustomPricing(basePrice, quantity, customUpcharge) {
  const basePricing = calculatePrice(basePrice, quantity);
  
  const minUpcharge = customUpcharge.min / 100;
  const maxUpcharge = customUpcharge.max / 100;
  
  return {
    minTotalCNY: basePricing.totalCNY * (1 + minUpcharge),
    maxTotalCNY: basePricing.totalCNY * (1 + maxUpcharge),
    minTotalUSD: basePricing.totalUSD * (1 + minUpcharge),
    maxTotalUSD: basePricing.totalUSD * (1 + maxUpcharge)
  };
}

const QuoteFixed = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentSelection, setCurrentSelection] = useState({
    category: '',
    product: '',
    quantity: 1000,
    isCustom: false,
    customSpecs: '',
    useMinPricing: false
  });
  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    phone: '',
    whatsapp: '',
    company: '',
    name: ''
  });
  const [additionalRequirements, setAdditionalRequirements] = useState('');

  const resetCurrentSelection = () => {
    setCurrentSelection({
      category: '',
      product: '',
      quantity: 1000,
      isCustom: false,
      customSpecs: '',
      useMinPricing: false
    });
  };

  const addToQuote = () => {
    if (!currentSelection.category || !currentSelection.product) return;

    const categoryData = productCategories[currentSelection.category];
    const productData = categoryData.products[currentSelection.product];
    
    let pricing;
    if (currentSelection.isCustom) {
      pricing = calculateCustomPricing(
        productData.pricing.basePrice,
        currentSelection.quantity,
        productData.pricing.customUpcharge
      );
    } else {
      pricing = calculatePrice(
        productData.pricing.basePrice,
        currentSelection.quantity,
        currentSelection.useMinPricing
      );
    }

    const newItem = {
      id: Date.now(),
      categoryName: categoryData.name,
      productName: productData.name,
      quantity: currentSelection.quantity,
      isCustom: currentSelection.isCustom,
      customSpecs: currentSelection.customSpecs,
      useMinPricing: currentSelection.useMinPricing,
      defaultSpecs: productData.defaultSpecs,
      pricing: pricing,
      customUpcharge: currentSelection.isCustom ? productData.pricing.customUpcharge : null
    };

    setSelectedItems([...selectedItems, newItem]);
    resetCurrentSelection();
  };

  const removeFromQuote = (id) => {
    setSelectedItems(selectedItems.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    return selectedItems.reduce((total, item) => {
      if (item.isCustom) {
        const avgCNY = (item.pricing.minTotalCNY + item.pricing.maxTotalCNY) / 2;
        const avgUSD = (item.pricing.minTotalUSD + item.pricing.maxTotalUSD) / 2;
        return {
          cny: total.cny + avgCNY,
          usd: total.usd + avgUSD
        };
      } else {
        return {
          cny: total.cny + item.pricing.totalCNY,
          usd: total.usd + item.pricing.totalUSD
        };
      }
    }, { cny: 0, usd: 0 });
  };

  const submitQuote = () => {
    const quoteData = {
      items: selectedItems,
      customerInfo,
      additionalRequirements,
      total: calculateTotal(),
      timestamp: new Date().toISOString()
    };
    
    console.log('Quote submitted:', quoteData);
    alert('Quote request submitted successfully! We will contact you within 24 hours.');
  };

  const total = calculateTotal();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Get Your Custom Quote
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Build your comprehensive board game manufacturing quote. Select multiple products, 
            customize specifications, and get instant pricing with our enhanced quote system.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Selection Panel */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <Calculator className="mr-3 text-blue-600" />
                Product Selection
              </h2>

              {/* Category Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Category *
                </label>
                <select
                  value={currentSelection.category}
                  onChange={(e) => setCurrentSelection({
                    ...currentSelection,
                    category: e.target.value,
                    product: ''
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a category</option>
                  {Object.entries(productCategories).map(([key, category]) => (
                    <option key={key} value={key}>
                      {category.name} ({category.nameZh})
                    </option>
                  ))}
                </select>
              </div>

              {/* Product Selection */}
              {currentSelection.category && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Type *
                  </label>
                  <select
                    value={currentSelection.product}
                    onChange={(e) => setCurrentSelection({
                      ...currentSelection,
                      product: e.target.value
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a product</option>
                    {Object.entries(productCategories[currentSelection.category].products).map(([key, product]) => (
                      <option key={key} value={key}>
                        {product.name} ({product.nameZh})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Product Details */}
              {currentSelection.category && currentSelection.product && (
                <div className="space-y-6">
                  {/* Default Specifications */}
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-3">Default Specifications</h3>
                    {(() => {
                      const productData = productCategories[currentSelection.category].products[currentSelection.product];
                      return (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                          {Object.entries(productData.defaultSpecs).map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span className="font-medium capitalize text-blue-800">
                                {key.replace(/([A-Z])/g, ' $1').trim()}:
                              </span>
                              <span className="text-blue-700">{value}</span>
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                  </div>

                  {/* Quantity Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity *
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={currentSelection.quantity}
                      onChange={(e) => setCurrentSelection({
                        ...currentSelection,
                        quantity: parseInt(e.target.value) || 1
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Custom Specifications Option */}
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={currentSelection.isCustom}
                        onChange={(e) => setCurrentSelection({
                          ...currentSelection,
                          isCustom: e.target.checked,
                          customSpecs: e.target.checked ? currentSelection.customSpecs : ''
                        })}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        Custom Specifications (Different from default)
                      </span>
                    </label>
                  </div>

                  {/* Custom Specs Input */}
                  {currentSelection.isCustom && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Custom Specifications Details
                      </label>
                      <textarea
                        value={currentSelection.customSpecs}
                        onChange={(e) => setCurrentSelection({
                          ...currentSelection,
                          customSpecs: e.target.value
                        })}
                        placeholder="Please describe your custom requirements..."
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}

                  {/* Minimum Pricing Option */}
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={currentSelection.useMinPricing}
                        onChange={(e) => setCurrentSelection({
                          ...currentSelection,
                          useMinPricing: e.target.checked
                        })}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        Use minimum pricing (bulk orders)
                      </span>
                    </label>
                  </div>

                  {/* Price Preview */}
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-900 mb-3">Price Preview</h3>
                    {(() => {
                      const productData = productCategories[currentSelection.category].products[currentSelection.product];
                      
                      if (currentSelection.isCustom) {
                        const customPricing = calculateCustomPricing(
                          productData.pricing.basePrice,
                          currentSelection.quantity,
                          productData.pricing.customUpcharge
                        );
                        return (
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-green-800">Price Range (CNY):</span>
                              <span className="font-medium text-green-700">
                                ¥{customPricing.minTotalCNY.toFixed(2)} - ¥{customPricing.maxTotalCNY.toFixed(2)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-green-800">Price Range (USD):</span>
                              <span className="font-medium text-green-700">
                                ${customPricing.minTotalUSD.toFixed(2)} - ${customPricing.maxTotalUSD.toFixed(2)}
                              </span>
                            </div>
                            <div className="text-xs text-green-600 mt-2">
                              Custom specifications add {productData.pricing.customUpcharge.min}%-{productData.pricing.customUpcharge.max}% to base price
                            </div>
                          </div>
                        );
                      } else {
                        const pricing = calculatePrice(
                          productData.pricing.basePrice,
                          currentSelection.quantity,
                          currentSelection.useMinPricing
                        );
                        return (
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-green-800">Unit Price:</span>
                              <span className="font-medium text-green-700">
                                ¥{pricing.unitPriceCNY.toFixed(2)} / ${pricing.unitPriceUSD.toFixed(2)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-green-800">Total Price:</span>
                              <span className="font-medium text-green-700">
                                ¥{pricing.totalCNY.toFixed(2)} / ${pricing.totalUSD.toFixed(2)}
                              </span>
                            </div>
                            {currentSelection.quantity >= 1000 && (
                              <div className="text-xs text-green-600">
                                Quantity discount applied!
                              </div>
                            )}
                          </div>
                        );
                      }
                    })()}
                  </div>

                  {/* Add to Quote Button */}
                  <button
                    onClick={addToQuote}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <Plus className="mr-2" size={20} />
                    Add to Quote
                  </button>
                </div>
              )}
            </div>

            {/* File Upload Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Upload className="mr-2 text-blue-600" />
                Additional Materials
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                If you have detailed materials, artwork files, or specifications, please upload them as attachments. 
                We will provide you with a detailed quote within 24 hours.
              </p>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <span className="mt-2 block text-sm font-medium text-gray-900">
                  Upload files
                </span>
                <span className="mt-1 block text-xs text-gray-500">
                  PDF, DOC, Images, AI, PSD, ZIP up to 10MB each
                </span>
              </div>
            </div>
          </div>

          {/* Quote Summary Panel */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="mr-2 text-blue-600" />
                Quote Summary
              </h2>

              {/* Selected Items */}
              <div className="space-y-4 mb-6">
                {selectedItems.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    No items in quote yet. Add products to get started.
                  </p>
                ) : (
                  selectedItems.map((item) => (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">{item.productName}</h4>
                          <p className="text-sm text-gray-600">{item.categoryName}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity.toLocaleString()}</p>
                          {item.isCustom && (
                            <p className="text-xs text-orange-600 mt-1">Custom specifications</p>
                          )}
                        </div>
                        <button
                          onClick={() => removeFromQuote(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      
                      <div className="text-sm">
                        {item.isCustom ? (
                          <div className="text-orange-700">
                            ¥{item.pricing.minTotalCNY.toFixed(2)} - ¥{item.pricing.maxTotalCNY.toFixed(2)}
                            <br />
                            ${item.pricing.minTotalUSD.toFixed(2)} - ${item.pricing.maxTotalUSD.toFixed(2)}
                          </div>
                        ) : (
                          <div className="text-green-700">
                            ¥{item.pricing.totalCNY.toFixed(2)} / ${item.pricing.totalUSD.toFixed(2)}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Total */}
              {selectedItems.length > 0 && (
                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Estimated Total:</span>
                    <div className="text-right">
                      <div>¥{total.cny.toFixed(2)}</div>
                      <div className="text-blue-600">${total.usd.toFixed(2)}</div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Exchange Rate: 1 CNY = ${EXCHANGE_RATE} USD
                  </p>
                </div>
              )}

              {/* Customer Information */}
              <div className="space-y-4 mb-6">
                <h3 className="font-medium text-gray-900">Contact Information</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    WhatsApp
                  </label>
                  <div className="relative">
                    <MessageCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="tel"
                      value={customerInfo.whatsapp}
                      onChange={(e) => setCustomerInfo({...customerInfo, whatsapp: e.target.value})}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={customerInfo.company}
                    onChange={(e) => setCustomerInfo({...customerInfo, company: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your Company"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* Additional Requirements */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Requirements
                </label>
                <textarea
                  value={additionalRequirements}
                  onChange={(e) => setAdditionalRequirements(e.target.value)}
                  placeholder="Any special requirements or questions..."
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={submitQuote}
                disabled={selectedItems.length === 0 || !customerInfo.email}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                <Send className="mr-2" size={20} />
                Submit Quote Request
              </button>

              <p className="text-xs text-gray-500 mt-2 text-center">
                We will respond within 24 hours with a detailed quote
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteFixed;
