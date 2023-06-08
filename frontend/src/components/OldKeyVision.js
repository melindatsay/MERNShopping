import "./keyvision.css";

import React from "react";

const KeyVision = () => {
  return (
    <div className='header'>
      <div className='headerTitles'>
        <span className='headerTitleSm'>
          S c a n d i n a v i a n &nbsp;&nbsp;D e s i g n
        </span>
        <span className='headerTitleLg'>N e w &nbsp;&nbsp;A r r i v a l s</span>
        <button className='headerButton'> SHOP NOW</button>
      </div>
      <img className='headerImg' src='/images/keyvision.jpg' alt='' />
    </div>
  );
};

export default KeyVision;
