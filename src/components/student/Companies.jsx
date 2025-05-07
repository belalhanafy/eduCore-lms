import React from 'react';
import { assets } from '../../assets/images/assets';
import { AnimatedGroup } from '../../../components/motion-primitives/animated-group';

const { accenture_logo, microsoft_logo, walmart_logo, adobe_logo, paypal_logo } = assets;

const Companies = () => {
  return (
    <div className="lg:mt-5 mt-0 text-center">
      <p className="mb-10">Trusted by learners from</p>
      <AnimatedGroup variants={{
        container: {
          visible: {
            transition: {
              staggerChildren: 0.05,
            },
          },
        },
        item: {
          hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: -60,
            rotateX: 90,
          },
          visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            rotateX: 0,
            transition: {
              type: 'spring',
              bounce: 0.3,
              duration: 1,
            },
          },
        },
      }} className="flex lg:gap-16 gap-8 items-center flex-wrap justify-center list-none">
        <li><img src={accenture_logo} alt="Accenture" /></li>
        <li><img src={microsoft_logo} alt="Microsoft" /></li>
        <li><img src={walmart_logo} alt="Walmart" /></li>
        <li><img src={adobe_logo} alt="Adobe" /></li>
        <li><img src={paypal_logo} alt="PayPal" /></li>
      </AnimatedGroup>
    </div>
  );
};

export default Companies;
