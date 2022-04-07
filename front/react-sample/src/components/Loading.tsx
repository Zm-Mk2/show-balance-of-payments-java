import React from 'react';
import { TailSpin } from 'react-loader-spinner';

export const Loading = () => {
  return (
    <div>
        <TailSpin 
            height="25"
            width="20"
            color="grey"
            ariaLabel="loading-indicator"
        />
    </div>    
  )
}