import React from 'react';
import { assets } from '../../assets/images/assets'

const { get_rewarded, inspire_learners, teach_your_way } = assets;

const WhyTeachSection = () => {
  const items = [
    {
      image: teach_your_way,
      title: "Teach your way",
      description:
        "Publish the course you want, in the way you want, and always have control of your own content.",
    },
    {
      image: inspire_learners,
      title: "Inspire learners",
      description:
        "Teach what you know and help learners explore their interests, gain new skills, and advance their careers.",
    },
    {
      image: get_rewarded,
      title: "Get rewarded",
      description:
        "Expand your professional network, build your expertise, and earn money on each paid enrollment.",
    },
  ];

  return (
    <section className="py-20 text-center bg-white">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
        So many reasons to start
      </h2>
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
        {items.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <img src={item.image} alt={item.title} className="w-32 h-32 mb-4" />
            <h3 className="text-xl font-semibold text-blue-500 mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyTeachSection;
