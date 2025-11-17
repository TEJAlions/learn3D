import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import First from './day1/1first.jsx'
import './App.css'
import PositonChange from './day1/2positionChange.jsx'
import LightsAndShadows from './day2/1LightsAndShadows.jsx'
import LightsAndShadowsMaterials from './day2/2LightsShadowsMaterials.jsx'
import LoadModel from './day3/loadModel.jsx'
import AnimationModel from './day3/animateModel.jsx'

function App() {

  return (
    <>
      <div>
      Three.js Basics (React Three Fiber)
    {/* <First /> */}
    {/* <PositonChange /> */}
    {/* <LightsAndShadows /> */}
    {/* <LightsAndShadowsMaterials /> */}
    {/* <LoadModel /> */}
    <AnimationModel />
    </div>
    </>
  )
}

export default App
