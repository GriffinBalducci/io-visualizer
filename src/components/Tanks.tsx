import { Text, Stack, NumberInput, Button, Flex, Box, Select } from '@mantine/core';
import styles from '../styles/Tanks.module.css';
import { useState } from 'react';

interface TankProps {
    maxVolume: number;
    initialIntake?: number;
    initialOutput?: number;
}

type FluidTotals = Record<string, number>; 

export function Tank({ maxVolume = 5000, initialIntake: initialIntake = 0, initialOutput: initialOutput = 0}: TankProps) {
    const [intakeVolume, setIntakeVolume] = useState(initialIntake);
    const [outputVolume, setOutputVolume] = useState(initialOutput);
    const [newIntake, setNewIntake] = useState<number | ''>('');
    const [newOutput, setNewOutput] = useState<number | ''>('');
    const [intakeType, setIntakeType] = useState<string | null>(null);
    const [outputType, setOutputType] = useState<string | null>(null);
    const [fluidColor, setFluidColor] = useState<string | ''>('');
    const [intakeFluids, setIntakeFluids] = useState<FluidTotals>({
      oral: 0,
      parental: 0,
      enteral: 0,
      irrigation: 0,
      dialysis: 0
    });
    const [outputFluids, setOutputFluids] = useState<FluidTotals>({
      foley: 0,
      suprapubic: 0,
      nephrostomy: 0,
      stool: 0,
      ostomy: 0,
      ng: 0,
      emesis: 0,
      peg: 0,
      woundDrains: 0,
      chestTube: 0,
      irrigation: 0,
      blood: 0,
      sweat: 0
    });
    const handleIntake = () => {
      // Ensure number was actually input and an actual intake was selected
      if (typeof newIntake === 'number' && intakeType) {
        // Update state (prev =>)
        // Copies all existing fluid entries (..prev)
        // Take previous value for the selected type, or 0 if not there yet, and add newIntake
        setOutputFluids(prev => ({...prev, [intakeType]: (prev[intakeType] || 0) + newIntake}));
    
        // Update overall output volume
        setIntakeVolume(prev => Math.min(prev + newIntake, maxVolume));
    
        // Reset input
        setNewIntake('');
      }
    };
    const handleOutput = () => {
      // Ensure number was actually input and an actual output was selected
      if (typeof newOutput === 'number' && outputType) {
        // Update state (prev =>)
        // Copies all existing fluid entries (..prev)
        // Take previous value for the selected type, or 0 if not there yet, and add newOutput
        setOutputFluids(prev => ({...prev, [outputType]: (prev[outputType] || 0) + newOutput}));

        // Update overall output volume
        setOutputVolume(prev => Math.min(prev + newOutput, maxVolume));

        // Reset input
        setNewOutput('');
      }
    };
    const intakeHeight = Math.min(Math.max((intakeVolume / maxVolume) * 100, 0), 100);
    const outputHeight = Math.min(Math.max((outputVolume / maxVolume) * 100, 0), 100);

  return (
    <>
      <Flex className={styles.horizontalFlex}>
        <Flex className={styles.verticalFlex}>
          <Select
            className={styles.selectBox}
            placeholder="Intake Type"
            data={[
              { value: 'oral', label: 'Oral Intake' },
              { value: 'parenteral', label: 'Parenteral Intake' },
              { value: 'enteral', label: 'Enteral Intake' },
              { value: 'irrigation', label: 'Irrigation' },
              { value: 'dialysis', label: 'Dialysis' },
            ]}
            value={intakeType}
            onChange={setIntakeType}
          />
            <Flex className={styles.horizontalFlex}>
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
            </Flex>
          <Box className={styles.container}>
            <Text>Intake</Text>
            <div className={styles.tank}>
            <div className={styles.fill} style={{ height: `${intakeHeight}%`, backgroundColor: fluidColor }} />
            </div>
            <Text size="xs">{intakeVolume} mL ({intakeHeight.toFixed(0)}%)</Text>
          </Box>
        </Flex>
        <Flex className={styles.verticalFlex}>
          <Select
              className={styles.selectBox}
              placeholder="Output Type"
              data={[
                { value: 'voided', label: 'Urinary: voided' },
                { value: 'foley', label: 'Urinary: foley' },
                { value: 'suprapubic', label: 'Urinary: suprapubic' },
                { value: 'nephrostomy', label: 'Urinary: nephrostomy' },
                { value: 'stool', label: 'GI: stool' },
                { value: 'ostomy', label: 'GI: ostomy' },
                { value: 'ng', label: 'GI: NG tube' },
                { value: 'emesis', label: 'GI: emesis' },
                { value: 'peg', label: 'GI: PEG' },
                { value: 'wound-drains', label: 'Other: wound/surgical drains' },
                { value: 'chest-tube', label: 'Other: chest tube' },
                { value: 'irrigation', label: 'Other: irrigation' },
                { value: 'blood', label: 'Other: blood' },
                { value: 'sweat', label: 'Other: sweat' },
              ]}
              value={outputType}
              onChange={setOutputType}
          />
          <Flex className={styles.horizontalFlex}>
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
          </Flex>
          <Box className={styles.container}>
            <Text>Output</Text>
              <div className={styles.tank}>
              <div className={styles.fill} style={{ height: `${outputHeight}%`, backgroundColor: fluidColor }} />
              </div>
            <Text size="xs">{outputVolume} mL ({outputHeight.toFixed(0)}%)</Text>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
