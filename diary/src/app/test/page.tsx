import { fetchData } from '../../utils/fetchData';
import React, { useEffect } from 'react';

export default async function Home(){

    const response = await fetch('https://api.github.com/users/v1r4m');
    const data = await response.json();
    console.log(data);
  
    return (
      <div>
        <div>
          {data.login}
        </div>
          {JSON.stringify(data,null,2)}
      </div>
    );
  };