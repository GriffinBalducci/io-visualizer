import { Text, Stack, NumberInput, Button, Flex, Box } from '@mantine/core';
import styles from '../styles/Tanks.module.css';
import { useState } from 'react';

interface TankProps {
    maxVolume: number;
    initialIntake?: number;
    initialOutput?: number;
    color?: string;
}

export function Tank({ maxVolume = 5000, initialIntake: initialIntake = 0, initialOutput: initialOutput = 0, color = '#228be6' }: TankProps) {
    const [intakeVolume, setIntakeVolume] = useState(initialIntake);
    const [outputVolume, setOutputVolume] = useState(initialOutput);
    const [newIntake, setNewIntake] = useState<number | ''>('');
    const [newOutput, setNewOutput] = useState<number | ''>('');

  const handleIntake = () => {
    if (typeof newIntake === 'number') {
        setIntakeVolume((prev) => Math.min(prev + newIntake, maxVolume));
        setNewIntake('');
    }
  };

  const handleOutput = () => {
    if (typeof newOutput === 'number') {
        setIntakeVolume((prev) => Math.min(prev - newOutput, maxVolume));
        setOutputVolume((prev) => Math.min(prev + newOutput, maxVolume));
        setNewOutput('');
    }
  };

  const intakeHeight = Math.min(Math.max((intakeVolume / maxVolume) * 100, 0), 100);
  const outputHeight = Math.min(Math.max((outputVolume / maxVolume) * 100, 0), 100);

  return (
    <>
      <Flex className={styles.horizontalFlex}>
        <Flex className={styles.verticalFlex}>
          <NumberInput
            className={styles.inputBox}
            value={newIntake}
            onChange={(value) => {
                if (typeof value === 'number' || value === '') { setNewIntake(value);}
            }}
            placeholder="Add mL"
            min={0}
            max={maxVolume}
            step={50}
            hideControls
            size="sm"
          />
          <Button className={styles.button} onClick={handleIntake}>
            Update
          </Button>

          <Box className={styles.container}>
            <Text>Intake</Text>
            <div className={styles.tank}>
            <div className={styles.fill} style={{ height: `${intakeHeight}%`, backgroundColor: color }} />
            </div>
            <Text size="xs">{intakeVolume} mL ({intakeHeight.toFixed(0)}%)</Text>
          </Box>
        </Flex>
        <Flex className={styles.verticalFlex}>
          <NumberInput
              className={styles.inputBox}
              value={newOutput}
              onChange={(value) => {
                  if (typeof value === 'number' || value === '') { setNewOutput(value);}
              }}
              placeholder="Add mL"
              min={0}
              max={maxVolume}
              step={50}
              hideControls
              size="sm"
          />
          <Button className={styles.button} onClick={handleOutput}>
            Update
          </Button>
          <Box className={styles.container}>
            <Text>Output</Text>
              <div className={styles.tank}>
              <div className={styles.fill} style={{ height: `${outputHeight}%`, backgroundColor: color }} />
              </div>
            <Text size="xs">{outputVolume} mL ({outputHeight.toFixed(0)}%)</Text>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}

// TODO: Comment on code
