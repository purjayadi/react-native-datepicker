# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Custom date format support with `dateFormat` prop
- Screenshots to README documentation
- Enhanced example app with real-world use cases
- Custom button styling in example app

### Fixed

- Fixed date parsing issue when reopening picker with previously selected date
- Fixed compatibility with React Native Reanimated 4.x
- Moved peer dependencies (@gorhom/bottom-sheet, react-native-safe-area-context, etc.) to prevent conflicts

### Improved

- Better date format flexibility using date-fns format tokens
- Enhanced example UI with color-coded sections and better visual hierarchy
- Improved button styling and spacing in example app

## [1.0.0] - 2026-02-06

### Added

- Initial release
- Basic date picker functionality
- Time picker support with `showTimePicker` prop
- Min/Max date range support
- Customizable styling props
- TypeScript support
- Bottom sheet modal integration
- Wheel scrolling animation
- Safe area support
- Form validation error display

### Changed

- **BREAKING**: Replaced Moment.js with date-fns for better performance and smaller bundle size
- **BREAKING**: Removed multi-language support and translations (simplified to English only)
- **BREAKING**: Changed `currentDate` prop to `value`
- **BREAKING**: Changed `onSetDate` prop to `onChange`
- **BREAKING**: Removed `locale` and `translations` props
- Date format is now more flexible and tree-shakeable

### Technical Improvements

- Reduced bundle size by ~57KB by switching from Moment.js to date-fns
- Better tree-shaking support - only imports needed functions
- More modern date handling with native Date objects
- Immutable date operations by default
- Simplified API - more standard prop naming (value/onChange)

### Features

- Fully customizable appearance
- Cross-platform support (iOS & Android)
- Smooth wheel scrolling
- Ref-based API for imperative control
- date-fns integration for efficient date formatting
