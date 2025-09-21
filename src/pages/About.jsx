import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Factory, 
  Users, 
  Award, 
  Globe, 
  Calendar,
  CheckCircle,
  Target,
  Zap,
  Star
} from 'lucide-react';

const About = () => {
  const timeline = [
    {
      year: '2015',
      title: 'Company Founded',
      description: 'Soarsouth was established with a vision to become the top board game maker in the world.'
    },
    {
      year: '2018',
      title: 'Factory Established',
      description: 'Built our first manufacturing facility with modern equipment and quality control systems.'
    },
    {
      year: '2019',
      title: 'Equipment Expansion',
      description: 'Acquired German Heidelberg printing presses and expanded to 2000㎡ work area.'
    },
    {
      year: '2020',
      title: 'Team Growth',
      description: 'Expanded our professional team to over 50 skilled workers and specialists.'
    },
    {
      year: '2021',
      title: 'Customer Milestone',
      description: 'Cooperated with more than 2000 customers worldwide, establishing global partnerships.'
    },
    {
      year: '2022',
      title: 'Publisher Network',
      description: 'Worked with 200+ publishers, helping bring innovative games to market.'
    },
    {
      year: '2023',
      title: 'Quality Enhancement',
      description: 'Established dust-free assembly workshop and enhanced quality control systems.'
    },
    {
      year: '2024',
      title: 'Innovation Focus',
      description: 'Collaborated with clients to co-develop over 20 new board games.'
    }
  ];

  const capabilities = [
    {
      icon: Factory,
      title: 'Manufacturing Excellence',
      description: '10,000㎡ production facility with German Heidelberg printing presses'
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: '50+ professional workers with 15+ years of industry experience'
    },
    {
      icon: Award,
      title: 'Quality Certifications',
      description: 'SMETA, FSC, and Coca Cola certified manufacturing processes'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Products exported to 50+ countries with established logistics network'
    }
  ];

  const values = [
    {
      icon: Star,
      title: 'Professionalism',
      description: 'We maintain the highest standards in every aspect of our work, from design consultation to final delivery.'
    },
    {
      icon: CheckCircle,
      title: 'Responsibility',
      description: 'We take full responsibility for quality, timelines, and customer satisfaction in every project.'
    },
    {
      icon: Zap,
      title: 'Perseverance',
      description: 'We persist through challenges and continuously improve our processes and capabilities.'
    },
    {
      icon: Award,
      title: 'Thanksgiving',
      description: 'We are grateful for our customers, partners, and team members who make our success possible.'
    }
  ];

  const certifications = [
    {
      name: 'SMETA',
      description: 'Sedex Members Ethical Trade Audit',
      details: 'Ensuring ethical business practices and social responsibility'
    },
    {
      name: 'FSC',
      description: 'Forest Stewardship Council',
      details: 'Responsible sourcing of paper and wood materials'
    },
    {
      name: 'Coca Cola',
      description: 'Coca Cola Supplier Certification',
      details: 'Meeting stringent quality and safety standards'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/assets/eGHucne08IGO.jpg" 
            alt="Board Game Manufacturing Factory" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Soarsouth</h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              To be the top board game maker in the world
            </p>
            <p className="text-lg text-blue-200 max-w-4xl mx-auto">
              With over 15 years of experience in board game manufacturing, we provide comprehensive 
              one-stop services from design consultation to final delivery, helping creators bring 
              their visions to life with professional quality and reliability.
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2015, Soarsouth began with a simple yet ambitious vision: to become 
                  the world's leading board game manufacturer. What started as a small operation 
                  has grown into a comprehensive manufacturing powerhouse serving clients globally.
                </p>
                <p>
                  Our journey has been marked by continuous investment in technology, people, and 
                  processes. From our first facility to our current 10,000㎡ production center 
                  equipped with German Heidelberg printing presses, we've never stopped evolving.
                </p>
                <p>
                  Today, we're proud to have helped over 100 board game makers bring their 
                  creations to life, supported 50+ successful Kickstarter campaigns, and 
                  exported our products to more than 50 countries worldwide.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="mb-8">
                <img 
                  src="/assets/ZP1a4StxXebb.jpg" 
                  alt="Board Game Manufacturing Steps" 
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                {capabilities.map((capability, index) => {
                  const IconComponent = capability.icon;
                  return (
                    <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex justify-center mb-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <IconComponent className="h-6 w-6 text-blue-600" />
                          </div>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">{capability.title}</h3>
                        <p className="text-sm text-gray-600">{capability.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do and shape our commitment to excellence
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-sm text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Development Timeline */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Key milestones in our growth from startup to industry leader
            </p>
          </div>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-blue-200"></div>
            
            <div className="space-y-12">
              {timeline.map((event, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow"></div>
                  
                  {/* Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center mb-2">
                          <Calendar className="h-4 w-4 text-blue-600 mr-2" />
                          <Badge variant="outline" className="text-blue-600 border-blue-600">
                            {event.year}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                        <p className="text-gray-600">{event.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quality Certifications</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our commitment to quality is validated by international certifications
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <Award className="h-8 w-8 text-green-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{cert.name}</h3>
                  <p className="text-sm font-medium text-gray-700 mb-3">{cert.description}</p>
                  <p className="text-sm text-gray-600">{cert.details}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">By the Numbers</h2>
            <p className="text-xl text-blue-100">
              Our achievements speak for themselves
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-blue-200">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-blue-200">Board Game Makers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-200">Kickstarter Projects</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-200">Countries Exported</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
