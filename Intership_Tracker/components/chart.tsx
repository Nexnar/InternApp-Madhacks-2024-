import React from 'react';
import { View, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';


const TimeBarGraph = ({ Edata }) => {
  const data = {
    labels: ['Accepted', 'Rejected', 'Interview', 'Pending', 'TOTAL'],
    datasets: [
      {
        data: Edata
      },
    ],
  };

  return (
    <View>
      <BarChart
        data={data}
        width={Dimensions.get('window').width - 30} // Adjust width as needed
        height={220}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: 'transparent',
          backgroundGradientFrom: 'transparent',
          backgroundGradientTo: 'transparent',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default TimeBarGraph;