import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ExternalLink, 
  Users, 
  Calendar, 
  Package,
  Star,
  Target,
  Award,
  Globe
} from 'lucide-react';

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const portfolioCategories = [
    { id: 'all', name: 'All Projects', count: 12 },
    { id: 'kickstarter', name: 'Kickstarter', count: 6 },
    { id: 'strategy', name: 'Strategy Games', count: 4 },
    { id: 'family', name: 'Family Games', count: 3 },
    { id: 'educational', name: 'Educational', count: 2 }
  ];

  const projects = [
    {
      id: 1,
      title: 'Epic Adventure Quest',
      category: 'kickstarter',
      type: 'Strategy Game',
      description: 'A complex strategy board game with custom miniatures and modular board pieces.',
      image: '/api/placeholder/400/300',
      stats: {
        players: '2-4 Players',
        duration: '90-120 min',
        funded: '$250,000',
        backers: '3,500+'
      },
      components: ['Custom Game Box', 'Modular Board', '150+ Cards', '40 Miniatures', 'Dice Set'],
      challenges: 'Complex miniature molding and multi-component packaging',
      solution: 'Custom injection molding and specialized packaging design',
      featured: true
    },
    {
      id: 2,
      title: 'Family Fun Night',
      category: 'family',
      type: 'Party Game',
      description: 'A light-hearted family game with colorful components and simple rules.',
      image: '/api/placeholder/400/300',
      stats: {
        players: '3-8 Players',
        duration: '30-45 min',
        funded: '$75,000',
        backers: '1,200+'
      },
      components: ['Tuck Box', 'Game Cards', 'Score Pad', 'Wooden Tokens'],
      challenges: 'Cost optimization while maintaining quality',
      solution: 'Efficient material selection and streamlined production'
    },
    {
      id: 3,
      title: 'Math Masters',
      category: 'educational',
      type: 'Educational Game',
      description: 'An educational board game designed to make learning math fun for children.',
      image: '/api/placeholder/400/300',
      stats: {
        players: '2-6 Players',
        duration: '20-30 min',
        funded: 'Retail',
        backers: 'N/A'
      },
      components: ['Educational Cards', 'Number Tiles', 'Game Board', 'Instruction Manual'],
      challenges: 'Child-safe materials and durability requirements',
      solution: 'FSC certified materials and enhanced safety testing'
    },
    {
      id: 4,
      title: 'Cosmic Conquest',
      category: 'strategy',
      type: 'Strategy Game',
      description: 'A space-themed strategy game with detailed components and artwork.',
      image: '/api/placeholder/400/300',
      stats: {
        players: '2-5 Players',
        duration: '60-90 min',
        funded: '$180,000',
        backers: '2,800+'
      },
      components: ['Deluxe Game Box', 'Double-sided Board', 'Custom Dice', 'Player Boards'],
      challenges: 'Intricate artwork registration and color matching',
      solution: 'Advanced color management and precision printing'
    },
    {
      id: 5,
      title: 'Quick Draw Duel',
      category: 'family',
      type: 'Card Game',
      description: 'A fast-paced card game with premium card stock and finish.',
      image: '/api/placeholder/400/300',
      stats: {
        players: '2-6 Players',
        duration: '15-20 min',
        funded: '$45,000',
        backers: '800+'
      },
      components: ['Premium Cards', 'Custom Tuck Box', 'Rules Insert'],
      challenges: 'Premium feel within budget constraints',
      solution: 'Optimized card stock selection and finishing'
    },
    {
      id: 6,
      title: 'Kingdom Builder Deluxe',
      category: 'kickstarter',
      type: 'Strategy Game',
      description: 'Deluxe edition with upgraded components and exclusive content.',
      image: '/api/placeholder/400/300',
      stats: {
        players: '2-4 Players',
        duration: '45-60 min',
        funded: '$320,000',
        backers: '4,200+'
      },
      components: ['Deluxe Box', 'Wooden Components', 'Metal Coins', 'Art Book'],
      challenges: 'Multiple component types and premium materials',
      solution: 'Coordinated production scheduling and quality control',
      featured: true
    }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const successStats = [
    {
      icon: Target,
      number: '50+',
      label: 'Kickstarter Projects',
      description: 'Successfully funded campaigns'
    },
    {
      icon: Users,
      number: '100+',
      label: 'Game Makers',
      description: 'Satisfied clients worldwide'
    },
    {
      icon: Globe,
      number: '50+',
      label: 'Countries',
      description: 'Global distribution reach'
    },
    {
      icon: Award,
      number: '15+',
      label: 'Years',
      description: 'Industry experience'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Portfolio</h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Bringing creative visions to life
            </p>
            <p className="text-lg text-blue-200 max-w-4xl mx-auto">
              Explore our successful projects and see how we've helped game creators 
              turn their ideas into reality with professional manufacturing and quality craftsmanship.
            </p>
          </div>
        </div>
      </section>

      {/* Success Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {successStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="font-medium text-gray-900 mb-1">{stat.label}</div>
                  <div className="text-sm text-gray-600">{stat.description}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Portfolio Filter */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A showcase of successful board game projects we've manufactured
            </p>
          </div>

          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-8">
              {portfolioCategories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="text-sm">
                  {category.name} ({category.count})
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Project Image */}
                  <div className="relative h-48 bg-gray-200">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Package className="h-16 w-16 text-gray-400" />
                    </div>
                    {project.featured && (
                      <Badge className="absolute top-3 left-3 bg-yellow-500 text-black">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                    <Badge variant="outline" className="absolute top-3 right-3 bg-white">
                      {project.type}
                    </Badge>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{project.description}</p>

                    {/* Project Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <span className="text-gray-500">Players:</span>
                        <div className="font-medium">{project.stats.players}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Duration:</span>
                        <div className="font-medium">{project.stats.duration}</div>
                      </div>
                      {project.stats.funded !== 'Retail' && (
                        <>
                          <div>
                            <span className="text-gray-500">Funded:</span>
                            <div className="font-medium text-green-600">{project.stats.funded}</div>
                          </div>
                          <div>
                            <span className="text-gray-500">Backers:</span>
                            <div className="font-medium">{project.stats.backers}</div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Components */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-sm text-gray-900 mb-2">Components:</h4>
                      <div className="flex flex-wrap gap-1">
                        {project.components.map((component, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {component}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Challenge & Solution */}
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium text-gray-900">Challenge: </span>
                        <span className="text-gray-600">{project.challenges}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Solution: </span>
                        <span className="text-gray-600">{project.solution}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Tabs>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from game creators who have worked with us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Soarsouth delivered exceptional quality for our Kickstarter campaign. 
                  The attention to detail and professional service exceeded our expectations."
                </p>
                <div className="text-sm">
                  <div className="font-medium text-gray-900">Sarah Johnson</div>
                  <div className="text-gray-500">Game Designer, Epic Adventure Quest</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Working with Soarsouth was a game-changer for our project. Their expertise 
                  in manufacturing helped us achieve our vision within budget."
                </p>
                <div className="text-sm">
                  <div className="font-medium text-gray-900">Mike Chen</div>
                  <div className="text-gray-500">Founder, Cosmic Games</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "The quality control and communication throughout the process was outstanding. 
                  We'll definitely work with Soarsouth again for future projects."
                </p>
                <div className="text-sm">
                  <div className="font-medium text-gray-900">Emma Rodriguez</div>
                  <div className="text-gray-500">Creative Director, Family Games Co.</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Create Your Success Story?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Join the ranks of successful game creators who have brought their visions to life with Soarsouth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black">
              Start Your Project
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-700">
              View Our Process
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
