import { Text, NumberInput, Button, Flex, Box, Select, Tooltip } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import styles from '../styles/Tanks.module.css';
import { useState } from 'react';
import filterByTimeframe from './Utils';

interface TankProps {
    maxVolume: number;
    initialIntake?: number;
    initialOutput?: number;
    viewMode: 'tank' | 'scale';
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


export function Tank({ maxVolume = 5000, initialIntake: initialIntake = 0, initialOutput: initialOutput = 0, viewMode }: TankProps) {
  const [dateTime, setDateTime] = useState<Date>(new Date(Date.now()));
  const [timeframe, setTimeframe] = useState<string>("all");
  const [intakeEntries, setIntakeEntries] = useState<FluidEntry[]>([]);
  const [outputEntries, setOutputEntries] = useState<FluidEntry[]>([]);
  const [viewableIntakeEntries, setViewableIntakeEntries] = useState<FluidEntry[]>([]);
  const [viewableOutputEntries, setViewableOutputEntries] = useState<FluidEntry[]>([]);
  const [intakeVolume, setIntakeVolume] = useState(initialIntake);
  const [outputVolume, setOutputVolume] = useState(initialOutput);
  const [newIntake, setNewIntake] = useState<number | ''>('');
  const [newOutput, setNewOutput] = useState<number | ''>('');
  const [intakeType, setIntakeType] = useState<string | null>(null);
  const [outputType, setOutputType] = useState<string | null>(null);
  const [intakeFluids, setIntakeFluids] = useState<FluidTotals>({
    generic: 0,
    oral: 0,
    parenteral: 0,
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

  // Helper function to update display based on timeframe with specific arrays
  const updateDisplayFromTimeframe = (timeframeValue: string, intakeArray: FluidEntry[], outputArray: FluidEntry[]) => {
    // Filter entries based on the selected timeframe
    const filteredIntake = filterByTimeframe(intakeArray, timeframeValue);
    const filteredOutput = filterByTimeframe(outputArray, timeframeValue);

    // Update state to display
    setViewableIntakeEntries(filteredIntake);
    setViewableOutputEntries(filteredOutput);

    // Group and sum intake by type
    const intakeGrouped: FluidTotals = {};
    let intakeTotal = 0;

    // Update intake totals
    for (const entry of filteredIntake) {
      intakeGrouped[entry.type] = (intakeGrouped[entry.type] || 0) + entry.volume;
      intakeTotal += entry.volume;
    }

    // Update intake state
    setIntakeFluids(intakeGrouped);
    setIntakeVolume(intakeTotal);

    // Group and sum output by type
    const outputGrouped: FluidTotals = {};
    let outputTotal = 0;

    // Update output totals
    for (const entry of filteredOutput) {
      outputGrouped[entry.type] = (outputGrouped[entry.type] || 0) + entry.volume;
      outputTotal += entry.volume;
    }

    // Update output state
    setOutputFluids(outputGrouped);
    setOutputVolume(outputTotal);
  };

  const handleIntake = () => {
    if (typeof newIntake === 'number' && intakeType) {
      const newEntry: FluidEntry = {
        type: intakeType,
        volume: newIntake,
        timestamp: dateTime,
      };
  
      setIntakeEntries((prev) => {
        const updated = [...prev, newEntry];
        // Apply timeframe filtering with the updated array
        setTimeout(() => updateDisplayFromTimeframe(timeframe, updated, outputEntries), 0);
        return updated;
      });

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
  
      setOutputEntries((prev) => {
        const updated = [...prev, newEntry];
        // Apply timeframe filtering with the updated array
        setTimeout(() => updateDisplayFromTimeframe(timeframe, intakeEntries, updated), 0);
        return updated;
      });
  
      setNewOutput('');
    }
  };
  const handleTimeframeChange = (value: string | null) => {
    if (!value) return;
    setTimeframe(value);
    updateDisplayFromTimeframe(value, intakeEntries, outputEntries);
  };


  const intakeHeight = Math.min(Math.max((intakeVolume / maxVolume) * 100, 0), 100);
  const outputHeight = Math.min(Math.max((outputVolume / maxVolume) * 100, 0), 100);

  return (
    <>
      {viewMode === 'tank' ? (
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
            value={dateTime}
            valueFormat='MM/DD/YYYY HH:mm'
            onChange={(value) => {
              if (value) setDateTime(value);
            }}
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
                <Tooltip key={type} label={`${type}: ${volume} mL`} position="right" withArrow transitionProps={{ duration: 150 }}>
                <div
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
            value={dateTime}
            valueFormat='MM/DD/YYYY HH:mm'
            onChange={(value) => {
              if (value) setDateTime(value);
            }}
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
                <Tooltip key={type} label={`${type}: ${volume} mL`} position="right" withArrow transitionProps={{ duration: 150 }}>
                <div
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
      ) : (
        <Box className={styles.seesawWrapper}>
          <Box className={styles.seesawContainer}>
            <Box className={styles.pivot} />
            <Box
              className={styles.seesawBar}
              style={{
                transform: `rotate(${(outputVolume - intakeVolume) / maxVolume * 10}deg)`,
              }}
            >
              <Box className={styles.scaleSide}>
                <Text ta="center">🥤<br />Intake<br />{intakeVolume} mL</Text>
              </Box>
              <Box className={styles.scaleSide}>
                <Text ta="center">🚽<br />Output<br />{outputVolume} mL</Text>
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      {/* Timeframe Selector */}
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
        onChange={handleTimeframeChange}
      />
    </>
  );
}
