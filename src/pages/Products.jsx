import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Package, 
  Layers, 
  CreditCard, 
  FileText, 
  Dices, 
  Settings,
  CheckCircle,
  ArrowRight,
  Palette,
  Printer,
  Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('boxes');

  const productCategories = {
    boxes: {
      title: 'Game Boxes',
      icon: Package,
      description: 'Custom game boxes in various styles and sizes',
      products: [
        {
          name: 'Lid & Bottom Box',
          description: 'Classic two-piece box design, perfect for most board games',
          features: ['Height up to 140mm', 'Anti-scratch film option', 'Weight capacity up to 5kg', 'Custom sizes available'],
          specifications: ['Material: Grey board', 'Printing: 4C/4C CMYK', 'Finish: Matte/Gloss lamination'],
          image: '/assets/34Koxtt6sEgE.jpg'
        },
        {
          name: 'Tuck Box',
          description: 'Single-piece folding box, economical and efficient',
          features: ['Easy assembly', 'Cost-effective', 'Suitable for card games', 'Various closure styles'],
          specifications: ['Material: 350g-400g cardboard', 'Printing: Full color', 'Finish: Varnish/Lamination'],
          image: '/assets/fxqYa8wOMMXP.jpg'
        },
        {
          name: 'Custom Shape Box',
          description: 'Unique box designs tailored to your game theme',
          features: ['Unlimited design possibilities', 'Die-cut windows', 'Special closures', 'Themed shapes'],
          specifications: ['Material: Various options', 'Printing: Custom design', 'Finish: Multiple options'],
          image: '/assets/DGeWQPMKk8ho.jpg'
        }
      ]
    },
    boards: {
      title: 'Game Boards',
      icon: Layers,
      description: 'High-quality game boards with various folding options',
      products: [
        {
          name: 'Standard Game Board',
          description: '4-fold game board, the most popular choice',
          features: ['4-fold design', 'Standard 500x500mm', 'Anti-scratch coating', 'Edge binding option'],
          specifications: ['Material: 1.5mm grey board + paper', 'Printing: 4C/0C', 'Finish: Matte lamination'],
          image: '/assets/iJjVkVqG9be8.jpg'
        },
        {
          name: '6-Fold Game Board',
          description: 'Compact folding for larger game boards',
          features: ['6-fold design', 'Larger board sizes', 'Compact storage', 'Smooth folding'],
          specifications: ['Material: 1.5mm grey board + paper', 'Printing: 4C/0C', 'Finish: Anti-scratch film'],
          image: '/assets/w1msizMCbHNo.jpg'
        },
        {
          name: 'Custom Fold Board',
          description: 'Tailored folding patterns for specific requirements',
          features: ['Custom fold patterns', 'Various sizes', 'Special shapes', 'Unique designs'],
          specifications: ['Material: Customizable', 'Printing: Full color', 'Finish: Various options'],
          image: '/assets/m7QaeEH8ieSx.jpg'
        }
      ]
    },
    cards: {
      title: 'Game Cards',
      icon: CreditCard,
      description: 'Professional card printing with premium materials',
      products: [
        {
          name: 'Standard Game Cards',
          description: 'High-quality playing cards for various games',
          features: ['Standard poker size', '350g art paper', 'Smooth finish', 'Rounded corners'],
          specifications: ['Material: 350g art paper', 'Printing: 4C/4C CMYK', 'Finish: Varnish coating'],
          image: '/assets/arCnoxQ7L1rw.png'
        },
        {
          name: 'Premium Cards',
          description: 'Luxury cards with special finishes',
          features: ['Premium materials', 'Special coatings', 'Enhanced durability', 'Custom sizes'],
          specifications: ['Material: 400g art paper', 'Printing: Full color + special effects', 'Finish: UV/Foil options'],
          image: '/assets/IkzFYavjS0dk.webp'
        },
        {
          name: 'Mini Cards',
          description: 'Compact cards for specific game mechanics',
          features: ['Space-saving design', 'Easy handling', 'Cost-effective', 'Custom dimensions'],
          specifications: ['Material: 300g cardstock', 'Printing: 4C/4C', 'Finish: Matte lamination'],
          image: '/assets/zeKLFY12g4MI.jpg'
        }
      ]
    },
    diecuts: {
      title: 'Die-cut Components',
      icon: Settings,
      description: 'Custom shaped components and standees',
      products: [
        {
          name: 'Single Layer Die-cuts',
          description: 'Standard thickness die-cut components',
          features: ['2.5mm thickness', 'Custom shapes', 'Clean edges', 'Various sizes'],
          specifications: ['Material: Grey board + paper', 'Thickness: 2.5mm', 'Printing: 4C/0C'],
          image: '/assets/qcouOMAdoTfy.jpg'
        },
        {
          name: 'Multi-layer Die-cuts',
          description: 'Extra thick components for premium feel',
          features: ['Multiple layer construction', 'Enhanced durability', 'Premium thickness', 'Complex shapes'],
          specifications: ['Material: Multiple grey board layers', 'Thickness: 3-5mm', 'Printing: 4C/0C'],
          image: '/assets/4jLmjqPqsNhK.jpg'
        },
        {
          name: 'Spinner Components',
          description: 'Rotating game components with smooth action',
          features: ['Smooth rotation', 'Durable construction', 'Custom designs', 'Various sizes'],
          specifications: ['Material: Grey board + paper', 'Diameter: 8-15cm', 'Printing: 4C/4C'],
          image: '/assets/xcaLUmUIy9yJ.jpg'
        }
      ]
    },
    manuals: {
      title: 'Instruction Manuals',
      icon: FileText,
      description: 'Professional rulebooks and instruction manuals',
      products: [
        {
          name: 'Saddle Stitch Manual',
          description: 'Cost-effective binding for shorter manuals',
          features: ['4-48 pages', 'Saddle stitch binding', 'Full color printing', 'Various sizes'],
          specifications: ['Material: 125g coated paper', 'Pages: Multiples of 4', 'Binding: Saddle stitch'],
          image: '/assets/OP8s6wlOz8hz.jpg'
        },
        {
          name: 'Perfect Bound Manual',
          description: 'Professional binding for longer rulebooks',
          features: ['16+ pages', 'Perfect binding', 'Durable spine', 'Professional appearance'],
          specifications: ['Material: 125g coated paper', 'Pages: Multiples of 16', 'Binding: Perfect bound'],
          image: '/assets/ZkefNgRigKVK.jpg'
        },
        {
          name: 'Hardcover Manual',
          description: 'Premium hardcover rulebooks for deluxe games',
          features: ['Hardcover binding', 'Premium materials', 'Dust jacket option', 'Luxury feel'],
          specifications: ['Cover: Hardcover board', 'Pages: Various counts', 'Binding: Case bound'],
          image: '/assets/Qn6UHgGDN0hc.jpg'
        }
      ]
    },
    components: {
      title: 'Game Components',
      icon: Dices,
      description: 'Various game pieces and accessories',
      products: [
        {
          name: 'Custom Dice',
          description: 'Standard and custom printed dice',
          features: ['D6, D8, D10, D12, D20', 'Custom printing', 'Various colors', 'Standard or custom designs'],
          specifications: ['Material: Acrylic/Resin', 'Sizes: 12-20mm', 'Printing: Pad printing/Engraving'],
          image: '/assets/6PV4SYfdGEGx.jpg'
        },
        {
          name: 'Wooden Components',
          description: 'Natural wood game pieces and tokens',
          features: ['Natural wood', 'Custom shapes', 'Laser engraving', 'Various wood types'],
          specifications: ['Material: Birch/Beech wood', 'Thickness: 3-8mm', 'Finish: Natural/Stained'],
          image: '/assets/WPbGFzq8SC4O.jpg'
        },
        {
          name: 'Plastic Components',
          description: 'Durable plastic game pieces and miniatures',
          features: ['Injection molded', 'Custom designs', 'Various colors', 'High detail'],
          specifications: ['Material: ABS/PVC', 'Colors: Custom', 'Finish: Various options'],
          image: '/assets/bUXr8gdb16S9.jpg'
        }
      ]
    }
  };

  const manufacturingProcess = [
    {
      step: 1,
      title: 'Design Review',
      description: 'We review your artwork and provide technical feedback'
    },
    {
      step: 2,
      title: 'Pre-production Sample',
      description: 'Create samples for approval before mass production'
    },
    {
      step: 3,
      title: 'Production',
      description: 'Manufacturing with quality control at every stage'
    },
    {
      step: 4,
      title: 'Quality Inspection',
      description: 'Final inspection and packaging preparation'
    },
    {
      step: 5,
      title: 'Shipping',
      description: 'Secure packaging and worldwide delivery'
    }
  ];

  const qualityFeatures = [
    {
      icon: Printer,
      title: 'German Heidelberg Presses',
      description: 'State-of-the-art printing technology for superior quality'
    },
    {
      icon: Shield,
      title: 'Quality Certifications',
      description: 'SMETA, FSC, and Coca Cola certified processes'
    },
    {
      icon: CheckCircle,
      title: '3-Level Quality Control',
      description: 'Rigorous inspection at every production stage'
    },
    {
      icon: Palette,
      title: 'Color Accuracy',
      description: 'Precise color matching and consistency'
    }
  ];

  const currentCategory = productCategories[activeCategory];
  const IconComponent = currentCategory.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Products & Services</h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Comprehensive board game manufacturing solutions
            </p>
            <p className="text-lg text-blue-200 max-w-4xl mx-auto">
              From custom game boxes to intricate components, we provide everything you need 
              to bring your board game vision to life with professional quality and precision.
            </p>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Product Categories</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our comprehensive range of board game manufacturing services
            </p>
          </div>

          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-8">
              {Object.entries(productCategories).map(([key, category]) => {
                const TabIcon = category.icon;
                return (
                  <TabsTrigger key={key} value={key} className="flex flex-col items-center p-3">
                    <TabIcon className="h-5 w-5 mb-1" />
                    <span className="text-xs">{category.title}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {Object.entries(productCategories).map(([key, category]) => (
              <TabsContent key={key} value={key}>
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{category.title}</h3>
                      <p className="text-gray-600">{category.description}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.products.map((product, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow overflow-hidden">
                      {product.image && (
                        <div className="h-48 overflow-hidden">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle className="text-lg">{product.name}</CardTitle>
                        <CardDescription>{product.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-sm text-gray-900 mb-2">Features:</h4>
                            <ul className="space-y-1">
                              {product.features.map((feature, featureIndex) => (
                                <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                                  <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-sm text-gray-900 mb-2">Specifications:</h4>
                            <div className="space-y-1">
                              {product.specifications.map((spec, specIndex) => (
                                <Badge key={specIndex} variant="outline" className="text-xs mr-1 mb-1">
                                  {spec}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Manufacturing Process */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Manufacturing Process</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our streamlined process ensures quality and efficiency from start to finish
            </p>
          </div>

          <div className="relative">
            {/* Process line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-blue-200 transform -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {manufacturingProcess.map((process, index) => (
                <div key={index} className="relative text-center">
                  {/* Step circle */}
                  <div className="relative z-10 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                    {process.step}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{process.title}</h3>
                  <p className="text-sm text-gray-600">{process.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quality Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quality Assurance</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We maintain the highest standards through advanced technology and rigorous processes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {qualityFeatures.map((feature, index) => {
              const FeatureIcon = feature.icon;
              return (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FeatureIcon className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Get a custom quote for your board game manufacturing needs. Our team is ready to help 
            bring your vision to life with professional quality and competitive pricing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black">
              <Link to="/quote">
                Get Custom Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-700">
              <Link to="/contact">Contact Our Team</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
