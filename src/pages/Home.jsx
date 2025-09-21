import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Factory, 
  Users, 
  Globe, 
  Award, 
  CheckCircle, 
  ArrowRight,
  Star,
  Target,
  Zap
} from 'lucide-react';

const Home = () => {
  const stats = [
    { number: '15+', label: 'Years Experience', icon: Award },
    { number: '100+', label: 'Board Game Makers', icon: Users },
    { number: '50+', label: 'Kickstarter Projects', icon: Target },
    { number: '50+', label: 'Countries Exported', icon: Globe }
  ];

  const values = [
    { name: 'Professionalism', icon: Star },
    { name: 'Responsibility', icon: CheckCircle },
    { name: 'Perseverance', icon: Zap },
    { name: 'Thanksgiving', icon: Award }
  ];



  const services = [
    {
      title: 'Custom Board Games',
      description: 'Complete board game manufacturing from design to delivery',
      features: ['Game boxes', 'Game boards', 'Card printing', 'Components']
    },
    {
      title: 'Quality Assurance',
      description: 'International certifications and rigorous quality control',
      features: ['SMETA certified', 'FSC certified', 'Coca Cola approved', '3-level QC']
    },
    {
      title: 'One-Stop Service',
      description: 'From concept to finished product, we handle everything',
      features: ['Design support', 'Manufacturing', 'Packaging', 'Shipping']
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/assets/WpGn2hu092Bq.jpg" 
            alt="Board Game Manufacturing Factory" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Making Your Creation
              <span className="block text-yellow-400">Come True!</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Professional Board Game Manufacturing Services
            </p>
            <p className="text-lg mb-12 text-blue-200 max-w-2xl mx-auto">
              To be the top board game maker in the world. Providing one-stop service 
              for board games with 15+ years of experience and world-class quality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                <Link to="/quote">
                  Get Quote Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-700">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide our commitment to excellence in board game manufacturing
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{value.name}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive board game manufacturing solutions from concept to delivery
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const serviceImages = [
                '/assets/S668c5k6IQLb.jpg', // Board game components
                '/assets/imQ3P9HqR922.jpg', // Quality control
                '/assets/34Koxtt6sEgE.jpg'  // Packaging
              ];
              return (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={serviceImages[index]} 
                      alt={service.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Manufacturing Capabilities */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">World-Class Manufacturing</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Factory className="h-6 w-6 mr-3 text-yellow-400" />
                  <span>1 German Heidelberg Printing Press</span>
                </div>
                <div className="flex items-center">
                  <Factory className="h-6 w-6 mr-3 text-yellow-400" />
                  <span>10,000㎡ Production Area</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-6 w-6 mr-3 text-yellow-400" />
                  <span>50+ Professional Workers</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-6 w-6 mr-3 text-yellow-400" />
                  <span>SMETA, FSC, Coca Cola Certified</span>
                </div>
              </div>
              <Button asChild className="mt-8 bg-yellow-500 hover:bg-yellow-600 text-black">
                <Link to="/about">
                  Learn More About Our Facility
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="relative bg-white rounded-lg p-8 shadow-lg overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <img 
                  src="/assets/225iGKCm32BA.jpg" 
                  alt="Manufacturing Process" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Production Capabilities</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-semibold text-gray-900">Printing</div>
                    <div className="text-gray-700">4C/4C, CMYK</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Materials</div>
                    <div className="text-gray-700">250g-400g papers</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Finishing</div>
                    <div className="text-gray-700">Varnish, Lamination</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Components</div>
                    <div className="text-gray-700">Dice, Tokens, Figures</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Bring Your Game to Life?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Get a custom quote for your board game project. Our experts are ready to help 
            you create something amazing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black">
              <Link to="/quote">
                Get Your Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-gray-100 border-2 border-white font-semibold">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
