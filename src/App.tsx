import { useState } from 'react';
import { Text, Box, Card } from '@mantine/core';
import styles from "./styles/App.module.css"

function App() {
  const [timeframe, setTimeframe] = useState('60'); // 1hr default
  
  return (
    <Box className={styles.fullPage}>
      <Card className={styles.displayCard}>
        <Text className={styles.title}>
          The I/O Visualizer
        </Text>
        {/* Header */}
        {/* Timeframe Toggle */}
        {/* Intake + Output Tanks */}
        {/* Net Fluid Balance */}
      </Card> 
    </Box>
  );
}

export default App;

