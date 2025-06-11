import React from 'react';

const PageFooter: React.FC = () => {
  return (
    <div className='w-full h-[70vh] relative'>
      <div className='w-full h-full bg-[#702DFF]'></div>
      <img 
        className='absolute inset-0 w-full h-full object-cover' 
        src="https://res.cloudinary.com/dikylfimn/image/upload/v1749029176/Design_product_qfr4mx.png" 
        alt="" 
      />
      
      <div className='absolute top-1/2 right-10 transform -translate-y-1/2 bg-[#702DFF] rounded-xl md:w-[30vw] lg:max-w-lg '>
        <h2 className='text-xl lg:text-4xl font-bold text-white mb-4 text-center'>Library Policies</h2>
        <p className='text-gray-100 text-xs lg:text-lg text-center mb-4'>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. It has survived not
          only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
        </p>
        <div className='text-center '>
            <button className='bg-black text-white font-semibold px-6 py-2 rounded-full  hover:bg-gray-800 transition'>
          Read More
        </button>
        </div>
      </div>
    </div>
  );
};

export default PageFooter;
