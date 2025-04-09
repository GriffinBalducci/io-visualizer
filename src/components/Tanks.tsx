import { Text, Stack, NumberInput, Button, Flex, Box } from '@mantine/core';
import styles from '../styles/Tanks.module.css';
import { useState } from 'react';

interface TankProps {
    maxVolume: number;
    initialVolume?: number;
    color?: string;
}

export function Tank({ maxVolume = 5000, initialVolume = 0, color = '#228be6' }: TankProps) {
    const [intakeVolume, setIntakeVolume] = useState(initialVolume);
    const [outputVolume, setOutputVolume] = useState(initialVolume);
    const [input, setInput] = useState<number | ''>('');

  const handleIntake = () => {
    if (typeof input === 'number') {
        setIntakeVolume((prev) => Math.min(prev + input, maxVolume));
        setInput('');
    }
  };

  const handleOutput = () => {
    if (typeof input === 'number') {
        setIntakeVolume((prev) => Math.min(prev - input, maxVolume));
        setOutputVolume((prev) => Math.min(prev + input, maxVolume));
        setInput('');
    }
  };

  const intakeHeight = Math.min(Math.max((intakeVolume / maxVolume) * 100, 0), 100);
  const outputHeight = Math.min(Math.max((outputVolume / maxVolume) * 100, 0), 100);

  return (
    <>
      <Flex className={styles.horizontalFlex}>
        <Box className={styles.container}>
          <Text>Intake</Text>
          <div className={styles.tank}>
          <div className={styles.fill} style={{ height: `${intakeHeight}%`, backgroundColor: color }} />
          </div>
          <Text size="xs">{intakeVolume} mL ({intakeHeight.toFixed(0)}%)</Text>
        </Box>

        <Box className={styles.container}>
          <Text>Output</Text>
          <div className={styles.tank}>
          <div className={styles.fill} style={{ height: `${outputHeight}%`, backgroundColor: color }} />
          </div>
          <Text size="xs">{outputVolume} mL ({outputHeight.toFixed(0)}%)</Text>
        </Box>
      </Flex>

      <NumberInput
        value={input}
        onChange={(value) => {
            if (typeof value === 'number' || value === '') { setInput(value);}
        }}
        placeholder="Add mL"
        min={0}
        max={maxVolume}
        step={50}
        hideControls
        size="xs"
        width={100}
      />

      <Flex className={styles.horizontalFlex}>
        <Button className={styles.button} onClick={handleIntake}>
        Intake
        </Button>
        <Button className={styles.button} onClick={handleOutput}>
        Output
        </Button>
      </Flex>
    </>
  );
}

// TODO: Comment on code
