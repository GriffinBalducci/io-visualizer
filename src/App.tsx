import { useState } from 'react';
import { Text, Box, Card, SegmentedControl } from '@mantine/core';
import styles from "./styles/App.module.css"
import { Tank } from './components/Tanks';

function App() {
  const [viewMode, setViewMode] = useState<'tank' | 'scale'>('tank');
  
  return (
    <Box className={styles.fullPage}>
      <Card className={styles.displayCard}>
        <Text className={styles.title}>
          The I/O Visualizer
        </Text>
        <SegmentedControl
          value={viewMode}
          onChange={(val) => setViewMode(val as 'tank' | 'scale')}
          data={[
            { label: 'Tank View', value: 'tank' },
            { label: 'Scale View', value: 'scale' },
          ]}
        />
        <Tank maxVolume={5000} viewMode={viewMode}/>
        {/* Header */}
        {/* Timeframe Toggle */}
        {/* Intake + Output Tanks */}
        {/* Net Fluid Balance */}
      </Card> 
    </Box>
  );
}

export default App;

