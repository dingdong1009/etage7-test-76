
import React from 'react';

const AboutPage = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-light tracking-tighter mt-12 mb-10">About ETAGE7</h1>
      
      <div className="space-y-12">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-light tracking-tighter mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2020, ETAGE7 emerged as a revolutionary platform connecting emerging fashion brands with discerning buyers across Europe and beyond.
            </p>
            <p className="text-gray-600">
              Our name, inspired by the concept of the seventh floor—often a place of exclusivity and innovation in Parisian buildings—represents our aim to elevate fashion businesses to new heights.
            </p>
          </div>
          <div className="bg-gray-100 h-80 flex items-center justify-center">
            <span className="text-gray-400">Company Image</span>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-light tracking-tighter mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            ETAGE7 exists to democratize access to the fashion industry by creating transparent, efficient connections between brands and buyers. We believe that exceptional fashion deserves visibility, regardless of a brand's size or history.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="p-6 border border-gray-200">
              <h3 className="text-xl font-light mb-3">Transparency</h3>
              <p className="text-gray-600">We believe in clear, honest communication between all parties in the fashion ecosystem.</p>
            </div>
            <div className="p-6 border border-gray-200">
              <h3 className="text-xl font-light mb-3">Innovation</h3>
              <p className="text-gray-600">Our platform continually evolves to meet the dynamic needs of the modern fashion industry.</p>
            </div>
            <div className="p-6 border border-gray-200">
              <h3 className="text-xl font-light mb-3">Sustainability</h3>
              <p className="text-gray-600">We promote practices that support both environmental and business sustainability.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-light tracking-tighter mb-4">Our Team</h2>
          <p className="text-gray-600 mb-6">
            The ETAGE7 team brings together experts from fashion, technology, and business development, creating a powerhouse of industry knowledge and innovative thinking.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="text-center">
                <div className="bg-gray-100 h-48 mb-3 flex items-center justify-center">
                  <span className="text-gray-400">Photo</span>
                </div>
                <h4 className="font-medium">Team Member {i + 1}</h4>
                <p className="text-sm text-gray-500">Position</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
