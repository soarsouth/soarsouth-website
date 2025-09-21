import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  DollarSign, 
  Palette, 
  Package, 
  Factory, 
  CheckCircle, 
  Truck,
  Clock,
  FileText,
  Download,
  Upload,
  Eye
} from 'lucide-react';

const ProjectProgress = () => {
  const { projectId } = useParams();
  const [projectData, setProjectData] = useState(null);
  const [currentStage, setCurrentStage] = useState(0);
  const [currentSubStage, setCurrentSubStage] = useState(0);

  // 7个大节点，每个节点4个小节点
  const processSteps = [
    {
      step: 1,
      icon: MessageSquare,
      title: 'Initial Consultation',
      description: 'Project requirements and planning',
      subSteps: [
        { title: 'Project Scope Discussion', status: 'completed' },
        { title: 'Technical Requirements Review', status: 'in-progress' },
        { title: 'Timeline Planning', status: 'pending' },
        { title: 'Feasibility Assessment', status: 'pending' }
      ]
    },
    {
      step: 2,
      icon: DollarSign,
      title: 'Quote & Agreement',
      description: 'Pricing and contract finalization',
      subSteps: [
        { title: 'Detailed Quote Review', status: 'pending' },
        { title: 'Terms Negotiation', status: 'pending' },
        { title: 'Contract Preparation', status: 'pending' },
        { title: 'Agreement Signing', status: 'pending' }
      ]
    },
    {
      step: 3,
      icon: Palette,
      title: 'Design & Artwork',
      description: 'Creative development and file preparation',
      subSteps: [
        { title: 'Artwork Review', status: 'pending' },
        { title: 'Technical File Prep', status: 'pending' },
        { title: 'Color Proofing', status: 'pending' },
        { title: 'Final Approval', status: 'pending' }
      ]
    },
    {
      step: 4,
      icon: Package,
      title: 'Sample Production',
      description: 'Pre-production sample creation',
      subSteps: [
        { title: 'Sample Creation', status: 'pending' },
        { title: 'Quality Assessment', status: 'pending' },
        { title: 'Client Review', status: 'pending' },
        { title: 'Final Adjustments', status: 'pending' }
      ]
    },
    {
      step: 5,
      icon: Factory,
      title: 'Mass Production',
      description: 'Full-scale manufacturing',
      subSteps: [
        { title: 'Production Scheduling', status: 'pending' },
        { title: 'Manufacturing', status: 'pending' },
        { title: 'Quality Control', status: 'pending' },
        { title: 'Progress Updates', status: 'pending' }
      ]
    },
    {
      step: 6,
      icon: CheckCircle,
      title: 'Quality Inspection',
      description: 'Final quality assurance',
      subSteps: [
        { title: 'Final Inspection', status: 'pending' },
        { title: 'Packaging Prep', status: 'pending' },
        { title: 'Documentation', status: 'pending' },
        { title: 'Shipping Prep', status: 'pending' }
      ]
    },
    {
      step: 7,
      icon: Truck,
      title: 'Shipping & Delivery',
      description: 'Final delivery and completion',
      subSteps: [
        { title: 'Secure Packaging', status: 'pending' },
        { title: 'Shipping Docs', status: 'pending' },
        { title: 'Tracking Setup', status: 'pending' },
        { title: 'Delivery Confirmation', status: 'pending' }
      ]
    }
  ];

  // 模拟从URL参数或localStorage获取项目数据
  useEffect(() => {
    const savedProject = localStorage.getItem(`project_${projectId}`);
    if (savedProject) {
      const project = JSON.parse(savedProject);
      setProjectData(project);
      setCurrentStage(project.currentStage || 0);
      setCurrentSubStage(project.currentSubStage || 0);
    }
  }, [projectId]);

  const getStageStatus = (stepIndex, subStepIndex) => {
    if (stepIndex < currentStage) return 'completed';
    if (stepIndex === currentStage && subStepIndex <= currentSubStage) return 'in-progress';
    return 'pending';
  };

  const handleConfirmDeliverable = () => {
    // 确认交付物，进入下一阶段
    if (currentSubStage < 3) {
      setCurrentSubStage(currentSubStage + 1);
    } else if (currentStage < 6) {
      setCurrentStage(currentStage + 1);
      setCurrentSubStage(0);
    }
  };

  const renderDeliverable = () => {
    // 检查项目状态，如果是等待报价确认
    if (projectData.status === 'quote_pending') {
      // 获取对应的报价数据
      const quotes = JSON.parse(localStorage.getItem('admin_quotes') || '[]');
      const projectQuote = quotes.find(q => q.projectId === projectId);
      
      if (projectQuote && projectQuote.status === 'sent') {
        return (
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Quote Confirmation Required
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-2">Quote Ready for Your Review</h4>
                  <p className="text-blue-700 text-sm">
                    Our team has prepared a detailed quote for your project. Please review and confirm to proceed.
                  </p>
                </div>

                {/* Quote Details */}
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-4">Final Quote Details</h4>
                  
                  {/* Pricing Table */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h5 className="font-medium mb-3">Pricing Options</h5>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-white rounded border">
                        <div className="text-2xl font-bold text-blue-600">
                          {projectQuote.currency === 'USD' ? '$' : projectQuote.currency === 'CNY' ? '¥' : '€'}
                          {projectQuote.totals.qty200}
                        </div>
                        <div className="text-sm text-gray-600">200 pieces</div>
                        <div className="text-xs text-gray-500 mt-1">Per unit cost</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded border border-green-300">
                        <div className="text-2xl font-bold text-green-600">
                          {projectQuote.currency === 'USD' ? '$' : projectQuote.currency === 'CNY' ? '¥' : '€'}
                          {projectQuote.totals.qty500}
                        </div>
                        <div className="text-sm text-gray-600">500 pieces</div>
                        <div className="text-xs text-green-600 mt-1">Recommended</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded border">
                        <div className="text-2xl font-bold text-blue-600">
                          {projectQuote.currency === 'USD' ? '$' : projectQuote.currency === 'CNY' ? '¥' : '€'}
                          {projectQuote.totals.qty1000}
                        </div>
                        <div className="text-sm text-gray-600">1000 pieces</div>
                        <div className="text-xs text-gray-500 mt-1">Best value</div>
                      </div>
                    </div>
                  </div>

                  {/* Components Summary */}
                  <div className="mb-4">
                    <h5 className="font-medium mb-2">Components Included</h5>
                    <div className="space-y-2">
                      {projectQuote.components.map((comp, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <div>
                            <span className="font-medium">{comp.product || comp.category}</span>
                            <span className="text-gray-500 text-sm ml-2">- {comp.material}</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            {comp.dimension && `${comp.dimension}`}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Admin Notes */}
                  {projectQuote.adminNotes && (
                    <div className="mb-4">
                      <h5 className="font-medium mb-2">Special Notes</h5>
                      <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                        <p className="text-sm text-yellow-800">{projectQuote.adminNotes}</p>
                      </div>
                    </div>
                  )}

                  {/* Terms */}
                  <div className="text-xs text-gray-500 mb-4">
                    <ul className="space-y-1">
                      <li>• Quote valid for 15 days from issue date</li>
                      <li>• All prices are EXW (Ex Works) terms</li>
                      <li>• Production time: 15-20 business days after approval</li>
                      <li>• Payment terms: 50% deposit, 50% before shipping</li>
                    </ul>
                  </div>
                </div>

                {/* Confirmation Actions */}
                <div className="flex gap-3">
                  <Button 
                    onClick={() => {
                      // 确认报价，更新状态
                      const updatedProject = {
                        ...projectData,
                        status: 'active',
                        currentStage: 1,
                        currentSubStage: 0,
                        confirmedQuote: projectQuote,
                        confirmedAt: new Date().toISOString()
                      };
                      
                      localStorage.setItem(`project_${projectId}`, JSON.stringify(updatedProject));
                      
                      // 更新报价状态
                      const updatedQuotes = quotes.map(q => 
                        q.id === projectQuote.id 
                          ? { ...q, status: 'approved', approvedAt: new Date().toISOString() }
                          : q
                      );
                      localStorage.setItem('admin_quotes', JSON.stringify(updatedQuotes));
                      
                      // 刷新页面数据
                      setProjectData(updatedProject);
                      setCurrentStage(1);
                      setCurrentSubStage(0);
                      
                      alert('Quote confirmed! Your project will now proceed to the next stage.');
                    }}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Confirm Quote & Proceed
                  </Button>
                  
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download Quote PDF
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="text-red-600 hover:text-red-700"
                    onClick={() => {
                      if (confirm('Are you sure you want to request quote modifications? This will send your project back for review.')) {
                        // 可以添加请求修改的逻辑
                        alert('Quote modification request sent. Our team will contact you shortly.');
                      }
                    }}
                  >
                    Request Modifications
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      }
    }

    if (currentStage === 0 && currentSubStage === 0) {
      // 显示初始报价请求状态
      return (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Quote Request Submitted
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <div className="bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">Quote Under Review</h3>
              <p className="text-gray-600 mb-4">
                Our team is preparing a detailed quote for your project. 
                You will receive an email notification when it's ready for review.
              </p>
              <div className="text-sm text-gray-500">
                <p>Expected completion: Within 24 hours</p>
                <p>Project ID: {projectId}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }
    
    // 其他阶段的交付物
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Stage Deliverables</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Deliverables will be uploaded here</p>
              <p className="text-sm text-gray-500 mt-2">
                Supports: PDF, DOC, DOCX, XLS, XLSX, Images
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={handleConfirmDeliverable} className="bg-blue-600 hover:bg-blue-700">
                Confirm & Continue
              </Button>
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (!projectData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h2>
          <p className="text-gray-600">The requested project could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">{projectData.productName}</h1>
          <p className="text-blue-100 mt-2">{projectData.companyName} - Project Progress</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Progress Steps */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Project Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {processSteps.map((step, stepIndex) => {
                    const StepIcon = step.icon;
                    const isCurrentStep = stepIndex === currentStage;
                    const isCompleted = stepIndex < currentStage;
                    
                    return (
                      <div key={stepIndex} className="space-y-2">
                        {/* Main Step */}
                        <div className={`flex items-center gap-3 p-3 rounded-lg ${
                          isCurrentStep ? 'bg-blue-50 border-2 border-blue-200' : 
                          isCompleted ? 'bg-green-50 border-2 border-green-200' : 
                          'bg-gray-50 border border-gray-200'
                        }`}>
                          <div className={`p-2 rounded-full ${
                            isCurrentStep ? 'bg-blue-600 text-white' :
                            isCompleted ? 'bg-green-600 text-white' :
                            'bg-gray-400 text-white'
                          }`}>
                            <StepIcon className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{step.title}</h4>
                            <p className="text-sm text-gray-600">{step.description}</p>
                          </div>
                          <Badge variant={
                            isCompleted ? 'success' : 
                            isCurrentStep ? 'default' : 
                            'secondary'
                          }>
                            {isCompleted ? 'Done' : isCurrentStep ? 'Active' : 'Pending'}
                          </Badge>
                        </div>
                        
                        {/* Sub Steps */}
                        {isCurrentStep && (
                          <div className="ml-6 space-y-1">
                            {step.subSteps.map((subStep, subIndex) => {
                              const isCurrentSub = subIndex === currentSubStage;
                              const isCompletedSub = subIndex < currentSubStage;
                              
                              return (
                                <div key={subIndex} className={`flex items-center gap-2 p-2 rounded text-sm ${
                                  isCurrentSub ? 'bg-blue-100 text-blue-800' :
                                  isCompletedSub ? 'bg-green-100 text-green-800' :
                                  'text-gray-600'
                                }`}>
                                  <div className={`w-2 h-2 rounded-full ${
                                    isCurrentSub ? 'bg-blue-600' :
                                    isCompletedSub ? 'bg-green-600' :
                                    'bg-gray-300'
                                  }`}></div>
                                  {subStep.title}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Content - Deliverables */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Current Stage Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Current Stage: {processSteps[currentStage].title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{processSteps[currentStage].description}</p>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline">
                      Step {currentStage + 1} of 7
                    </Badge>
                    <Badge variant="outline">
                      Sub-step {currentSubStage + 1} of 4
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Deliverables */}
              {renderDeliverable()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectProgress;
