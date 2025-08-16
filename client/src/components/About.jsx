import React from 'react';
import { Link } from 'react-router-dom';
import { aboutData, assetsImage } from '../assets/assets';
import { motion } from 'framer-motion';

const sectionFade = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

const AboutUs = () => {
  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Hero Section (visible immediately) */}
        <motion.div className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={sectionFade}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{aboutData.hero.title}</h1>
          <p className="text-2xl text-gray-600">{aboutData.hero.subtitle}</p>
        </motion.div>

        {/* History Section - hidden until scrolled into view */}
        <motion.div 
          className="flex flex-col md:flex-row gap-8 mb-20 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionFade}
          transition={{ duration: 0.7 }}
        >
          <div className="md:w-1/2 flex justify-center">
            <motion.img
              src={assetsImage[aboutData.history.imageKey]}
              alt="Company history"
              className="rounded-lg shadow-lg"
              onError={(e) => e.target.src = 'https://placehold.co/800x500'}
              whileHover={{ scale: 1.08 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.7 }}
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold mb-6">{aboutData.history.title}</h2>
            {aboutData.history.content.map((paragraph, index) => (
              <p key={index} className="text-lg md:text-xl text-gray-700 mb-5">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>

        {/* Mission Section - hidden until scrolled into view */}
        <motion.div
          className="flex flex-col md:flex-row-reverse gap-8 mb-20 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionFade}
          transition={{ duration: 0.7 }}
        >
          <div className="md:w-1/2 flex justify-center">
            <motion.img
              src={assetsImage[aboutData.mission.imageKey]}
              alt="Our mission"
              className="rounded-lg shadow-lg w-[90%] md:w-[60%]"
              onError={(e) => e.target.src = 'https://placehold.co/800x500'}
              whileHover={{ scale: 1.08 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.7 }}
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold mb-6">{aboutData.mission.title}</h2>
            <ul className="space-y-4">
              {aboutData.mission.points.map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2 text-xl">✓</span>
                  <span className="text-lg md:text-xl text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Team Section - hidden until scrolled into view */}
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionFade}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-bold mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aboutData.team.map((member, index) => (
              <motion.div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-md"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src={`https://placehold.co/200x200?text=${member.name.charAt(0)}`}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
