import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  MessageSquare, 
  DollarSign, 
  Palette, 
  Package, 
  Factory, 
  CheckCircle, 
  Truck,
  ArrowRight,
  Clock,
  Users,
  Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Process = () => {
  const processSteps = [
    {
      step: 1,
      icon: MessageSquare,
      title: 'Initial Consultation',
      description: 'Discuss your project requirements, timeline, and budget',
      duration: '1-2 days',
      details: [
        'Project scope discussion',
        'Technical requirements review',
        'Timeline and budget planning',
        'Initial feasibility assessment'
      ]
    },
    {
      step: 2,
      icon: DollarSign,
      title: 'Quote & Agreement',
      description: 'Receive detailed quote and finalize project terms',
      duration: '2-3 days',
      details: [
        'Detailed cost breakdown',
        'Production timeline',
        'Terms and conditions',
        'Contract signing'
      ]
    },
    {
      step: 3,
      icon: Palette,
      title: 'Design & Artwork',
      description: 'Finalize artwork and prepare production files',
      duration: '3-7 days',
      details: [
        'Artwork review and optimization',
        'Technical file preparation',
        'Color matching and proofing',
        'Final approval process'
      ]
    },
    {
      step: 4,
      icon: Package,
      title: 'Sample Production',
      description: 'Create pre-production samples for approval',
      duration: '5-10 days',
      details: [
        'Physical sample creation',
        'Quality assessment',
        'Client review and feedback',
        'Final adjustments if needed'
      ]
    },
    {
      step: 5,
      icon: Factory,
      title: 'Mass Production',
      description: 'Full-scale manufacturing with quality control',
      duration: '15-30 days',
      details: [
        'Production scheduling',
        'Manufacturing execution',
        'Quality control checkpoints',
        'Progress updates'
      ]
    },
    {
      step: 6,
      icon: CheckCircle,
      title: 'Quality Inspection',
      description: 'Final quality check and packaging preparation',
      duration: '2-3 days',
      details: [
        'Final quality inspection',
        'Packaging and labeling',
        'Documentation preparation',
        'Shipping preparation'
      ]
    },
    {
      step: 7,
      icon: Truck,
      title: 'Shipping & Delivery',
      description: 'Secure packaging and worldwide delivery',
      duration: '5-20 days',
      details: [
        'Secure packaging',
        'Shipping documentation',
        'Tracking information',
        'Delivery confirmation'
      ]
    }
  ];

  const artworkRequirements = [
    {
      category: 'File Formats',
      requirements: ['PDF (preferred)', 'Adobe Illustrator (.ai)', 'Adobe Photoshop (.psd)', 'High-resolution JPEG']
    },
    {
      category: 'Color Settings',
      requirements: ['CMYK color mode', 'Pure black (C:0% M:0% Y:0% K:100%)', 'Pantone colors specified', 'Color profiles embedded']
    },
    {
      category: 'Resolution & Size',
      requirements: ['300 DPI minimum', 'Actual size (1:1 scale)', '3mm bleed on all sides', 'Vector graphics preferred']
    },
    {
      category: 'Text & Fonts',
      requirements: ['All text outlined/converted', 'Embedded fonts if text preserved', 'Minimum 6pt font size', 'High contrast for readability']
    }
  ];

  const qualityStandards = [
    {
      icon: Shield,
      title: '3-Level Quality Control',
      description: 'Rigorous inspection at material, production, and final stages'
    },
    {
      icon: Users,
      title: 'Experienced Team',
      description: 'Quality controllers with 10+ years of experience'
    },
    {
      icon: CheckCircle,
      title: 'International Standards',
      description: 'SMETA, FSC, and Coca Cola certified processes'
    },
    {
      icon: Factory,
      title: 'Modern Equipment',
      description: 'German Heidelberg presses and precision machinery'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/assets/iLZv36gYQdN5.jpg" 
            alt="Board Game Manufacturing Process" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Manufacturing Process</h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              From concept to delivery in 7 simple steps
            </p>
            <p className="text-lg text-blue-200 max-w-4xl mx-auto">
              Our streamlined process ensures quality, efficiency, and transparency throughout 
              your board game manufacturing journey.
            </p>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Step-by-Step Process</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Each step is carefully managed to ensure the highest quality and timely delivery
            </p>
          </div>

          <div className="space-y-8">
            {processSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="grid grid-cols-1 lg:grid-cols-3">
                    {/* Step Header */}
                    <div className="bg-blue-50 p-6 flex items-center">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                          {step.step}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <IconComponent className="h-5 w-5 text-blue-600 mr-2" />
                            <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                          </div>
                          <p className="text-gray-600 text-sm">{step.description}</p>
                          <Badge variant="outline" className="mt-2">
                            <Clock className="h-3 w-3 mr-1" />
                            {step.duration}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Step Details */}
                    <div className="lg:col-span-2 p-6">
                      <h4 className="font-semibold text-gray-900 mb-3">What happens in this step:</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Artwork Requirements */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Artwork Requirements</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ensure your artwork meets our technical specifications for optimal results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {artworkRequirements.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.requirements.map((requirement, reqIndex) => (
                      <li key={reqIndex} className="flex items-start text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        {requirement}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Card className="inline-block bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <FileText className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Need Help with Artwork?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Our design team can assist with artwork preparation and optimization
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link to="/contact">Contact Design Team</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quality Standards */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quality Assurance</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our commitment to quality is backed by rigorous standards and processes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {qualityStandards.map((standard, index) => {
              const IconComponent = standard.icon;
              return (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{standard.title}</h3>
                    <p className="text-sm text-gray-600">{standard.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Overview */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Typical Timeline</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              From initial consultation to delivery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">1-2</div>
              <div className="text-blue-200 mb-2">Weeks</div>
              <div className="text-sm">Pre-production Phase</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">2-4</div>
              <div className="text-blue-200 mb-2">Weeks</div>
              <div className="text-sm">Production Phase</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1-3</div>
              <div className="text-blue-200 mb-2">Weeks</div>
              <div className="text-sm">Shipping & Delivery</div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-blue-100 mb-6">
              Total project timeline typically ranges from 4-9 weeks depending on complexity
            </p>
            <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black">
              <Link to="/quote">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Process;
