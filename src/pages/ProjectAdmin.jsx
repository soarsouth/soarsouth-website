import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FolderOpen, 
  Settings, 
  Upload, 
  Download, 
  Edit, 
  Trash2, 
  Eye,
  Clock,
  User,
  FileText
} from 'lucide-react';

const ProjectAdmin = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  // 模拟项目数据
  useEffect(() => {
    const mockProjects = [
      {
        id: 'proj_001',
        companyName: 'Butternut Studios',
        productName: 'Fantasy Adventure Game',
        customerName: 'John Smith',
        email: 'john@butternut.com',
        currentStage: 0,
        currentSubStage: 1,
        createdAt: '2024-09-15',
        status: 'active'
      },
      {
        id: 'proj_002',
        companyName: 'Game Makers Inc',
        productName: 'Strategy Board Game',
        customerName: 'Sarah Johnson',
        email: 'sarah@gamemakers.com',
        currentStage: 2,
        currentSubStage: 0,
        createdAt: '2024-09-10',
        status: 'active'
      }
    ];
    setProjects(mockProjects);
  }, []);

  const processSteps = [
    'Initial Consultation',
    'Quote & Agreement', 
    'Design & Artwork',
    'Sample Production',
    'Mass Production',
    'Quality Inspection',
    'Shipping & Delivery'
  ];

  const handleStageUpdate = (projectId, newStage, newSubStage) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { ...project, currentStage: newStage, currentSubStage: newSubStage }
        : project
    ));
  };

  const handleUploadDeliverable = (projectId, stage, file) => {
    // 处理文件上传逻辑
    console.log('Uploading deliverable:', projectId, stage, file);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Project Management</h1>
          <p className="text-blue-100 mt-2">Manage client projects and deliverables</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="projects">Active Projects</TabsTrigger>
            <TabsTrigger value="deliverables">Deliverables</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Active Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="grid gap-6">
              {projects.map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <FolderOpen className="h-5 w-5" />
                          {project.productName}
                        </CardTitle>
                        <p className="text-gray-600 mt-1">{project.companyName}</p>
                      </div>
                      <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
                        {project.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Customer</label>
                        <p className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {project.customerName}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Current Stage</label>
                        <p className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {processSteps[project.currentStage]}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Created</label>
                        <p>{project.createdAt}</p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{Math.round(((project.currentStage * 4 + project.currentSubStage + 1) / 28) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${((project.currentStage * 4 + project.currentSubStage + 1) / 28) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Stage Management */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <select 
                        value={project.currentStage}
                        onChange={(e) => handleStageUpdate(project.id, parseInt(e.target.value), 0)}
                        className="border border-gray-300 rounded px-3 py-1 text-sm"
                      >
                        {processSteps.map((step, index) => (
                          <option key={index} value={index}>{step}</option>
                        ))}
                      </select>
                      <select 
                        value={project.currentSubStage}
                        onChange={(e) => handleStageUpdate(project.id, project.currentStage, parseInt(e.target.value))}
                        className="border border-gray-300 rounded px-3 py-1 text-sm"
                      >
                        <option value={0}>Sub-step 1</option>
                        <option value={1}>Sub-step 2</option>
                        <option value={2}>Sub-step 3</option>
                        <option value={3}>Sub-step 4</option>
                      </select>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => window.open(`/project/${project.id}`, '_blank')}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View Project
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        <Upload className="h-4 w-4 mr-1" />
                        Upload Deliverable
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Deliverables Tab */}
          <TabsContent value="deliverables" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Deliverable Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {processSteps.map((step, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Stage {index + 1}: {step}</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                        <div>Sub-step 1 Template</div>
                        <div>Sub-step 2 Template</div>
                        <div>Sub-step 3 Template</div>
                        <div>Sub-step 4 Template</div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline">
                          <Upload className="h-4 w-4 mr-1" />
                          Upload Template
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Process Configuration */}
                  <div>
                    <h4 className="font-medium mb-4">Process Configuration</h4>
                    <div className="space-y-4">
                      {processSteps.map((step, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h5 className="font-medium">Stage {index + 1}: {step}</h5>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <label className="block text-gray-600 mb-1">Duration (days):</label>
                              <input type="number" className="border rounded px-2 py-1 w-20" defaultValue="5" />
                            </div>
                            <div>
                              <label className="block text-gray-600 mb-1">Required Files:</label>
                              <input type="text" className="border rounded px-2 py-1 w-full" placeholder="PDF, DOC, etc." />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* File Upload Settings */}
                  <div>
                    <h4 className="font-medium mb-4">File Upload Settings</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Allowed File Types
                        </label>
                        <input 
                          type="text" 
                          className="w-full border border-gray-300 rounded px-3 py-2"
                          defaultValue="PDF, DOC, DOCX, XLS, XLSX, JPG, PNG, AI, PSD"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Max File Size (MB)
                        </label>
                        <input 
                          type="number" 
                          className="w-full border border-gray-300 rounded px-3 py-2"
                          defaultValue="50"
                        />
                      </div>
                    </div>
                  </div>

                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Save Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProjectAdmin;
