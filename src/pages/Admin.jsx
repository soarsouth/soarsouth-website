import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, Edit, Trash2, Plus, Eye, EyeOff, Send, Check, X, Clock } from 'lucide-react';
import { productCategories } from '@/data/pricing-real';

// Quote Management Component
const QuoteManagement = () => {
  const [quotes, setQuotes] = useState([]);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [editingQuote, setEditingQuote] = useState(null);

  useEffect(() => {
    // 加载报价数据
    const loadQuotes = () => {
      const savedQuotes = JSON.parse(localStorage.getItem('admin_quotes') || '[]');
      setQuotes(savedQuotes);
    };
    loadQuotes();
    
    // 每5秒刷新一次数据
    const interval = setInterval(loadQuotes, 5000);
    return () => clearInterval(interval);
  }, []);

  const updateQuoteStatus = (quoteId, status, finalPrice = null, adminNotes = '') => {
    const updatedQuotes = quotes.map(quote => {
      if (quote.id === quoteId) {
        const updatedQuote = {
          ...quote,
          status,
          finalPrice,
          adminNotes,
          approvedAt: status === 'approved' ? new Date().toISOString() : null
        };
        
        // 如果报价被批准，更新对应的项目状态
        if (status === 'approved') {
          const projectData = JSON.parse(localStorage.getItem(`project_${quote.projectId}`) || '{}');
          if (projectData.id) {
            projectData.status = 'active';
            projectData.currentStage = 1; // 进入下一阶段
            projectData.finalQuote = {
              price: finalPrice || quote.totals,
              currency: quote.currency,
              approvedAt: new Date().toISOString()
            };
            localStorage.setItem(`project_${quote.projectId}`, JSON.stringify(projectData));
          }
        }
        
        return updatedQuote;
      }
      return quote;
    });
    
    setQuotes(updatedQuotes);
    localStorage.setItem('admin_quotes', JSON.stringify(updatedQuotes));
  };

  const sendQuoteToCustomer = (quoteId) => {
    // 模拟发送邮件给客户
    updateQuoteStatus(quoteId, 'sent');
    alert('Quote sent to customer for confirmation');
  };

  const getCurrencySymbol = (currency) => {
    switch (currency) {
      case 'USD': return '$';
      case 'CNY': return '¥';
      case 'EUR': return '€';
      default: return '$';
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { variant: 'secondary', icon: Clock, label: 'Pending Review' },
      sent: { variant: 'default', icon: Send, label: 'Sent to Customer' },
      approved: { variant: 'default', icon: Check, label: 'Approved' },
      rejected: { variant: 'destructive', icon: X, label: 'Rejected' },
      modified: { variant: 'secondary', icon: Edit, label: 'Modified' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Quote Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {quotes.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No quote requests yet</p>
                <p className="text-sm">Quote requests will appear here when customers submit them</p>
              </div>
            ) : (
              quotes.map((quote) => (
                <Card key={quote.id} className="border">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{quote.productName}</h3>
                        <p className="text-gray-600">{quote.companyName} - {quote.customerName}</p>
                        <p className="text-sm text-gray-500">{quote.email}</p>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(quote.status)}
                        <p className="text-sm text-gray-500 mt-1">
                          {new Date(quote.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Quote Summary */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <h4 className="font-medium mb-2">Quote Summary</h4>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">200 pcs:</span>
                          <span className="font-medium ml-2">
                            {getCurrencySymbol(quote.currency)}{quote.totals.qty200}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">500 pcs:</span>
                          <span className="font-medium ml-2">
                            {getCurrencySymbol(quote.currency)}{quote.totals.qty500}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">1000 pcs:</span>
                          <span className="font-medium ml-2">
                            {getCurrencySymbol(quote.currency)}{quote.totals.qty1000}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Components */}
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Components ({quote.components.length})</h4>
                      <div className="space-y-2">
                        {quote.components.map((comp, index) => (
                          <div key={index} className="text-sm bg-white border rounded p-2">
                            <span className="font-medium">{comp.product}</span>
                            <span className="text-gray-500 ml-2">- {comp.material}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Files */}
                    {quote.files.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-medium mb-2">Uploaded Files ({quote.files.length})</h4>
                        <div className="flex flex-wrap gap-2">
                          {quote.files.map((file, index) => (
                            <Badge key={index} variant="outline">{file.name}</Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Customer Comments */}
                    {quote.comments && (
                      <div className="mb-4">
                        <h4 className="font-medium mb-2">Customer Comments</h4>
                        <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded border-l-4 border-blue-400">
                          {quote.comments}
                        </div>
                      </div>
                    )}

                    {/* Admin Notes */}
                    {editingQuote === quote.id ? (
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Admin Notes</label>
                        <textarea
                          className="w-full border rounded px-3 py-2"
                          rows="3"
                          defaultValue={quote.adminNotes}
                          placeholder="Add notes about pricing adjustments, special requirements, etc."
                          id={`notes-${quote.id}`}
                        />
                      </div>
                    ) : quote.adminNotes && (
                      <div className="mb-4">
                        <h4 className="font-medium mb-2">Admin Notes</h4>
                        <p className="text-sm text-gray-600 bg-yellow-50 p-2 rounded">{quote.adminNotes}</p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 flex-wrap">
                      {quote.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => setEditingQuote(editingQuote === quote.id ? null : quote.id)}
                            variant="outline"
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            {editingQuote === quote.id ? 'Cancel' : 'Modify Quote'}
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => sendQuoteToCustomer(quote.id)}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            <Send className="h-4 w-4 mr-1" />
                            Send to Customer
                          </Button>
                        </>
                      )}
                      
                      {editingQuote === quote.id && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => {
                              const notes = document.getElementById(`notes-${quote.id}`).value;
                              updateQuoteStatus(quote.id, 'modified', null, notes);
                              setEditingQuote(null);
                            }}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Save className="h-4 w-4 mr-1" />
                            Save Changes
                          </Button>
                        </>
                      )}

                      {quote.status === 'sent' && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => updateQuoteStatus(quote.id, 'approved')}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Mark Approved
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => updateQuoteStatus(quote.id, 'rejected')}
                            variant="outline"
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="h-4 w-4 mr-1" />
                            Mark Rejected
                          </Button>
                        </>
                      )}

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(`/project/${quote.projectId}`, '_blank')}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View Project
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [editingProduct, setEditingProduct] = useState(null);
  const [products, setProducts] = useState(productCategories);

  // 简单的认证
  const handleLogin = () => {
    if (credentials.username === 'babyfishcom' && credentials.password === 'User@123') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials');
    }
  };

  // 更新产品价格
  const updateProductPrice = (category, productKey, quantity, newPrice) => {
    setProducts(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        products: {
          ...prev[category].products,
          [productKey]: {
            ...prev[category].products[productKey],
            basePrice: {
              ...prev[category].products[productKey].basePrice,
              [quantity]: parseFloat(newPrice) || 0
            }
          }
        }
      }
    }));
  };

  // 添加新产品
  const addNewProduct = (category) => {
    const newProductKey = `new_product_${Date.now()}`;
    setProducts(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        products: {
          ...prev[category].products,
          [newProductKey]: {
            name: 'New Product',
            basePrice: { 200: 0, 500: 0, 1000: 0 },
            material: '',
            printing: '',
            defaultSpecs: {}
          }
        }
      }
    }));
  };

  // 删除产品
  const deleteProduct = (category, productKey) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => {
        const newProducts = { ...prev };
        delete newProducts[category].products[productKey];
        return newProducts;
      });
    }
  };

  // 保存更改
  const saveChanges = () => {
    // 这里可以添加保存到数据库的逻辑
    alert('Changes saved successfully!');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Admin Login</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="Enter password"
              />
            </div>
            <Button onClick={handleLogin} className="w-full">
              Login
            </Button>
            <div className="text-center mt-2">
              <a href="/admin/projects" className="text-blue-600 hover:text-blue-800 text-sm">
                Project Management →
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-blue-100">Manage pricing and product information</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={saveChanges} className="bg-green-600 hover:bg-green-700">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
            <Button onClick={() => setIsAuthenticated(false)} variant="outline" className="border-white text-white hover:bg-white hover:text-blue-700">
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="quotes" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="quotes">Quote Management</TabsTrigger>
            <TabsTrigger value="pricing">Pricing Management</TabsTrigger>
            <TabsTrigger value="products">Product Management</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="quotes" className="space-y-6">
            <QuoteManagement />
          </TabsContent>

          <TabsContent value="pricing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(products).map(([categoryKey, category]) => (
                    <div key={categoryKey} className="border rounded-lg p-4">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        {category.name}
                        <Badge variant="outline">{Object.keys(category.products).length} products</Badge>
                      </h3>
                      
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="border border-gray-300 px-3 py-2 text-left">Product Name</th>
                              <th className="border border-gray-300 px-3 py-2 text-center">200 pcs (USD)</th>
                              <th className="border border-gray-300 px-3 py-2 text-center">500 pcs (USD)</th>
                              <th className="border border-gray-300 px-3 py-2 text-center">1000 pcs (USD)</th>
                              <th className="border border-gray-300 px-3 py-2 text-center">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.entries(category.products).map(([productKey, product]) => (
                              <tr key={productKey}>
                                <td className="border border-gray-300 px-3 py-2">
                                  <div>
                                    <div className="font-medium">{product.name}</div>
                                    <div className="text-xs text-gray-500">{product.material}</div>
                                  </div>
                                </td>
                                <td className="border border-gray-300 px-3 py-2 text-center">
                                  <input
                                    type="number"
                                    step="0.01"
                                    value={product.basePrice[200]}
                                    onChange={(e) => updateProductPrice(categoryKey, productKey, 200, e.target.value)}
                                    className="w-20 text-center border border-gray-200 rounded px-2 py-1"
                                  />
                                </td>
                                <td className="border border-gray-300 px-3 py-2 text-center">
                                  <input
                                    type="number"
                                    step="0.01"
                                    value={product.basePrice[500]}
                                    onChange={(e) => updateProductPrice(categoryKey, productKey, 500, e.target.value)}
                                    className="w-20 text-center border border-gray-200 rounded px-2 py-1"
                                  />
                                </td>
                                <td className="border border-gray-300 px-3 py-2 text-center">
                                  <input
                                    type="number"
                                    step="0.01"
                                    value={product.basePrice[1000]}
                                    onChange={(e) => updateProductPrice(categoryKey, productKey, 1000, e.target.value)}
                                    className="w-20 text-center border border-gray-200 rounded px-2 py-1"
                                  />
                                </td>
                                <td className="border border-gray-300 px-3 py-2 text-center">
                                  <div className="flex gap-1 justify-center">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => setEditingProduct({categoryKey, productKey, product})}
                                    >
                                      <Edit className="h-3 w-3" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => deleteProduct(categoryKey, productKey)}
                                      className="text-red-600 hover:text-red-700"
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                      <div className="mt-4">
                        <Button
                          size="sm"
                          onClick={() => addNewProduct(categoryKey)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add Product
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <p>Product management features coming soon...</p>
                  <p className="text-sm">Edit materials, printing options, and specifications</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Exchange Rates</label>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="text-xs text-gray-500">USD to CNY</label>
                        <input type="number" step="0.01" defaultValue="7.2" className="w-full border border-gray-300 rounded px-3 py-2" />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">USD to EUR</label>
                        <input type="number" step="0.01" defaultValue="0.85" className="w-full border border-gray-300 rounded px-3 py-2" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Custom Pricing Markup</label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-gray-500">Minimum (%)</label>
                        <input type="number" defaultValue="20" className="w-full border border-gray-300 rounded px-3 py-2" />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">Maximum (%)</label>
                        <input type="number" defaultValue="40" className="w-full border border-gray-300 rounded px-3 py-2" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
