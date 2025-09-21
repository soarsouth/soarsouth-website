import React, { useState } from 'react';
import { productCategories, getProductPrice } from '../data/pricing-real';

const QuoteFixed2 = () => {
  const [currency, setCurrency] = useState('USD');
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

  // 更新组件 - 使用函数式更新确保状态稳定
  const updateComponent = (id, field, value) => {
    setComponents(prevComponents => {
      return prevComponents.map(component => {
        if (component.id === id) {
          const updated = { ...component, [field]: value };
          
          // 如果选择了类别，重置产品选择
          if (field === 'category') {
            updated.product = '';
            updated.unitCost200 = 0;
            updated.unitCost500 = 0;
            updated.unitCost1000 = 0;
          }
          
          // 如果选择了产品，计算价格
          if (field === 'product' && updated.category && value) {
            const product = productCategories[updated.category]?.products[value];
            if (product) {
              updated.unitCost200 = getProductPrice(updated.category, value, 200, currency);
              updated.unitCost500 = getProductPrice(updated.category, value, 500, currency);
              updated.unitCost1000 = getProductPrice(updated.category, value, 1000, currency);
            }
          }
          
          return updated;
        }
        return component;
      });
    });
  };

  // 货币符号
  const getCurrencySymbol = (curr) => {
    switch(curr) {
      case 'USD': return '$';
      case 'CNY': return '¥';
      case 'EUR': return '€';
      default: return '$';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-blue-600 text-white p-6 rounded-lg mb-8">
          <h1 className="text-3xl font-bold mb-2">Board Game Manufacturing Quotation</h1>
          <p className="text-blue-100">Professional quote calculation system with real pricing</p>
        </div>

        {/* Currency Selection */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="flex items-center gap-4">
            <label className="font-medium">Currency:</label>
            <select 
              value={currency} 
              onChange={(e) => setCurrency(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            >
              <option value="USD">USD ($)</option>
              <option value="CNY">CNY (¥)</option>
              <option value="EUR">EUR (€)</option>
            </select>
          </div>
        </div>

        {/* Product Information */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Product Information</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 p-3 text-left">COMPONENTS</th>
                  <th className="border border-gray-200 p-3 text-left">QTY/SET</th>
                  <th className="border border-gray-200 p-3 text-left">UNIT COST 200 PCS</th>
                  <th className="border border-gray-200 p-3 text-left">UNIT COST 500 PCS</th>
                  <th className="border border-gray-200 p-3 text-left">UNIT COST 1000 PCS</th>
                </tr>
              </thead>
              <tbody>
                {components.map(component => (
                  <tr key={component.id}>
                    <td className="border border-gray-200 p-3">
                      {/* Category Selection */}
                      <div className="mb-2">
                        <select
                          value={component.category}
                          onChange={(e) => updateComponent(component.id, 'category', e.target.value)}
                          className="w-full border border-gray-300 rounded px-2 py-1 mb-2"
                        >
                          <option value="">Select category</option>
                          {Object.entries(productCategories).map(([key, cat]) => (
                            <option key={key} value={key}>{cat.name}</option>
                          ))}
                        </select>
                        
                        {/* Debug Info */}
                        <div className="text-xs text-red-500 mb-2">
                          Debug: Category={component.category}, HasProducts={component.category && productCategories[component.category] ? 'YES' : 'NO'}
                        </div>
                        
                        {/* Product Selection */}
                        {component.category && (
                          <select
                            value={component.product || ''}
                            onChange={(e) => updateComponent(component.id, 'product', e.target.value)}
                            className="w-full border border-gray-300 rounded px-2 py-1"
                          >
                            <option value="">Select product</option>
                            {productCategories[component.category]?.products && 
                              Object.entries(productCategories[component.category].products).map(([key, prod]) => (
                                <option key={key} value={key}>{prod.name}</option>
                              ))
                            }
                          </select>
                        )}
                      </div>
                    </td>
                    <td className="border border-gray-200 p-3">
                      <input
                        type="number"
                        value={component.qtyPerSet}
                        onChange={(e) => updateComponent(component.id, 'qtyPerSet', parseInt(e.target.value) || 1)}
                        className="w-full border border-gray-300 rounded px-2 py-1"
                        min="1"
                      />
                    </td>
                    <td className="border border-gray-200 p-3">
                      {getCurrencySymbol(currency)}{component.unitCost200}
                    </td>
                    <td className="border border-gray-200 p-3">
                      {getCurrencySymbol(currency)}{component.unitCost500}
                    </td>
                    <td className="border border-gray-200 p-3">
                      {getCurrencySymbol(currency)}{component.unitCost1000}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteFixed2;
