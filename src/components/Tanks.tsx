import { Text, NumberInput, Button, Flex, Box, Select, Tooltip } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import styles from '../styles/Tanks.module.css';
import { useState } from 'react';

interface TankProps {
    maxVolume: number;
    initialIntake?: number;
    initialOutput?: number;
}

export interface FluidEntry {
  type: string;
  volume: number;
  timestamp: Date;
}

type FluidTotals = Record<string, number>; 

const fluidColors: Record<string, string> = {
  generic: '#333533',       // Jet
  oral: '#00b4d8',          // Pacific cyan
  parenteral: '#90e0ef',    // Non Photo blue
  enteral: '#FFC2D1',       // Pink
  irrigation: '#D3D3D3',    // Timberwolf
  dialysis: '#99D98C',      // Light green
  voided: '#FFEA00',        // Canary
  foley: '#FAE588',         // Jasmine
  suprapubic: '#FFD000',    // Jonquil
  nephrostomy: '#FFC2D1',   // Pink
  stool: '#6F4518',         // Sepia
  ostomy: '#b19881',        // Lion
  ng: '#0077B6',            // Honolulu Blue
  emesis: '#BFD200',        // Pear
  peg: '#D3D3D3',           // Timberwolf
  woundDrains: '#C1121F',   // Fire brick
  chestTube: '#BC3908',     // Rust
  blood: '#780000',         // Barn red
  sweat: '#90e0ef',         // Non Photo blue
};


export function Tank({ maxVolume = 5000, initialIntake: initialIntake = 0, initialOutput: initialOutput = 0}: TankProps) {
  const [dateTime, setDateTime] = useState<Date>(new Date(Date.now()));
  const [timeframe, setTimeframe] = useState<string>("all");
  const [intakeEntries, setIntakeEntries] = useState<FluidEntry[]>([]);
  const [outputEntries, setOutputEntries] = useState<FluidEntry[]>([]);
  const [intakeVolume, setIntakeVolume] = useState(initialIntake);
  const [outputVolume, setOutputVolume] = useState(initialOutput);
  const [newIntake, setNewIntake] = useState<number | ''>('');
  const [newOutput, setNewOutput] = useState<number | ''>('');
  const [intakeType, setIntakeType] = useState<string | null>(null);
  const [outputType, setOutputType] = useState<string | null>(null);
  const [intakeFluids, setIntakeFluids] = useState<FluidTotals>({
    generic: 0,
    oral: 0,
    parental: 0,
    enteral: 0,
    irrigation: 0,
    dialysis: 0
  });
  const [outputFluids, setOutputFluids] = useState<FluidTotals>({
    generic: 0,
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
    if (typeof newIntake === 'number' && intakeType) {
      const newEntry: FluidEntry = {
        type: intakeType,
        volume: newIntake,
        timestamp: dateTime,
      };
  
      setIntakeEntries((prev) => [...prev, newEntry]);
  
      setNewIntake('');
    }
  };
  const handleOutput = () => {
    if (typeof newOutput === 'number' && outputType) {
      const newEntry: FluidEntry = {
        type: outputType,
        volume: newOutput,
        timestamp: dateTime,
      };
  
      setOutputEntries((prev) => [...prev, newEntry]);
  
      setNewOutput('');
    }
  };

  const intakeHeight = Math.min(Math.max((intakeVolume / maxVolume) * 100, 0), 100);
  const outputHeight = Math.min(Math.max((outputVolume / maxVolume) * 100, 0), 100);

  return (
    <>
      <Flex className={styles.horizontalFlex}>
        {/* Intake Section */}
        <Flex className={styles.verticalFlex}>
          <Select
            className={styles.selectBox}
            placeholder="Intake Type"
            data={[
              { value: 'generic', label: 'Generic' },
              { value: 'oral', label: 'Oral Intake' },
              { value: 'parenteral', label: 'Parenteral Intake' },
              { value: 'enteral', label: 'Enteral Intake' },
              { value: 'irrigation', label: 'Irrigation' },
              { value: 'dialysis', label: 'Dialysis' },
            ]}
            value={intakeType}
            onChange={setIntakeType}
          />
          <DateTimePicker className={styles.dateTime}
            placeholder="Date/Time"
            value={new Date()}
            valueFormat='MM/DD/YYYY HH:mm'
            onChange={setDateTime}
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
            {Object.entries(intakeFluids).map(([type, volume]) => {
              if (volume === 0) { return null };

              const height = (volume / maxVolume) * 100;
              const color = fluidColors[type] || '#333533';

              return (
                <Tooltip label={`${type}: ${volume} mL`} position="right" withArrow transitionProps={{ duration: 150 }}>
                <div
                  key={type}
                  className={styles.fill}
                  style={{ height: `${height}%`, backgroundColor: color }}
                />
                </Tooltip>
              );
            })}
          </div>
          <Text size="xs">{intakeVolume} mL ({intakeHeight.toFixed(0)}%)</Text>
        </Box>
        </Flex>
        {/* Output Section */}
        <Flex className={styles.verticalFlex}>
          <Select
              className={styles.selectBox}
              placeholder="Output Type"
              data={[
                { value: 'generic', label: 'Generic' },
                { value: 'voided', label: 'Urinary: voided' },
                { value: 'foley', label: 'Urinary: foley' },
                { value: 'suprapubic', label: 'Urinary: suprapubic' },
                { value: 'nephrostomy', label: 'Urinary: nephrostomy' },
                { value: 'stool', label: 'GI: stool' },
                { value: 'ostomy', label: 'GI: ostomy' },
                { value: 'ng', label: 'GI: NG tube' },
                { value: 'emesis', label: 'GI: emesis' },
                { value: 'peg', label: 'GI: PEG' },
                { value: 'woundDrains', label: 'Other: wound/surgical drains' },
                { value: 'chestTube', label: 'Other: chest tube' },
                { value: 'irrigation', label: 'Other: irrigation' },
                { value: 'blood', label: 'Other: blood' },
                { value: 'sweat', label: 'Other: sweat' },
              ]}
              value={outputType}
              onChange={setOutputType}
          />
          <DateTimePicker className={styles.dateTime}
            placeholder="Date/Time"
            value={new Date()}
            valueFormat='MM/DD/YYYY HH:mm'
            onChange={setDateTime}
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
            {Object.entries(outputFluids).map(([type, volume]) => {
              if (volume === 0) { return null };

              const height = (volume / maxVolume) * 100;
              const color = fluidColors[type] || '#333533';

              return (
                <Tooltip label={`${type}: ${volume} mL`} position="right" withArrow transitionProps={{ duration: 150 }}>
                <div
                  key={type}
                  className={styles.fill}
                  style={{ height: `${height}%`, backgroundColor: color }}
                />
                </Tooltip>
              );
            })}
          </div>
          <Text size="xs">{outputVolume} mL ({outputHeight.toFixed(0)}%)</Text>
        </Box>
        </Flex>
      </Flex>

      <Select
        label="Timeframe"
        value={timeframe.toString()}
        data={[
          { value: 'all', label: 'All' },
          { value: '1440', label: '24hr' },
          { value: '720', label: '12hr' },
          { value: '240', label: '4hr' },
          { value: '60', label: '1hr' },
          { value: '10', label: '10m' },
        ]}
        onChange={(value) => setTimeframe(value ?? 'all')}
      />
    </>
  );
}
