import React from 'react';

const Discount = ({ discount, product, modal }) => {
  return (
    <>
      {discount > 1 && (
        <span
          className={
            modal
              ? 'absolute text-dark text-xs bg-orange-500 text-white p-1 rounded font-medium z-10 mt-1 ml-1 left-0 top-0'
              : ' absolute text-dark text-xs bg-orange-500 text-white p-1 rounded font-medium z-10 right-0 top-4'
          }
        >
          {discount.toFixed(0)}% Off
        </span>
      )}
      {discount === undefined && Number(product.variants[0].discount) > 1 && (
        <span
          className={
            modal
              ? 'absolute text-dark text-xs bg-orange-500 text-white p-1 rounded font-medium z-10 mt-1 ml-1 left-0 top-0'
              : ' absolute text-dark text-xs bg-orange-500 text-white p-1 rounded font-medium z-10 right-0 top-4'
          }
        >
          {Number(product.variants[0].discount).toFixed(0)}% Off
        </span>
      )}
    </>
  );
};

export default Discount;
