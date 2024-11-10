import React from 'react';
import { View } from 'react-native-reanimated/lib/typescript/Animated';
import { Svg, Path, G} from 'react-native-svg';

const PieChart = ({ data }) => {
    // Calculate total value of the data
    const total = data.reduce((sum, item) => sum + item.value, 0);
    const radius = 100;
  
    // Start angle will be calculated for each slice
    let startAngle = 0;
    
  
    return (
      <Svg width={radius * 2} height={radius * 2}>
        <G x={radius} y={radius}>
          {data.map((item, index) => {
            // Calculate the angle for the current slice
            const angle = (item.value / total) * 360;
  
            // The end angle for the current slice
            const endAngle = startAngle + angle;
  
            // Get the starting and ending coordinates for the arc
            const x1 = radius * Math.cos((startAngle * Math.PI) / 180);
            const y1 = radius * Math.sin((startAngle * Math.PI) / 180);
            const x2 = radius * Math.cos((endAngle * Math.PI) / 180);
            const y2 = radius * Math.sin((endAngle * Math.PI) / 180);
            // Determine if the arc should be large or small
            const largeArcFlag = angle > 180 ? 1 : 0;
  
            // Create the path data for the arc
            const d = `M ${0},${0} L ${x1},${y1} A ${radius},${radius} 0 ${largeArcFlag} 1 ${x2},${y2} Z`;
  
            // Update the start angle for the next segment
            startAngle = endAngle;

            // Return the path element for the current slice
            return <Path key={index} d={d} fill={item.color} />;
          })}
        </G>
      </Svg>
    );
  };
  

export default PieChart;