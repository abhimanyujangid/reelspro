"use client";

import React  from 'react';
import Dashboard from './dashboard/layout';
import Video from './components/Video';



export default function Home() {

  return (
    <div>
      <Dashboard children={<Video />} />
    </div>
  );
}

