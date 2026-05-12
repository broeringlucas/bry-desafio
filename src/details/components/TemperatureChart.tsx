import { View, Text, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

const { width: screenWidth } = Dimensions.get('window');

interface ChartDataPoint {
  value: number;
  label: string;
  labelTextStyle: { color: string; fontSize: number };
}

interface TemperatureChartProps {
  data: ChartDataPoint[];
  maxTemp: number;
  minTemp: number;
}

export default function TemperatureChart({ data, maxTemp, minTemp }: TemperatureChartProps) {
  const chartWidth = Math.max(screenWidth - 60, data.length * 70);

  if (data.length === 0) {
    return null;
  }

  return (
    <View style={{ marginBottom: 32, paddingHorizontal: 16 }}>
      <Text style={{ color: '#FFF', fontSize: 18, fontWeight: '600', marginBottom: 16, marginLeft: 8 }}>
        🌡️ Variação da temperatura
      </Text>
      
      <View style={{ 
        backgroundColor: 'rgba(255,255,255,0.05)', 
        borderRadius: 20, 
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)'
      }}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={{ paddingRight: 50 }}
        >
          <View style={{ width: chartWidth }}>
            <LineChart
              data={data}
              width={chartWidth}
              height={280}
              spacing={70}
              initialSpacing={20}
              endSpacing={50}
              color="#38BDF8"
              thickness={3}
              hideDataPoints={false}
              dataPointsColor="#38BDF8"
              dataPointsRadius={6}
              startFillColor="rgba(56, 189, 248, 0.3)"
              endFillColor="rgba(56, 189, 248, 0.0)"
              startOpacity={0.8}
              endOpacity={0.2}
              isAnimated
              animationDuration={1000}
              textColor="rgba(255,255,255,0.8)"
              textFontSize={12}
              maxValue={Math.ceil(maxTemp + 5)}
              rulesType="solid"
              rulesColor="rgba(255,255,255,0.1)"
              yAxisTextStyle={{ color: 'rgba(255,255,255,0.6)' }}
              xAxisLabelTextStyle={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }}
              xAxisColor="rgba(255,255,255,0.2)"
              yAxisColor="rgba(255,255,255,0.2)"
              verticalLinesColor="rgba(255,255,255,0.05)"
              showVerticalLines={true}
              showXAxisIndices={true}
              xAxisIndicesColor="rgba(255,255,255,0.3)"
              xAxisIndicesHeight={8}
              xAxisIndicesWidth={1}
              pointerConfig={{
                pointerColor: '#38BDF8',
                pointerStripHeight: 230,
                pointerStripColor: 'rgba(56, 189, 248, 0.3)',
                pointerStripWidth: 2,
                pointerLabelWidth: 70,
                pointerLabelHeight: 40,
                pointerLabelComponent: (items: any) => {
                  return (
                    <View style={{ 
                      backgroundColor: '#1E293B', 
                      paddingHorizontal: 12, 
                      paddingVertical: 6, 
                      borderRadius: 16,
                      borderWidth: 1,
                      borderColor: '#38BDF8',
                      alignItems: 'center',
                    }}>
                      <Text style={{ color: '#38BDF8', fontSize: 12, fontWeight: '500' }}>
                        {items[0].label}
                      </Text>
                      <Text style={{ color: '#FFF', fontSize: 16, fontWeight: '600' }}>
                        {Math.round(items[0].value)}°C
                      </Text>
                    </View>
                  );
                },
              }}
            />
          </View>
        </ScrollView>
        
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16, paddingHorizontal: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#38BDF8' }} />
            <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>Temperatura (°C)</Text>
          </View>
          <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>
            Arraste para o lado
          </Text>
        </View>
      </View>
    </View>
  );
}