import React from 'react';
import { Link } from 'react-router-dom';
import { assetsImage, visionAssets } from '../assets/assets.js';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const VisionSection = () => {
  return (
    <section className="py-15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Vision Header */}
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            variants={itemVariants}
          >
            {visionAssets.mainVision.title}
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            {visionAssets.mainVision.description}
          </motion.p>
        </motion.div>

        {/* Project Story */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div 
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                {visionAssets.projectStory.title}
              </h3>
              <div className="space-y-4">
                {visionAssets.projectStory.content.map((paragraph, index) => (
                  <p key={index} className="text-gray-600 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Key Highlights */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">What Makes Us Different:</h4>
                <ul className="space-y-3">
                  {visionAssets.projectStory.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <img 
                src={assetsImage.slider1} 
                alt="Our sneaker collection showcasing premium quality and style" 
                className="w-full h-96 object-cover rounded-2xl shadow-xl"
                onError={(e) => e.target.src = 'https://placehold.co/600x400'}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </motion.div>
        </div>

        {/* Vision Cards */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {visionAssets.visionCards.map((card, index) => (
            <motion.div 
              key={index} 
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">{card.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{card.title}</h3>
              <p className="text-gray-600 leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl font-bold text-white mb-8">Our Impact in Numbers</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {visionAssets.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2 hover:text-blue-600">{stat.number}</div>
                <div className="text-gray-300 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Future Goals */}
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-8">Looking Ahead</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {visionAssets.futureGoals.map((goal, index) => (
              <motion.div 
                key={index} 
                className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-100"
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
              >
                <h4 className="text-xl font-semibold text-gray-900 mb-3">{goal.title}</h4>
                <p className="text-gray-600">{goal.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Join Our Journey</h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Be part of the sneaker revolution. Discover premium footwear that tells your story.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/ProductPage"
              className="inline-block bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-lg font-medium transition-colors text-lg"
            >
              Explore Collection
            </Link>
            <Link
              to="/about"
              className="inline-block border-2 border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-4 rounded-lg font-medium transition-colors text-lg"
            >
              Learn Our Story
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VisionSection;
