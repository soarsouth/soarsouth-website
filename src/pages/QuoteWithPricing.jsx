import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, Upload, Download } from 'lucide-react';
import { productCategories, getProductPrice, getCustomPriceRange, exchangeRates } from '@/data/pricing-real';

const QuoteWithPricing = () => {
  const [currency, setCurrency] = useState('USD');
  const [customerInfo, setCustomerInfo] = useState({
    companyName: '',
    productName: '',
    customerName: '',
    email: '',
    phone: '',
    whatsapp: '',
    moq: '',
    expectedDelivery: ''
  });

  const [components, setComponents] = useState([
    {
      id: 1,
      category: '',
      product: '',
      qtyPerSet: 1,
      dimension: '',
      material: '',
      printing: '',
      packaging: '',
      remarks: '',
      isCustom: false,
      customSpecs: '',
      unitCost200: 0,
      unitCost500: 0,
      unitCost1000: 0
    }
  ]);

  const [files, setFiles] = useState([]);
  const [comments, setComments] = useState('');

  // Update all component prices when currency changes
  useEffect(() => {
    console.log('Currency changed to:', currency);
    setComponents(prevComponents => {
      return prevComponents.map(component => {
        if (component.category && component.product && !component.isCustom) {
          // Recalculate standard prices
          const price200 = getProductPrice(component.category, component.product, 200, currency);
          const price500 = getProductPrice(component.category, component.product, 500, currency);
          const price1000 = getProductPrice(component.category, component.product, 1000, currency);

          return {
            ...component,
            unitCost200: price200,
            unitCost500: price500,
            unitCost1000: price1000
          };
        } else if (component.category && component.product && component.isCustom) {
          // Recalculate custom price ranges
          const productData = productCategories[component.category]?.products[component.product];
          if (productData) {
            const basePrice200 = productData.basePrice[200];
            const basePrice500 = productData.basePrice[500];
            const basePrice1000 = productData.basePrice[1000];

            const range200 = getCustomPriceRange(basePrice200, currency);
            const range500 = getCustomPriceRange(basePrice500, currency);
            const range1000 = getCustomPriceRange(basePrice1000, currency);

            return {
              ...component,
              unitCost200: `${range200.min}-${range200.max}`,
              unitCost500: `${range500.min}-${range500.max}`,
              unitCost1000: `${range1000.min}-${range1000.max}`
            };
          }
        }
        return component;
      });
    });
  }, [currency]);

  // Calculate total price
  const calculateTotal = (quantity) => {
    return components.reduce((total, component) => {
      const price = quantity === 200 ? component.unitCost200 :
        quantity === 500 ? component.unitCost500 :
          component.unitCost1000;

      // Handle price ranges (custom products)
      if (typeof price === 'string' && price.includes('-')) {
        const [minPrice] = price.split('-');
        return total + (parseFloat(minPrice) || 0);
      }

      return total + (parseFloat(price) || 0);
    }, 0).toFixed(2);
  };

  // Add new component
  const addComponent = () => {
    const newId = Math.max(...components.map(c => c.id)) + 1;
    setComponents([...components, {
      id: newId,
      category: '',
      product: '',
      qtyPerSet: 1,
      dimension: '',
      material: '',
      printing: '',
      packaging: '',
      remarks: '',
      isCustom: false,
      customSpecs: '',
      unitCost200: 0,
      unitCost500: 0,
      unitCost1000: 0
    }]);
  };

  // Remove component
  const removeComponent = (id) => {
    if (components.length > 1) {
      setComponents(components.filter(c => c.id !== id));
    }
  };

  // Update component
  const updateComponent = (id, field, value) => {
    console.log('updateComponent called:', { id, field, value, currency });

    setComponents(prevComponents => {
      return prevComponents.map(component => {
        if (component.id === id) {
          const updated = { ...component, [field]: value };

          // If category is selected, reset product selection and prices
          if (field === 'category') {
            updated.product = '';
            updated.material = '';
            updated.printing = '';
            updated.dimension = '';
            updated.packaging = '';
            updated.remarks = '';
            updated.unitCost200 = 0;
            updated.unitCost500 = 0;
            updated.unitCost1000 = 0;
            updated.isCustom = false;
            updated.customSpecs = '';
            console.log('Category selected, reset component:', value);
          }

          // If product is selected, auto-fill default values and prices
          if (field === 'product' && updated.category && value) {
            console.log('Product selected:', { category: updated.category, product: value });
            const productData = productCategories[updated.category]?.products[value];
            console.log('Product data found:', productData);

            if (productData) {
              // Fill product information
              updated.material = productData.material || '';
              updated.printing = productData.printing || '';
              updated.dimension = productData.defaultSpecs?.dimension || '';
              updated.packaging = productData.defaultSpecs?.packaging || '';

              // Generate remarks information
              const specs = productData.defaultSpecs || {};
              updated.remarks = Object.entries(specs)
                .filter(([key]) => !['dimension', 'packaging'].includes(key))
                .map(([key, val]) => `${key}: ${val}`)
                .join(', ');

              // Calculate prices
              const price200 = getProductPrice(updated.category, value, 200, currency);
              const price500 = getProductPrice(updated.category, value, 500, currency);
              const price1000 = getProductPrice(updated.category, value, 1000, currency);

              console.log('Calculated prices:', { price200, price500, price1000, currency });
              console.log('Product data basePrice:', productData.basePrice);

              updated.unitCost200 = parseFloat(price200) || 0;
              updated.unitCost500 = parseFloat(price500) || 0;
              updated.unitCost1000 = parseFloat(price1000) || 0;

              // Reset custom specification status
              updated.isCustom = false;
              updated.customSpecs = '';
            }
          }

          // If custom specifications are selected, calculate price ranges
          if (field === 'isCustom') {
            if (value && updated.product && updated.category) {
              // Get base prices (USD)
              const productData = productCategories[updated.category]?.products[updated.product];
              if (productData) {
                const basePrice200 = productData.basePrice[200];
                const basePrice500 = productData.basePrice[500];
                const basePrice1000 = productData.basePrice[1000];

                // Calculate custom price ranges
                const range200 = getCustomPriceRange(basePrice200, currency);
                const range500 = getCustomPriceRange(basePrice500, currency);
                const range1000 = getCustomPriceRange(basePrice1000, currency);

                updated.unitCost200 = `${range200.min}-${range200.max}`;
                updated.unitCost500 = `${range500.min}-${range500.max}`;
                updated.unitCost1000 = `${range1000.min}-${range1000.max}`;

                console.log('Custom pricing applied:', { range200, range500, range1000 });
              }
            } else if (!value && updated.product && updated.category) {
              // Restore standard prices
              updated.unitCost200 = getProductPrice(updated.category, updated.product, 200, currency);
              updated.unitCost500 = getProductPrice(updated.category, updated.product, 500, currency);
              updated.unitCost1000 = getProductPrice(updated.category, updated.product, 1000, currency);

              console.log('Standard pricing restored');
            }
          }

          return updated;
        }
        return component;
      });
    });
  };

  // Currency symbol
  const getCurrencySymbol = () => {
    switch (currency) {
      case 'USD': return '$';
      case 'CNY': return '¥';
      case 'EUR': return '€';
      default: return '$';
    }
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const newFiles = Array.from(event.target.files);
    setFiles([...files, ...newFiles]);
  };

  // Submit quote
  const handleSubmit = () => {
    // Validate required fields
    if (!customerInfo.companyName || !customerInfo.productName || !customerInfo.customerName || !customerInfo.email) {
      alert('Please fill in all required fields');
      return;
    }

    // Validate at least one valid component
    const validComponents = components.filter(comp => comp.category && comp.product);
    if (validComponents.length === 0) {
      alert('Please add at least one product component');
      return;
    }

    // Generate quote ID
    const quoteId = `quote_${Date.now()}`;
    const projectId = `proj_${Date.now()}`;

    // Calculate totals
    const totals = {
      qty200: calculateTotal(200),
      qty500: calculateTotal(500),
      qty1000: calculateTotal(1000)
    };

    // Create quote data
    const quoteData = {
      id: quoteId,
      projectId: projectId,
      ...customerInfo,
      components: validComponents,
      currency,
      totals,
      comments: comments,
      files: files.map(file => ({ name: file.name, size: file.size })),
      createdAt: new Date().toISOString(),
      status: 'pending', // pending, approved, rejected, modified
      adminNotes: '',
      finalPrice: null,
      approvedAt: null
    };

    // Create project data (initial state)
    const projectData = {
      id: projectId,
      quoteId: quoteId,
      ...customerInfo,
      components: validComponents,
      currency,
      comments: comments,
      files: files.map(file => ({ name: file.name, size: file.size })),
      createdAt: new Date().toISOString().split('T')[0],
      currentStage: 0, // Waiting for quote confirmation
      currentSubStage: 0,
      status: 'quote_pending' // quote_pending, active, completed, cancelled
    };

    // Save quote data to localStorage (for backend management)
    const existingQuotes = JSON.parse(localStorage.getItem('admin_quotes') || '[]');
    existingQuotes.push(quoteData);
    localStorage.setItem('admin_quotes', JSON.stringify(existingQuotes));

    // Save project data to localStorage
    localStorage.setItem(`project_${projectId}`, JSON.stringify(projectData));

    // Show thank you message
    alert('Thank you for your trust. We will provide feedback within 24 hours.');

    // Redirect to project progress page
    window.location.href = `/project/${projectId}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">Board Game Manufacturing Quotation</h1>
          <p className="text-blue-100">Professional quote calculation system with real pricing</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Currency Selection */}
        <div className="mb-6 flex items-center gap-4">
          <label className="font-medium text-gray-700">Currency:</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="USD">USD ($)</option>
            <option value="CNY">CNY (¥)</option>
            <option value="EUR">EUR (€)</option>
          </select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Customer Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                <input
                  type="text"
                  placeholder="Your Company Name"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  value={customerInfo.companyName}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, companyName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                <input
                  type="text"
                  placeholder="Your Game Name"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  value={customerInfo.productName}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, productName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name *</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  value={customerInfo.customerName}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, customerName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="text"
                  placeholder="+1 234 567 8900"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
                <input
                  type="text"
                  placeholder="+1 234 567 8900"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  value={customerInfo.whatsapp}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, whatsapp: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">MOQ</label>
                <input
                  type="text"
                  placeholder="500-1000 sets"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  value={customerInfo.moq}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, moq: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expected Delivery</label>
                <input
                  type="text"
                  placeholder="Dec 2024 shipment"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  value={customerInfo.expectedDelivery}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, expectedDelivery: e.target.value })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Product Information */}
        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Product Information</CardTitle>
            <Button onClick={addComponent} className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Component
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-2 py-2 text-xs font-medium">COMPONENTS</th>
                    <th className="border border-gray-300 px-2 py-2 text-xs font-medium">QTY/SET</th>
                    <th className="border border-gray-300 px-2 py-2 text-xs font-medium">DIMENSION(MM)</th>
                    <th className="border border-gray-300 px-2 py-2 text-xs font-medium">MATERIAL</th>
                    <th className="border border-gray-300 px-2 py-2 text-xs font-medium">PRINTING/FINISHING</th>
                    <th className="border border-gray-300 px-2 py-2 text-xs font-medium">PACKAGING</th>
                    <th className="border border-gray-300 px-2 py-2 text-xs font-medium">REMARKS</th>
                    <th className="border border-gray-300 px-2 py-2 text-xs font-medium">UNIT COST<br />200 PCS</th>
                    <th className="border border-gray-300 px-2 py-2 text-xs font-medium">UNIT COST<br />500 PCS</th>
                    <th className="border border-gray-300 px-2 py-2 text-xs font-medium">UNIT COST<br />1000 PCS</th>
                    <th className="border border-gray-300 px-2 py-2 text-xs font-medium">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {components.map((component) => (
                    <tr key={component.id}>
                      <td className="border border-gray-300 px-2 py-2">
                        <div className="space-y-1">
                          <select
                            value={component.category}
                            onChange={(e) => {
                              console.log('Category dropdown changed:', e.target.value);
                              updateComponent(component.id, 'category', e.target.value);
                            }}
                            className="w-full text-xs border border-gray-200 rounded px-1 py-1"
                          >
                            <option value="">Select category</option>
                            {Object.entries(productCategories).map(([key, cat]) => (
                              <option key={key} value={key}>{cat.name}</option>
                            ))}
                          </select>
                          {component.category && productCategories[component.category]?.products && (
                            <select
                              value={component.product || ''}
                              onChange={(e) => {
                                console.log('Product dropdown changed:', e.target.value);
                                updateComponent(component.id, 'product', e.target.value);
                              }}
                              className="w-full text-xs border border-gray-200 rounded px-1 py-1"
                            >
                              <option value="">Select product</option>
                              {Object.entries(productCategories[component.category].products).map(([key, prod]) => (
                                <option key={key} value={key}>{prod.name}</option>
                              ))}
                            </select>
                          )}
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={component.isCustom}
                              onChange={(e) => updateComponent(component.id, 'isCustom', e.target.checked)}
                              className="text-xs"
                            />
                            <label className="text-xs">Custom specs</label>
                          </div>
                          {component.isCustom && (
                            <textarea
                              placeholder="Custom specifications (detailed requirements, special materials, unique dimensions, etc.)"
                              value={component.customSpecs}
                              onChange={(e) => updateComponent(component.id, 'customSpecs', e.target.value)}
                              className="w-full text-xs border border-gray-200 rounded px-1 py-1 min-h-[60px] resize-vertical"
                              rows="3"
                            />
                          )}
                        </div>
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="number"
                          value={component.qtyPerSet}
                          onChange={(e) => updateComponent(component.id, 'qtyPerSet', parseInt(e.target.value) || 1)}
                          className="w-full text-xs border-0 bg-transparent"
                          min="1"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="text"
                          placeholder="L × W × H"
                          value={component.dimension}
                          onChange={(e) => updateComponent(component.id, 'dimension', e.target.value)}
                          className="w-full text-xs border-0 bg-transparent"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="text"
                          value={component.material}
                          onChange={(e) => updateComponent(component.id, 'material', e.target.value)}
                          className="w-full text-xs border-0 bg-transparent"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="text"
                          value={component.printing}
                          onChange={(e) => updateComponent(component.id, 'printing', e.target.value)}
                          className="w-full text-xs border-0 bg-transparent"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="text"
                          placeholder="Shrinkwrap, etc."
                          value={component.packaging}
                          onChange={(e) => updateComponent(component.id, 'packaging', e.target.value)}
                          className="w-full text-xs border-0 bg-transparent"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <textarea
                          value={component.remarks}
                          onChange={(e) => updateComponent(component.id, 'remarks', e.target.value)}
                          className="w-full text-xs border-0 bg-transparent resize-none"
                          rows="2"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <div className="text-xs font-medium">
                          {getCurrencySymbol()}{component.unitCost200}
                        </div>
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <div className="text-xs font-medium">
                          {getCurrencySymbol()}{component.unitCost500}
                        </div>
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <div className="text-xs font-medium">
                          {getCurrencySymbol()}{component.unitCost1000}
                        </div>
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeComponent(component.id)}
                          disabled={components.length === 1}
                          className="h-6 w-6 p-0"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-blue-50 font-bold">
                    <td colSpan="8" className="border border-gray-300 px-2 py-2 text-right">
                      EXW {getCurrencySymbol()} PER UNIT:
                    </td>
                    <td className="border border-gray-300 px-2 py-2 text-center">
                      {getCurrencySymbol()}{calculateTotal(200)}
                    </td>
                    <td className="border border-gray-300 px-2 py-2 text-center">
                      {getCurrencySymbol()}{calculateTotal(500)}
                    </td>
                    <td className="border border-gray-300 px-2 py-2 text-center">
                      {getCurrencySymbol()}{calculateTotal(1000)}
                    </td>
                    <td className="border border-gray-300 px-2 py-2"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Comments Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Comments & Special Requirements</CardTitle>
            {/* FORCED UPDATE - NEW BUILD */}
          </CardHeader>
          <CardContent>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Comments or Special Requirements
              </label>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 min-h-[120px] resize-vertical"
                placeholder="Please provide any additional information, special requirements, or comments about your project..."
                rows="5"
              />
              <p className="text-xs text-gray-500 mt-2">
                Include details about timeline, special materials, custom specifications, or any other requirements.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Additional Materials */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Additional Materials</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload detailed materials, artwork files, or specifications
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  PDF, DOC, Images, AI, PSD, ZIP up to 10MB each
                </p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.ai,.psd,.zip"
                  onChange={handleFileUpload}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

              {files.length > 0 ? (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Uploaded Files:</h4>
                  <div className="space-y-1">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Badge variant="outline">{file.name}</Badge>
                        <span className="text-xs text-gray-500">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                  <p className="text-sm">No files selected</p>
                  <p className="text-xs">Upload your design files, specifications, or reference materials</p>
                </div>
              )}

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800 mb-2">
                  We will provide you with a detailed quote within 24 hours after receiving your materials.
                </p>
                <ul className="text-xs text-blue-600 space-y-1">
                  <li>• Quote valid for 15 days from submission date</li>
                  <li>• All prices are EXW (Ex Works) terms</li>
                  <li>• Prices based on real manufacturing data</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="text-center">
          <Button
            onClick={handleSubmit}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 px-8 py-3"
          >
            Submit Quote Request
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuoteWithPricing;