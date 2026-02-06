# DatePicker Example App

This is an Expo application demonstrating the usage of `@purjayadi/react-native-datepicker`.

## Features Demonstrated

1. **Basic Date Picker** - Simple date selection with validation
2. **Date & Time Picker** - Date and time selection together
3. **Date Range Restriction** - Limiting selectable dates between min and max
4. **Custom Styling** - Customizing the appearance of the picker

## Setup

### Prerequisites

- Node.js >= 16
- Expo CLI: `npm install -g expo-cli`
- Expo Go app on your device (iOS/Android)
- Or a simulator/emulator

### Installation

```bash
# Install dependencies
npm install
# or
yarn install
```

## Running the Example

### Start Development Server

```bash
npm start
# or
yarn start
```

Then:

- Scan QR code with Expo Go app (iOS/Android)
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Press `w` for web browser

### Direct Platform Launch

```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## Project Structure

```
example/
├── App.tsx           # Main example component
├── package.json      # Example app dependencies
└── README.md         # This file
```

## Usage Examples

### Basic Usage

```tsx
import { DatePicker, DatePickerRef } from '@purjayadi/react-native-datepicker';

const datePickerRef = useRef<DatePickerRef>(null);
const [date, setDate] = useState('');

<DatePicker
  ref={datePickerRef}
  label="Select Date"
  value={date}
  onChange={setDate}
/>

<Button onPress={() => datePickerRef.current?.show()} />
```

### With Time Picker

```tsx
<DatePicker
  ref={datePickerRef}
  label="Select Date & Time"
  value={dateTime}
  onChange={setDateTime}
  showTimePicker={true}
/>
```

### With Date Range

```tsx
<DatePicker
  ref={datePickerRef}
  label="Select Date"
  value={date}
  onChange={setDate}
  minDate="2020-01-01"
  maxDate="2025-12-31"
/>
```

### Custom Styling

```tsx
<DatePicker
  ref={datePickerRef}
  value={date}
  onChange={setDate}
  inputStyle={{
    backgroundColor: "#E8F5E9",
    borderRadius: 12,
  }}
  highlightColor="#4CAF50"
  buttonStyle={{
    backgroundColor: "#4CAF50",
  }}
/>
```

## Dependencies

- **Expo** - Development framework
- `react-native-reanimated` - For bottom sheet animations
- `react-native-gesture-handler` - For gesture handling
- `@gorhom/bottom-sheet` - Bottom sheet component
- `react-native-safe-area-context` - Safe area handling

## Troubleshooting

### Clear Cache

If you encounter any issues:

```bash
# Clear Expo cache
rm -rf .expo
expo start -c

# Or clear npm/yarn cache
npm cache clean --force
# or
yarn cache clean
```

### Module Resolution Issues

If the package is not found:

```bash
# Reinstall dependencies
rm -rf node_modules
npm install
# or
yarn install
```

## Learn More

- [Package Documentation](../README.md)
- [Expo Documentation](https://docs.expo.dev/)
- [@gorhom/bottom-sheet](https://gorhom.github.io/react-native-bottom-sheet/)
