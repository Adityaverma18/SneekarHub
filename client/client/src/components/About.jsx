// src/components/AboutUs.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { aboutData, assetsImage } from '../assets/assets';

const AboutUs = () => {
  return (
    <div className="bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {aboutData.hero.title}
          </h1>
          <p className="text-xl text-gray-600">
            {aboutData.hero.subtitle}
          </p>
        </div>

        {/* History Section */}
        <div className="flex flex-col md:flex-row gap-8 mb-20 items-center">
          <div className="md:w-1/2">
            <img
              src={assetsImage[aboutData.history.imageKey]}
              alt="Company history"
              className="rounded-lg shadow-lg w-full"
              onError={(e) => e.target.src = 'https://placehold.co/800x500'}
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">{aboutData.history.title}</h2>
            {aboutData.history.content.map((paragraph, index) => (
              <p key={index} className="text-gray-600 mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Mission Section */}
        <div className="flex flex-col md:flex-row-reverse gap-8 mb-20 items-center">
          <div className="md:w-1/2">
            <img
              src={assetsImage[aboutData.mission.imageKey]}
              alt="Our mission"
              className="rounded-lg shadow-lg w-full"
              onError={(e) => e.target.src = 'https://placehold.co/800x500'}
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">{aboutData.mission.title}</h2>
            <ul className="space-y-3">
              {aboutData.mission.points.map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aboutData.team.map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src={`https://placehold.co/200x200?text=${member.name.charAt(0)}`}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
