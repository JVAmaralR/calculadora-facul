import { ReactNode } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { opSymbol, useCalculator } from './useCalculator';

export default function Calculator() {
  const {
    display,
    previous,
    operation,
    inputDigit,
    inputDecimal,
    clear,
    toggleSign,
    inputPercent,
    performOperation,
    equals,
  } = useCalculator();

  const expression =
    previous !== null && operation !== null
      ? `${previous} ${opSymbol(operation)}`
      : ' ';

  return (
    <View style={styles.calculator}>
      <Text style={styles.expression} numberOfLines={1}>
        {expression}
      </Text>
      <Text style={styles.display} numberOfLines={1} adjustsFontSizeToFit>
        {display}
      </Text>
      <View style={styles.keys}>
        <Row>
          <Key label="C" variant="fn" onPress={clear} />
          <Key label="±" variant="fn" onPress={toggleSign} />
          <Key label="%" variant="fn" onPress={inputPercent} />
          <Key label="÷" variant="op" onPress={() => performOperation('/')} />
        </Row>
        <Row>
          <Key label="7" onPress={() => inputDigit('7')} />
          <Key label="8" onPress={() => inputDigit('8')} />
          <Key label="9" onPress={() => inputDigit('9')} />
          <Key label="×" variant="op" onPress={() => performOperation('*')} />
        </Row>
        <Row>
          <Key label="4" onPress={() => inputDigit('4')} />
          <Key label="5" onPress={() => inputDigit('5')} />
          <Key label="6" onPress={() => inputDigit('6')} />
          <Key label="−" variant="op" onPress={() => performOperation('-')} />
        </Row>
        <Row>
          <Key label="1" onPress={() => inputDigit('1')} />
          <Key label="2" onPress={() => inputDigit('2')} />
          <Key label="3" onPress={() => inputDigit('3')} />
          <Key label="+" variant="op" onPress={() => performOperation('+')} />
        </Row>
        <Row>
          <Key label="0" wide onPress={() => inputDigit('0')} />
          <Key label="." onPress={inputDecimal} />
          <Key label="=" variant="op" onPress={equals} />
        </Row>
      </View>
    </View>
  );
}

function Row({ children }: { children: ReactNode }) {
  return <View style={styles.row}>{children}</View>;
}

type KeyProps = {
  label: string;
  onPress: () => void;
  variant?: 'fn' | 'op';
  wide?: boolean;
};

function Key({ label, onPress, variant, wide }: KeyProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.key,
        variant === 'fn' && styles.keyFn,
        variant === 'op' && styles.keyOp,
        wide && styles.keyWide,
      ]}
    >
      <Text style={[styles.keyLabel, variant === 'fn' && styles.keyLabelFn]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  calculator: {
    width: 320,
    backgroundColor: '#000',
    borderRadius: 16,
    padding: 16,
  },
  expression: {
    color: '#888',
    fontSize: 22,
    fontWeight: '300',
    textAlign: 'right',
    paddingTop: 16,
    paddingHorizontal: 12,
    minHeight: 32,
  },
  display: {
    color: '#fff',
    fontSize: 64,
    fontWeight: '200',
    textAlign: 'right',
    paddingTop: 8,
    paddingBottom: 24,
    paddingHorizontal: 12,
    minHeight: 96,
  },
  keys: { gap: 10 },
  row: { flexDirection: 'row', gap: 10 },
  key: {
    flex: 1,
    height: 64,
    backgroundColor: '#333',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyFn: { backgroundColor: '#a5a5a5' },
  keyOp: { backgroundColor: '#ff9500' },
  keyWide: {
    flex: 2.1,
    alignItems: 'flex-start',
    paddingLeft: 26,
  },
  keyLabel: { color: '#fff', fontSize: 24, fontWeight: '500' },
  keyLabelFn: { color: '#000' },
});
