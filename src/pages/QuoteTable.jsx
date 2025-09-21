import React, { useState } from 'react';
import { Plus, Trash2, Upload, Send, Calculator, FileText, Mail, Phone, MessageCircle, Download } from 'lucide-react';

const QuoteTable = () => {
  const [currency, setCurrency] = useState('USD');
  const [customerInfo, setCustomerInfo] = useState({
    company: '',
    productName: '',
    customerName: '',
    email: '',
    phone: '',
    whatsapp: '',
    language: '',
    quantity: '',
    deliveryTime: ''
  });

  const [quoteItems, setQuoteItems] = useState([
    {
      id: 1,
      partNo: 'PN001',
      component: '',
      qtyPerSet: 1,
      dimension: '',
      material: '',
      printing: '',
      packaging: '',
      remarks: '',
      unitCost200: 0,
      unitCost500: 0,
      unitCost1000: 0
    }
  ]);

  const [attachments, setAttachments] = useState([]);

  // 汇率设置
  const exchangeRates = {
    USD: 1,
    CNY: 7.2,
    EUR: 0.85
  };

  // 产品组件预设选项
  const componentOptions = [
    'Rulebook',
    'Cards',
    'Game Box',
    'Game Board',
    'Dice',
    'Tokens',
    'Insert/Divider',
    'Meeples',
    'Standees',
    'Other'
  ];

  // 材料选项
  const materialOptions = [
    '157g coated paper',
    '250g coated paper',
    '300g coated paper',
    '350g coated paper',
    '400g coated paper',
    '1.5mm greyboard',
    '2.0mm greyboard',
    '3.0mm greyboard',
    'Plastic',
    'Wood',
    'Other'
  ];

  // 印刷选项
  const printingOptions = [
    '4C/4C',
    '4C/0C',
    '1C/1C',
    'Varnishing',
    'Matte lamination',
    'Gloss lamination',
    'UV coating',
    'Embossing',
    'Hot stamping',
    'Other'
  ];

  const addQuoteItem = () => {
    const newItem = {
      id: Date.now(),
      partNo: `PN${String(quoteItems.length + 1).padStart(3, '0')}`,
      component: '',
      qtyPerSet: 1,
      dimension: '',
      material: '',
      printing: '',
      packaging: '',
      remarks: '',
      unitCost200: 0,
      unitCost500: 0,
      unitCost1000: 0
    };
    setQuoteItems([...quoteItems, newItem]);
  };

  const removeQuoteItem = (id) => {
    if (quoteItems.length > 1) {
      setQuoteItems(quoteItems.filter(item => item.id !== id));
    }
  };

  const updateQuoteItem = (id, field, value) => {
    setQuoteItems(quoteItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const updateCustomerInfo = (field, value) => {
    setCustomerInfo({ ...customerInfo, [field]: value });
  };

  const calculateTotal = (quantity) => {
    const field = `unitCost${quantity}`;
    return quoteItems.reduce((sum, item) => sum + (parseFloat(item[field]) || 0), 0);
  };

  const convertCurrency = (amount) => {
    if (currency === 'USD') return amount;
    return (amount * exchangeRates[currency]).toFixed(2);
  };

  const getCurrencySymbol = () => {
    switch (currency) {
      case 'USD': return '$';
      case 'CNY': return '¥';
      case 'EUR': return '€';
      default: return '$';
    }
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setAttachments([...attachments, ...files]);
  };

  const removeAttachment = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    // 这里可以添加提交逻辑
    alert('报价单已提交！我们将在24小时内回复您。');
  };

  const exportQuote = () => {
    // 这里可以添加导出逻辑
    alert('报价单导出功能开发中...');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* 头部 */}
          <div className="bg-blue-600 text-white p-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">Board Game Manufacturing Quotation</h1>
                <p className="text-blue-100 mt-1">Professional quote calculation system</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium">Currency:</label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="bg-white text-gray-900 px-3 py-1 rounded border focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="CNY">CNY (¥)</option>
                    <option value="EUR">EUR (€)</option>
                  </select>
                </div>
                <button
                  onClick={exportQuote}
                  className="bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded flex items-center space-x-2 transition-colors"
                >
                  <Download size={16} />
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div>

          {/* 客户信息部分 */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Customer Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                <input
                  type="text"
                  value={customerInfo.company}
                  onChange={(e) => updateCustomerInfo('company', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Company Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                <input
                  type="text"
                  value={customerInfo.productName}
                  onChange={(e) => updateCustomerInfo('productName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Game Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name *</label>
                <input
                  type="text"
                  value={customerInfo.customerName}
                  onChange={(e) => updateCustomerInfo('customerName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => updateCustomerInfo('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) => updateCustomerInfo('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+1 234 567 8900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
                <input
                  type="tel"
                  value={customerInfo.whatsapp}
                  onChange={(e) => updateCustomerInfo('whatsapp', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+1 234 567 8900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Language & Quantity</label>
                <input
                  type="text"
                  value={customerInfo.language}
                  onChange={(e) => updateCustomerInfo('language', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="English version / 500-1000 sets"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expected Delivery</label>
                <input
                  type="text"
                  value={customerInfo.deliveryTime}
                  onChange={(e) => updateCustomerInfo('deliveryTime', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Dec 2024 shipment"
                />
              </div>
            </div>
          </div>

          {/* 产品信息表格 */}
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Product Information</h2>
              <button
                onClick={addQuoteItem}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center space-x-2 transition-colors"
              >
                <Plus size={16} />
                <span>Add Component</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-2 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Part No.</th>
                    <th className="border border-gray-300 px-2 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Components</th>
                    <th className="border border-gray-300 px-2 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Qty/Set</th>
                    <th className="border border-gray-300 px-2 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Dimension(mm)</th>
                    <th className="border border-gray-300 px-2 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Material</th>
                    <th className="border border-gray-300 px-2 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Printing/Finishing</th>
                    <th className="border border-gray-300 px-2 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Packaging</th>
                    <th className="border border-gray-300 px-2 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Remarks</th>
                    <th className="border border-gray-300 px-2 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Unit Cost<br/>200 pcs</th>
                    <th className="border border-gray-300 px-2 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Unit Cost<br/>500 pcs</th>
                    <th className="border border-gray-300 px-2 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Unit Cost<br/>1000 pcs</th>
                    <th className="border border-gray-300 px-2 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {quoteItems.map((item, index) => (
                    <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="text"
                          value={item.partNo}
                          onChange={(e) => updateQuoteItem(item.id, 'partNo', e.target.value)}
                          className="w-full px-2 py-1 text-sm border-0 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <select
                          value={item.component}
                          onChange={(e) => updateQuoteItem(item.id, 'component', e.target.value)}
                          className="w-full px-2 py-1 text-sm border-0 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded"
                        >
                          <option value="">Select component</option>
                          {componentOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="number"
                          value={item.qtyPerSet}
                          onChange={(e) => updateQuoteItem(item.id, 'qtyPerSet', parseInt(e.target.value) || 0)}
                          className="w-full px-2 py-1 text-sm border-0 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded"
                          min="1"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="text"
                          value={item.dimension}
                          onChange={(e) => updateQuoteItem(item.id, 'dimension', e.target.value)}
                          className="w-full px-2 py-1 text-sm border-0 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded"
                          placeholder="L × W × H"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <select
                          value={item.material}
                          onChange={(e) => updateQuoteItem(item.id, 'material', e.target.value)}
                          className="w-full px-2 py-1 text-sm border-0 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded"
                        >
                          <option value="">Select material</option>
                          {materialOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <select
                          value={item.printing}
                          onChange={(e) => updateQuoteItem(item.id, 'printing', e.target.value)}
                          className="w-full px-2 py-1 text-sm border-0 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded"
                        >
                          <option value="">Select printing</option>
                          {printingOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="text"
                          value={item.packaging}
                          onChange={(e) => updateQuoteItem(item.id, 'packaging', e.target.value)}
                          className="w-full px-2 py-1 text-sm border-0 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded"
                          placeholder="Shrinkwrap, etc."
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <textarea
                          value={item.remarks}
                          onChange={(e) => updateQuoteItem(item.id, 'remarks', e.target.value)}
                          className="w-full px-2 py-1 text-sm border-0 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded resize-none"
                          rows="2"
                          placeholder="Special requirements"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="number"
                          value={item.unitCost200}
                          onChange={(e) => updateQuoteItem(item.id, 'unitCost200', parseFloat(e.target.value) || 0)}
                          className="w-full px-2 py-1 text-sm border-0 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded text-center"
                          step="0.01"
                          placeholder="0.00"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="number"
                          value={item.unitCost500}
                          onChange={(e) => updateQuoteItem(item.id, 'unitCost500', parseFloat(e.target.value) || 0)}
                          className="w-full px-2 py-1 text-sm border-0 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded text-center"
                          step="0.01"
                          placeholder="0.00"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="number"
                          value={item.unitCost1000}
                          onChange={(e) => updateQuoteItem(item.id, 'unitCost1000', parseFloat(e.target.value) || 0)}
                          className="w-full px-2 py-1 text-sm border-0 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded text-center"
                          step="0.01"
                          placeholder="0.00"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2 text-center">
                        <button
                          onClick={() => removeQuoteItem(item.id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                          disabled={quoteItems.length === 1}
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {/* 总计行 */}
                  <tr className="bg-blue-50 font-semibold">
                    <td colSpan="8" className="border border-gray-300 px-2 py-3 text-right">
                      <strong>EXW {getCurrencySymbol()} PER UNIT:</strong>
                    </td>
                    <td className="border border-gray-300 px-2 py-3 text-center">
                      <strong>{getCurrencySymbol()}{convertCurrency(calculateTotal(200))}</strong>
                    </td>
                    <td className="border border-gray-300 px-2 py-3 text-center">
                      <strong>{getCurrencySymbol()}{convertCurrency(calculateTotal(500))}</strong>
                    </td>
                    <td className="border border-gray-300 px-2 py-3 text-center">
                      <strong>{getCurrencySymbol()}{convertCurrency(calculateTotal(1000))}</strong>
                    </td>
                    <td className="border border-gray-300"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 附件上传部分 */}
          <div className="p-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Additional Materials</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <span className="mt-2 block text-sm font-medium text-gray-900">
                      Upload detailed materials, artwork files, or specifications
                    </span>
                    <span className="mt-1 block text-sm text-gray-500">
                      PDF, DOC, Images, AI, PSD, ZIP up to 10MB each
                    </span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      multiple
                      onChange={handleFileUpload}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.ai,.psd,.zip"
                    />
                    <span className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                      Choose Files
                    </span>
                  </label>
                </div>
              </div>
              {attachments.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Uploaded Files:</h4>
                  <div className="space-y-2">
                    {attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
                        <span className="text-sm text-gray-700">{file.name}</span>
                        <button
                          onClick={() => removeAttachment(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <p className="mt-2 text-sm text-gray-600">
              We will provide you with a detailed quote within 24 hours after receiving your materials.
            </p>
          </div>

          {/* 提交按钮 */}
          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                <p>Quote valid for 15 days from submission date</p>
                <p>All prices are EXW (Ex Works) terms</p>
              </div>
              <button
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg flex items-center space-x-2 transition-colors text-lg font-semibold"
              >
                <Send size={20} />
                <span>Submit Quote Request</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteTable;
