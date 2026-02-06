# React Native DatePicker

A flexible and customizable React Native datepicker component with bottom sheet modal, featuring smooth wheel scrolling.

## Features

- 📅 Date and Time Picker support
- 🎨 Fully customizable styling
- 📱 Cross-platform (iOS & Android)
- 🎡 Smooth wheel scrolling animation
- 🔧 TypeScript support
- ⚡ Easy to use with ref API
- 🎯 Min/Max date range support
- ♿ Safe area support

## Installation

```bash
npm install @purjayadi/react-native-datepicker
```

or

```bash
yarn add @purjayadi/react-native-datepicker
```

### Peer Dependencies

This package requires the following peer dependencies to be installed:

```bash
npm install react-native-reanimated react-native-gesture-handler @gorhom/bottom-sheet date-fns react-native-wheel-scrollview-picker react-native-safe-area-context
```

Make sure to follow the setup instructions for:

- [@gorhom/bottom-sheet](https://gorhom.github.io/react-native-bottom-sheet/)
- [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/)

## Why date-fns?

This package uses [date-fns](https://date-fns.org/) for date manipulation, offering several advantages:

- ⚡ **Tree-shakeable**: Only bundle what you use (~13KB vs ~70KB with Moment.js)
- 🚀 **Modern**: Works with native JavaScript Date objects
- 🔧 **Immutable**: Functions always return new date instances
- 📦 **Modular**: Import only the functions you need

## Usage

### Basic Example

```tsx
import React, { useRef } from "react";
import { View, Button } from "react-native";
import { DatePicker, DatePickerRef } from "@purjayadi/react-native-datepicker";

export default function App() {
  const datePickerRef = useRef<DatePickerRef>(null);
  const [selectedDate, setSelectedDate] = React.useState<string>("");

  return (
    <View style={{ padding: 20 }}>
      <DatePicker
        ref={datePickerRef}
        label="Select Date"
        placeholder="Choose a date"
        currentDate={selectedDate}
        onSetDate={setSelectedDate}
      />

      <Button
        title="Open Picker"
        onPress={() => datePickerRef.current?.show()}
      />
    </View>
  );
}
```

### With Time Picker

```tsx
<DatePicker
  ref={datePickerRef}
  label="Select Date & Time"
  value={selectedDateTime}
  onChange={setSelectedDateTime}
  showTimePicker={true}
/>
```

### With Min/Max Date

```tsx
<DatePicker
  ref={datePickerRef}
  label="Select Date"
  value={selectedDate}
  onChange={setSelectedDate}
  minDate="2020-01-01"
  maxDate="2025-12-31"
/>
```

### With Custom Styling

```tsx
<DatePicker
  ref={datePickerRef}
  label="Select Date"
  value={selectedDate}
  onChange={setSelectedDate}
  inputStyle={{
    backgroundColor: "#E8F5E9",
    borderRadius: 12,
  }}
  inputTextStyle={{
    fontSize: 18,
    color: "#1B5E20",
  }}
  highlightColor="#4CAF50"
  buttonStyle={{
    backgroundColor: "#4CAF50",
  }}
/>
```

### With Validation Errors

```tsx
<DatePicker
  ref={datePickerRef}
  label="Birth Date"
  value={birthDate}
  onChange={setBirthDate}
  errors={["Please select your birth date"]}
/>
```

### With Custom Date Format

```tsx
// ISO format: "2026-02-06"
<DatePicker
  ref={datePickerRef}
  label="Select Date"
  value={selectedDate}
  onChange={setSelectedDate}
  dateFormat="yyyy-MM-dd"
/>

// US format: "02/06/2026"
<DatePicker
  ref={datePickerRef}
  label="Select Date"
  value={selectedDate}
  onChange={setSelectedDate}
  dateFormat="MM/dd/yyyy"
/>

// Custom format with time: "Feb 06, 2026 3:30 PM"
<DatePicker
  ref={datePickerRef}
  label="Select Date & Time"
  value={selectedDateTime}
  onChange={setSelectedDateTime}
  showTimePicker
  dateFormat="MMM dd, yyyy h:mm a"
/>
```

> **Note:** Date format uses [date-fns format tokens](https://date-fns.org/v3.3.1/docs/format). Common formats:
>
> - `yyyy-MM-dd` → 2026-02-06
> - `dd/MM/yyyy` → 06/02/2026
> - `MMM dd, yyyy` → Feb 06, 2026
> - `MMMM dd, yyyy HH:mm` → February 06, 2026 15:30

## API Reference

### Props

| Prop                    | Type                        | Default                                   | Description                               |
| ----------------------- | --------------------------- | ----------------------------------------- | ----------------------------------------- |
| `value`                 | `string`                    | `undefined`                               | Current selected date string              |
| `label`                 | `string`                    | `undefined`                               | Label text above the input                |
| `placeholder`           | `string`                    | `"Select Date"`                           | Placeholder text when no date is selected |
| `onChange`              | `(date: string) => void`    | **required**                              | Callback when date is selected            |
| `minDate`               | `string`                    | `undefined`                               | Minimum selectable date (ISO format)      |
| `maxDate`               | `string`                    | `undefined`                               | Maximum selectable date (ISO format)      |
| `showTimePicker`        | `boolean`                   | `false`                                   | Show time picker in addition to date      |
| `dateFormat`            | `string`                    | `"dd MMMM yyyy"` or `"dd MMM yyyy HH:mm"` | Custom date format (uses date-fns format) |
| `subText`               | `string \| React.ReactNode` | `undefined`                               | Subtitle text below label                 |
| `errors`                | `string[]`                  | `undefined`                               | Array of error messages                   |
| `inputStyle`            | `ViewStyle`                 | `undefined`                               | Custom style for input container          |
| `inputTextStyle`        | `TextStyle`                 | `undefined`                               | Custom style for input text               |
| `labelStyle`            | `TextStyle`                 | `undefined`                               | Custom style for label                    |
| `errorStyle`            | `TextStyle`                 | `undefined`                               | Custom style for error text               |
| `subTextStyle`          | `TextStyle`                 | `undefined`                               | Custom style for subtitle text            |
| `highlightColor`        | `string`                    | `"#E5E5E5"`                               | Color of the picker highlight             |
| `buttonStyle`           | `ViewStyle`                 | `undefined`                               | Custom style for save button              |
| `buttonTextStyle`       | `TextStyle`                 | `undefined`                               | Custom style for save button text         |
| `cancelButtonStyle`     | `ViewStyle`                 | `undefined`                               | Custom style for cancel button            |
| `cancelButtonTextStyle` | `TextStyle`                 | `undefined`                               | Custom style for cancel button text       |

### Ref Methods

| Method | Parameters             | Description                 |
| ------ | ---------------------- | --------------------------- |
| `show` | `initialDate?: string` | Opens the date picker modal |

## Example App

Check out the [example](./example) directory for a complete working Expo app demonstrating all features.

### Run the Example

```bash
cd example
npm install
npm start
```

Scan the QR code with Expo Go app or press `i` for iOS simulator / `a` for Android emulator.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [Your Name]

## Credits

Built with:

- [@gorhom/bottom-sheet](https://github.com/gorhom/react-native-bottom-sheet)
- [react-native-wheel-scrollview-picker](https://github.com/yasemincidem/react-native-wheel-scrollview-picker)
- [date-fns](https://date-fns.org/)
