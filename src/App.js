import './App.css';
import React from 'react';

function App() {
const personalInfo = { name:"Mike", height:175, dob:new Date(1989, 0, 31), 
                       maxBpm: 188, weightGoal: 85.0, waistGoal: 95.5 };

const stats = [  
                    {date:new Date(2021, 0, 25), weight:96.4, waist:106.5, kCal:0,    slept:true,  },
                    {date:new Date(2021, 0, 27), weight:97.2, waist:105.0, kCal:512,               },
                    {date:new Date(2021, 1, 1), weight:99.1, waist:108.0,  kCal:1150, slept:false, },
                    {date:new Date(2021, 1, 2), weight:99.0, waist:107.5,             slept:true , },
                    {date:new Date(2021, 1, 4),                            kCal:666                },
                    {date:new Date(2021, 1, 5), weight:98.0, waist:107.0,             slept:false, },
                ];

  return (
    <div className="App">
      <header className="App-header">
        <p> HEALTH APP </p>
      </header>
    </div>
  );
}

export default App;
