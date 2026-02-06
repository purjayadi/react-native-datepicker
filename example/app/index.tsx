import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Platform,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { DatePicker, DatePickerRef } from "@purjayadi/react-native-datepicker";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExampleApp() {
  const basicDatePickerRef = useRef<DatePickerRef>(null);
  const timePickerRef = useRef<DatePickerRef>(null);
  const rangedPickerRef = useRef<DatePickerRef>(null);
  const styledPickerRef = useRef<DatePickerRef>(null);
  const customFormatPickerRef = useRef<DatePickerRef>(null);

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedDateTime, setSelectedDateTime] = useState<string>("");
  const [rangedDate, setRangedDate] = useState<string>("");
  const [styledDate, setStyledDate] = useState<string>("");
  const [customFormatDate, setCustomFormatDate] = useState<string>("");
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
            contentContainerStyle={styles.scrollContent}
          >
            <Text style={styles.headerTitle}>📅 DatePicker Examples</Text>
            <Text style={styles.headerSubtitle}>
              @purjayadi/react-native-datepicker
            </Text>

            {/* Basic Date Picker */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🎂 Birth Date</Text>
              <Text style={styles.sectionDescription}>
                Select your birthday to calculate your age
              </Text>
              <DatePicker
                ref={basicDatePickerRef}
                label="Date of Birth"
                placeholder="When were you born?"
                value={selectedDate}
                onChange={handleDateChange}
                errors={errors}
                maxDate={new Date().toISOString().split("T")[0]}
              />
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[styles.customButton, styles.primaryButton]}
                  onPress={() => basicDatePickerRef.current?.show()}
                >
                  <Text style={styles.buttonText}>📅 Select Birthday</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.customButton, styles.successButton]}
                  onPress={triggerValidation}
                >
                  <Text style={styles.buttonText}>✓ Verify</Text>
                </TouchableOpacity>
              </View>
              {selectedDate && (
                <View style={styles.resultCard}>
                  <Text style={styles.resultLabel}>Your Birthday:</Text>
                  <Text style={styles.resultValue}>{selectedDate}</Text>
                </View>
              )}
            </View>

            {/* Date & Time Picker */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>⏰ Appointment Booking</Text>
              <Text style={styles.sectionDescription}>
                Schedule your next appointment
              </Text>
              <DatePicker
                ref={timePickerRef}
                label="Appointment Date & Time"
                placeholder="Pick a date and time"
                value={selectedDateTime}
                onChange={setSelectedDateTime}
                showTimePicker={true}
                minDate={new Date().toISOString().split("T")[0]}
              />
              <TouchableOpacity
                style={[styles.customButton, styles.blueButton]}
                onPress={() => timePickerRef.current?.show()}
              >
                <Text style={styles.buttonText}>🗓️ Book Appointment</Text>
              </TouchableOpacity>
              {selectedDateTime && (
                <View style={[styles.resultCard, styles.resultCardBlue]}>
                  <Text style={styles.resultLabel}>Scheduled for:</Text>
                  <Text style={styles.resultValue}>{selectedDateTime}</Text>
                </View>
              )}
            </View>

            {/* Ranged Date Picker */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🎫 Event Registration</Text>
              <Text style={styles.sectionDescription}>
                Choose a date between 2020-2025
              </Text>
              <DatePicker
                ref={rangedPickerRef}
                label="Event Date"
                subText="💡 Only dates from 2020 to 2025 are available"
                placeholder="Select event date"
                value={rangedDate}
                onChange={setRangedDate}
                minDate="2020-01-01"
                maxDate="2025-12-31"
              />
              <TouchableOpacity
                style={[styles.customButton, styles.orangeButton]}
                onPress={() => rangedPickerRef.current?.show()}
              >
                <Text style={styles.buttonText}>🎉 Choose Event Date</Text>
              </TouchableOpacity>
              {rangedDate && (
                <View style={[styles.resultCard, styles.resultCardOrange]}>
                  <Text style={styles.resultLabel}>Event Date:</Text>
                  <Text style={styles.resultValue}>{rangedDate}</Text>
                </View>
              )}
            </View>

            {/* Styled Date Picker */}
            <View style={[styles.section, styles.sectionGreen]}>
              <Text style={styles.sectionTitle}>🌿 Custom Styled</Text>
              <Text style={styles.sectionDescription}>
                Green-themed eco-friendly design
              </Text>
              <DatePicker
                ref={styledPickerRef}
                label="Recycling Day"
                placeholder="Pick your green day"
                value={styledDate}
                onChange={setStyledDate}
                inputStyle={{
                  backgroundColor: "#ECFDF5",
                  borderRadius: 16,
                  borderWidth: 2,
                  borderColor: "#6EE7B7",
                }}
                inputTextStyle={{
                  fontSize: 18,
                  color: "#065F46",
                  fontWeight: "700",
                }}
                labelStyle={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#047857",
                }}
                highlightColor="#6EE7B7"
                buttonStyle={{
                  backgroundColor: "#10B981",
                }}
              />
              <TouchableOpacity
                style={[styles.customButton, styles.greenButton]}
                onPress={() => styledPickerRef.current?.show()}
              >
                <Text style={styles.buttonText}>♻️ Select Date</Text>
              </TouchableOpacity>
              {styledDate && (
                <View style={[styles.resultCard, styles.resultCardGreen]}>
                  <Text style={styles.resultLabel}>Recycling Day:</Text>
                  <Text style={styles.resultValue}>{styledDate}</Text>
                </View>
              )}
            </View>

            {/* Custom Date Format */}
            <View style={[styles.section, styles.sectionPurple]}>
              <Text style={styles.sectionTitle}>💾 ISO Format (Dev Mode)</Text>
              <Text style={styles.sectionDescription}>
                Returns date in yyyy-MM-dd format for APIs
              </Text>
              <DatePicker
                ref={customFormatPickerRef}
                label="API Date Format"
                placeholder="YYYY-MM-DD"
                value={customFormatDate}
                onChange={setCustomFormatDate}
                dateFormat="yyyy-MM-dd"
                inputStyle={{
                  backgroundColor: "#F5F3FF",
                  borderWidth: 1,
                  borderColor: "#C4B5FD",
                  borderRadius: 12,
                }}
                inputTextStyle={{
                  fontFamily: "monospace",
                  fontSize: 16,
                  color: "#5B21B6",
                }}
                labelStyle={{
                  color: "#6D28D9",
                  fontWeight: "600",
                }}
              />
              <TouchableOpacity
                style={[styles.customButton, styles.purpleButton]}
                onPress={() => customFormatPickerRef.current?.show()}
              >
                <Text style={styles.buttonText}>⚙️ Select Date</Text>
              </TouchableOpacity>
              {customFormatDate && (
                <View style={[styles.resultCard, styles.resultCardPurple]}>
                  <Text style={styles.resultLabel}>API Response:</Text>
                  <Text style={[styles.resultValue, styles.monoFont]}>
                    {`{ "date": "${customFormatDate}" }`}
                  </Text>
                </View>
              )}
            </View>

            {/* Clear All Button */}
            <View style={styles.clearSection}>
              <TouchableOpacity
                style={[styles.customButton, styles.dangerButton]}
                onPress={() => {
                  setSelectedDate("");
                  setSelectedDateTime("");
                  setRangedDate("");
                  setStyledDate("");
                  setCustomFormatDate("");
                  setErrors([]);
                }}
              >
                <Text style={styles.buttonText}>🗑️ Clear All Selections</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerIcon}>💡</Text>
              <Text style={styles.footerText}>
                Tap any button above to explore different date picker features
              </Text>
            </View>

            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                Made with ❤️ using @purjayadi/react-native-datepicker
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
    fontSize: 32,
    fontWeight: "900",
    color: "#111827",
    marginBottom: 4,
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: 13,
    color: "#9CA3AF",
    marginBottom: 32,
    textAlign: "center",
    fontWeight: "500",
  },
  section: {
    marginBottom: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  sectionGreen: {
    backgroundColor: "#F0FDF4",
    borderWidth: 1,
    borderColor: "#BBF7D0",
  },
  sectionPurple: {
    backgroundColor: "#FAF5FF",
    borderWidth: 1,
    borderColor: "#E9D5FF",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 16,
    lineHeight: 20,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 12,
    fontStyle: "italic",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
  },
  customButton: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButton: {
    backgroundColor: "#3B82F6",
  },
  successButton: {
    backgroundColor: "#10B981",
  },
  blueButton: {
    backgroundColor: "#3B82F6",
    marginTop: 20,
  },
  orangeButton: {
    backgroundColor: "#F59E0B",
    marginTop: 20,
  },
  greenButton: {
    backgroundColor: "#10B981",
    marginTop: 20,
  },
  purpleButton: {
    backgroundColor: "#7C3AED",
    marginTop: 20,
  },
  dangerButton: {
    backgroundColor: "#EF4444",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
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
  resultCard: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#ECFDF5",
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#10B981",
  },
  resultCardBlue: {
    backgroundColor: "#EFF6FF",
    borderLeftColor: "#3B82F6",
  },
  resultCardOrange: {
    backgroundColor: "#FFF7ED",
    borderLeftColor: "#F59E0B",
  },
  resultCardGreen: {
    backgroundColor: "#F0FDF4",
    borderLeftColor: "#10B981",
  },
  resultCardPurple: {
    backgroundColor: "#FAF5FF",
    borderLeftColor: "#7C3AED",
  },
  resultLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  resultValue: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },
  monoFont: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 14,
  },
  clearSection: {
    marginTop: 8,
    marginBottom: 24,
  },
  footer: {
    marginTop: 12,
    marginBottom: 16,
    padding: 20,
    backgroundColor: "#FEF3C7",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  footerIcon: {
    fontSize: 24,
  },
  footerText: {
    flex: 1,
    fontSize: 14,
    color: "#92400E",
    lineHeight: 20,
    fontWeight: "500",
  },
  badge: {
    padding: 12,
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    alignItems: "center",
  },
  badgeText: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "600",
  },
});
