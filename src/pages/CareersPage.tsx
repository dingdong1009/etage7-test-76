
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CareersPage = () => {
  const jobOpenings = [
    {
      title: 'Frontend Developer',
      department: 'Technology',
      location: 'Paris, France (Remote)',
      description: 'Join our team to build and maintain modern web applications using React, TypeScript, and Tailwind CSS.'
    },
    {
      title: 'Brand Relations Manager',
      department: 'Partnerships',
      location: 'Moscow, Russia',
      description: 'Work directly with fashion brands to onboard and support their journey on the ETAGE7 platform.'
    },
    {
      title: 'Sales Representative',
      department: 'Sales',
      location: 'Multiple Locations',
      description: 'Connect with potential buyers and help them discover the perfect brands on our platform.'
    },
    {
      title: 'Content Marketing Specialist',
      department: 'Marketing',
      location: 'Remote',
      description: 'Create compelling content that showcases our brands and engages our audience across multiple channels.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-light tracking-tighter mt-12 mb-10">Work with Us</h1>
      
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-light tracking-tighter mb-4">Join the ETAGE7 Team</h2>
          <p className="text-gray-600 mb-4">
            We're building a platform that transforms how fashion brands connect with buyers. Our team is passionate, innovative, and dedicated to making a difference in the fashion industry.
          </p>
          <p className="text-gray-600 mb-6">
            If you're excited about fashion, technology, or both, we'd love to hear from you. Explore our current openings below or reach out directly.
          </p>
        </section>

        <section className="bg-gray-50 p-8 mb-12">
          <h2 className="text-2xl font-light tracking-tighter mb-6">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl mb-2 font-light">Innovation</h3>
              <p className="text-gray-600">
                We constantly seek better solutions to industry challenges.
              </p>
            </div>
            <div>
              <h3 className="text-xl mb-2 font-light">Collaboration</h3>
              <p className="text-gray-600">
                We believe great ideas come from diverse perspectives working together.
              </p>
            </div>
            <div>
              <h3 className="text-xl mb-2 font-light">Quality</h3>
              <p className="text-gray-600">
                We take pride in delivering exceptional experiences for brands and buyers.
              </p>
            </div>
            <div>
              <h3 className="text-xl mb-2 font-light">Growth</h3>
              <p className="text-gray-600">
                We invest in the personal and professional development of our team.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-light tracking-tighter mb-6">Current Openings</h2>
          <div className="space-y-6">
            {jobOpenings.map((job, index) => (
              <div key={index} className="border border-gray-200 p-6">
                <h3 className="text-xl font-light mb-2">{job.title}</h3>
                <div className="flex flex-col md:flex-row md:items-center text-sm text-gray-500 mb-4 space-y-1 md:space-y-0 md:space-x-4">
                  <span>{job.department}</span>
                  <span className="hidden md:inline">•</span>
                  <span>{job.location}</span>
                </div>
                <p className="text-gray-600 mb-4">{job.description}</p>
                <Button 
                  variant="outline"
                  className="flex items-center mt-2 border-black text-black hover:bg-black hover:text-white transition-colors"
                >
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-black text-white p-8 text-center">
          <h2 className="text-2xl font-light tracking-tighter mb-4">Don't see the right fit?</h2>
          <p className="mb-6 max-w-lg mx-auto">
            We're always looking for talented individuals. Send us your resume and tell us how you can contribute to ETAGE7.
          </p>
          <Link to="/contact">
            <Button 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black"
            >
              Contact Us
            </Button>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default CareersPage;
