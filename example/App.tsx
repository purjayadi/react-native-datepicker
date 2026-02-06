import React, { useRef, useState } from "react";
import {
  View,
  Button,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { DatePicker, DatePickerRef } from "@purjayadi/react-native-datepicker";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

export default function ExampleApp() {
  const basicDatePickerRef = useRef<DatePickerRef>(null);
  const timePickerRef = useRef<DatePickerRef>(null);
  const rangedPickerRef = useRef<DatePickerRef>(null);
  const styledPickerRef = useRef<DatePickerRef>(null);

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedDateTime, setSelectedDateTime] = useState<string>("");
  const [rangedDate, setRangedDate] = useState<string>("");
  const [styledDate, setStyledDate] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setErrors([]);
  };

  const triggerValidation = () => {
    if (!selectedDate) {
      setErrors(["Please select a date"]);
    }
  };

  return (
    <GestureHandlerRootView style={styles.root}>
      <BottomSheetModalProvider>
        <SafeAreaView style={styles.container}>
          <StatusBar style="dark" />
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}>
            <Text style={styles.headerTitle}>📅 DatePicker Examples</Text>
            <Text style={styles.headerSubtitle}>
              @purjayadi/react-native-datepicker
            </Text>

            {/* Basic Date Picker */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>1. Basic Date Picker</Text>
              <DatePicker
                ref={basicDatePickerRef}
                label="Select Date"
                placeholder="Choose a date"
                value={selectedDate}
                onChange={handleDateChange}
                errors={errors}
              />
              <View style={styles.buttonRow}>
                <Button
                  title="Open Picker"
                  onPress={() => basicDatePickerRef.current?.show()}
                />
                <View style={styles.buttonSpacer} />
                <Button
                  title="Validate"
                  onPress={triggerValidation}
                  color="#f44336"
                />
              </View>
              {selectedDate && (
                <Text style={styles.resultText}>Selected: {selectedDate}</Text>
              )}
            </View>

            {/* Date & Time Picker */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>2. Date & Time Picker</Text>
              <DatePicker
                ref={timePickerRef}
                label="Select Date & Time"
                placeholder="Choose date and time"
                value={selectedDateTime}
                onChange={setSelectedDateTime}
                showTimePicker={true}
              />
              <Button
                title="Open Time Picker"
                onPress={() => timePickerRef.current?.show()}
              />
              {selectedDateTime && (
                <Text style={styles.resultText}>
                  Selected: {selectedDateTime}
                </Text>
              )}
            </View>

            {/* Ranged Date Picker */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>3. Date Range Restriction</Text>
              <DatePicker
                ref={rangedPickerRef}
                label="Limited Date Range"
                subText="Only dates from 2020 to 2025 are selectable"
                placeholder="Choose a date in range"
                value={rangedDate}
                onChange={setRangedDate}
                minDate="2020-01-01"
                maxDate="2025-12-31"
              />
              <Button
                title="Open Ranged Picker"
                onPress={() => rangedPickerRef.current?.show()}
              />
              {rangedDate && (
                <Text style={styles.resultText}>Selected: {rangedDate}</Text>
              )}
            </View>

            {/* Styled Date Picker */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>4. Custom Styled Picker</Text>
              <DatePicker
                ref={styledPickerRef}
                label="Styled Date Picker"
                placeholder="Custom styled picker"
                value={styledDate}
                onChange={setStyledDate}
                inputStyle={{
                  backgroundColor: "#E8F5E9",
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: "#4CAF50",
                }}
                inputTextStyle={{
                  fontSize: 18,
                  color: "#1B5E20",
                  fontWeight: "600",
                }}
                highlightColor="#4CAF50"
                buttonStyle={{
                  backgroundColor: "#4CAF50",
                }}
                labelStyle={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#2E7D32",
                }}
              />
              <Button
                title="Open Styled Picker"
                onPress={() => styledPickerRef.current?.show()}
                color="#4CAF50"
              />
              {styledDate && (
                <Text style={styles.resultText}>Selected: {styledDate}</Text>
              )}
            </View>

            {/* Clear All Button */}
            <View style={styles.section}>
              <Button
                title="Clear All Dates"
                onPress={() => {
                  setSelectedDate("");
                  setSelectedDateTime("");
                  setRangedDate("");
                  setStyledDate("");
                  setErrors([]);
                }}
                color="#9E9E9E"
              />
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>
                💡 Tip: Tap the buttons above to open the date picker modals
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 30,
    textAlign: "center",
  },
  section: {
    marginBottom: 32,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 12,
  },
  buttonSpacer: {
    width: 12,
  },
  resultText: {
    marginTop: 12,
    fontSize: 14,
    color: "#059669",
    fontWeight: "600",
    backgroundColor: "#D1FAE5",
    padding: 12,
    borderRadius: 8,
  },
  footer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#FEF3C7",
    borderRadius: 12,
  },
  footerText: {
    fontSize: 14,
    color: "#92400E",
    textAlign: "center",
  },
});
