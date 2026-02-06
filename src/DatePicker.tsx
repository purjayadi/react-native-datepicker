import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useCallback,
  useRef,
  useMemo,
} from "react";
import {
  View,
  TouchableOpacity,
  Platform,
  LayoutChangeEvent,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import {
  format,
  parse,
  getDaysInMonth,
  subYears,
  isBefore,
  isAfter,
  getYear,
  startOfDay,
} from "date-fns";
import ScrollPicker from "react-native-wheel-scrollview-picker";
import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export interface DatePickerRef {
  show: (initialDate?: string) => void;
}

export interface DatePickerProps {
  value?: string;
  label?: string;
  placeholder?: string;
  onChange: (date: string) => void;
  minDate?: string;
  maxDate?: string;
  showTimePicker?: boolean;
  subText?: string | React.ReactNode;
  errors?: string[];
  // Styling props
  inputStyle?: ViewStyle;
  inputTextStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  subTextStyle?: TextStyle;
  highlightColor?: string;
  buttonStyle?: ViewStyle;
  buttonTextStyle?: TextStyle;
  cancelButtonStyle?: ViewStyle;
  cancelButtonTextStyle?: TextStyle;
}

const InternalButton: React.FC<{
  onPress: () => void;
  children: string;
  outline?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}> = ({ onPress, children, outline, style, textStyle }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, outline && styles.buttonOutline, style]}
    >
      <Text
        style={[
          styles.buttonText,
          outline && styles.buttonTextOutline,
          textStyle,
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const DatePicker = forwardRef<DatePickerRef, DatePickerProps>(
  (
    {
      value,
      label,
      placeholder,
      onChange,
      minDate,
      maxDate,
      showTimePicker = false,
      subText,
      errors,
      inputStyle,
      inputTextStyle,
      labelStyle,
      errorStyle,
      subTextStyle,
      highlightColor = "#E5E5E5",
      buttonStyle,
      buttonTextStyle,
      cancelButtonStyle,
      cancelButtonTextStyle,
    },
    ref
  ) => {
    const nowYear = new Date().getFullYear();
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const { bottom: paddingBottom } = useSafeAreaInsets();

    const fullMonths = useMemo(
      () => [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      []
    );

    const shortMonths = useMemo(
      () => [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      []
    );
    const [day, setDay] = useState("01");
    const [month, setMonth] = useState("January");
    const [year, setYear] = useState(nowYear);
    const [days, setDays] = useState<string[]>([]);
    const [years, setYears] = useState<number[]>([]);
    const [initComplete, setInitComplete] = useState(false);
    const [hour, setHour] = useState("00");
    const [minute, setMinute] = useState("00");
    const [height, setHeight] = useState(180);

    const displayMonths = showTimePicker ? shortMonths : fullMonths;

    const show = useCallback(
      (initialDate?: string) => {
        const selectedDate = initialDate
          ? parse(initialDate, "yyyy-MM-dd", new Date())
          : new Date();
        const selectedDay = format(selectedDate, "dd");
        const currentMonthIndex = selectedDate.getMonth();
        const selectedMonth = fullMonths[currentMonthIndex];
        const selectedYear = getYear(selectedDate);

        const min = minDate
          ? parse(minDate, "yyyy-MM-dd", new Date())
          : subYears(new Date(), 200);
        const max = maxDate
          ? parse(maxDate, "yyyy-MM-dd", new Date())
          : new Date();

        const allYears = Array.from(
          { length: 200 },
          (_, i) => nowYear - i
        ).filter((y) => y >= getYear(min) && y <= getYear(max));

        const totalDays = getDaysInMonth(
          new Date(selectedYear, currentMonthIndex)
        );
        const daysArray = Array.from({ length: totalDays }, (_, i) =>
          `${i + 1}`.padStart(2, "0")
        );

        setDay(selectedDay);
        setMonth(selectedMonth);
        setYear(selectedYear);
        setYears(allYears);
        setDays(daysArray);
        setHour(format(selectedDate, "HH"));
        setMinute(format(selectedDate, "mm"));
        setInitComplete(true);

        setTimeout(() => bottomSheetRef.current?.present(), 10);
      },
      [minDate, maxDate, fullMonths]
    );

    useImperativeHandle(ref, () => ({ show }), [show]);

    const handleSetDate = () => {
      const monthIndex = fullMonths.findIndex((m) => m === month);
      const finalDateStr = `${year}-${(monthIndex + 1)
        .toString()
        .padStart(2, "0")}-${day}`;

      const finalDate = showTimePicker
        ? parse(
            `${finalDateStr} ${hour}:${minute}`,
            "yyyy-MM-dd HH:mm",
            new Date()
          )
        : parse(finalDateStr, "yyyy-MM-dd", new Date());

      const minDateTime = minDate
        ? startOfDay(parse(minDate, "yyyy-MM-dd", new Date()))
        : null;
      const maxDateTime = maxDate
        ? startOfDay(parse(maxDate, "yyyy-MM-dd", new Date()))
        : null;

      if (
        (minDateTime && isBefore(startOfDay(finalDate), minDateTime)) ||
        (maxDateTime && isAfter(startOfDay(finalDate), maxDateTime))
      ) {
        return;
      }

      const selectedMonthIndex = fullMonths.findIndex((m) => m === month);
      const formattedDate = showTimePicker
        ? `${day} ${shortMonths[selectedMonthIndex]} ${year} ${hour}:${minute}`
        : `${day} ${fullMonths[selectedMonthIndex]} ${year}`;

      onChange(formattedDate);
      bottomSheetRef.current?.close();
    };

    const handleMonthChange = (val: string) => {
      const fullMonth = showTimePicker
        ? (fullMonths.find((m) => m.startsWith(val)) ?? val)
        : val;
      const changedMonthIndex = fullMonths.findIndex((m) => m === fullMonth);
      const totalDays = getDaysInMonth(new Date(year, changedMonthIndex));
      const newDays = Array.from({ length: totalDays }, (_, i) =>
        `${i + 1}`.padStart(2, "0")
      );
      setMonth(fullMonth);
      setDays(newDays);
    };

    const handleYearChange = (val: number) => {
      const yearMonthIndex = fullMonths.findIndex((m) => m === month);
      const totalDays = getDaysInMonth(new Date(val, yearMonthIndex));
      const newDays = Array.from({ length: totalDays }, (_, i) =>
        `${i + 1}`.padStart(2, "0")
      );
      setYear(val);
      setDays(newDays);
    };

    const findSelectedDayByIndex = days.findIndex((val) => val === day);
    const findSelectedMonthByIndex = displayMonths.findIndex((val) =>
      showTimePicker ? month.startsWith(val) : val === month
    );
    const findSelectedYearByIndex = years.findIndex((val) => val === year);
    const hours = Array.from({ length: 24 }, (_, i) => `${i}`.padStart(2, "0"));
    const minutes = Array.from({ length: 60 }, (_, i) =>
      `${i}`.padStart(2, "0")
    );

    const dateValue = useMemo(() => {
      if (value) {
        return value;
      }
      return placeholder || "Select Date";
    }, [value, placeholder]);

    const handleLayout = (e?: LayoutChangeEvent) => {
      setHeight(e?.nativeEvent?.layout?.height || 180);
    };

    return (
      <>
        <View style={styles.container}>
          {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
          {subText && (
            <Text style={[styles.subText, subTextStyle]}>{subText}</Text>
          )}
          <TouchableOpacity
            style={[styles.input, errors && styles.inputError, inputStyle]}
            onPress={() => show(value)}
          >
            <Text
              style={[
                styles.inputText,
                !value && styles.inputTextPlaceholder,
                inputTextStyle,
              ]}
            >
              {dateValue}
            </Text>
          </TouchableOpacity>
          {errors && errors.length > 0 && (
            <Text style={[styles.errorText, errorStyle]}>{errors[0]}</Text>
          )}
        </View>

        <BottomSheetModal
          ref={bottomSheetRef}
          snapPoints={["50%"]}
          backgroundStyle={{ backgroundColor: "#fff" }}
          enableDynamicSizing={false}
          backdropComponent={(props) => (
            <BottomSheetBackdrop
              {...props}
              disappearsOnIndex={-1}
              appearsOnIndex={0}
            />
          )}
          enableContentPanningGesture={false}
          enableHandlePanningGesture={false}
          enablePanDownToClose={false}
        >
          {initComplete && (
            <View style={styles.modalContent}>
              <View>
                <Text style={styles.modalTitle}>
                  Select Date {showTimePicker ? "& Time" : ""}
                </Text>
              </View>
              <View style={styles.pickerContainer} onLayout={handleLayout}>
                {/* Day */}
                <ScrollPicker
                  dataSource={days}
                  selectedIndex={findSelectedDayByIndex}
                  renderItem={(data) => (
                    <Text
                      style={
                        data === day ? styles.pickerItemBold : styles.pickerItem
                      }
                    >
                      {data}
                    </Text>
                  )}
                  onValueChange={(value) => setDay(value as string)}
                  wrapperHeight={height}
                  itemHeight={40}
                  highlightBorderWidth={0.5}
                  highlightColor={highlightColor}
                  wrapperBackground="#FFFFFF"
                />
                {/* Month */}
                <ScrollPicker
                  dataSource={displayMonths}
                  selectedIndex={findSelectedMonthByIndex}
                  renderItem={(data) => (
                    <Text
                      style={
                        data === (showTimePicker ? month.slice(0, 3) : month)
                          ? styles.pickerItemBold
                          : styles.pickerItem
                      }
                    >
                      {data}
                    </Text>
                  )}
                  onValueChange={(value) => handleMonthChange(value as string)}
                  wrapperHeight={height}
                  itemHeight={40}
                  highlightBorderWidth={0.5}
                  highlightColor={highlightColor}
                  wrapperBackground="#FFFFFF"
                />
                {/* Year */}
                <ScrollPicker
                  dataSource={years}
                  selectedIndex={findSelectedYearByIndex}
                  renderItem={(data) => (
                    <Text
                      style={
                        data === year
                          ? styles.pickerItemBold
                          : styles.pickerItem
                      }
                    >
                      {data}
                    </Text>
                  )}
                  onValueChange={(value) => handleYearChange(value as number)}
                  wrapperHeight={height}
                  itemHeight={40}
                  highlightBorderWidth={0.5}
                  highlightColor={highlightColor}
                  wrapperBackground="#FFFFFF"
                />
                {showTimePicker && (
                  <>
                    <ScrollPicker
                      dataSource={hours}
                      selectedIndex={hours.findIndex((val) => val === hour)}
                      renderItem={(data) => (
                        <Text
                          style={
                            data === hour
                              ? styles.pickerItemBold
                              : styles.pickerItem
                          }
                        >
                          {data}
                        </Text>
                      )}
                      onValueChange={(value) => setHour(value as string)}
                      wrapperHeight={height}
                      itemHeight={40}
                      highlightBorderWidth={0.5}
                      highlightColor={highlightColor}
                      wrapperBackground="#FFFFFF"
                    />
                    <ScrollPicker
                      dataSource={minutes}
                      selectedIndex={minutes.findIndex((val) => val === minute)}
                      renderItem={(data) => (
                        <Text
                          style={
                            data === minute
                              ? styles.pickerItemBold
                              : styles.pickerItem
                          }
                        >
                          {data}
                        </Text>
                      )}
                      onValueChange={(value) => setMinute(value as string)}
                      wrapperHeight={height}
                      itemHeight={40}
                      highlightBorderWidth={0.5}
                      highlightColor={highlightColor}
                      wrapperBackground="#FFFFFF"
                    />
                  </>
                )}
              </View>
              <View
                style={[
                  styles.buttonContainer,
                  {
                    paddingBottom: Platform.OS === "ios" ? paddingBottom : 20,
                  },
                ]}
              >
                <InternalButton
                  onPress={() => bottomSheetRef.current?.close()}
                  outline
                  style={cancelButtonStyle}
                  textStyle={cancelButtonTextStyle}
                >
                  Cancel
                </InternalButton>
                <InternalButton
                  onPress={handleSetDate}
                  style={buttonStyle}
                  textStyle={buttonTextStyle}
                >
                  Save
                </InternalButton>
              </View>
            </View>
          )}
        </BottomSheetModal>
      </>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 8,
  },
  label: {
    fontSize: 14,
    color: "#6B7280",
  },
  subText: {
    fontSize: 14,
    color: "#6B7280",
    width: "95%",
  },
  input: {
    fontSize: 16,
    color: "#000",
    backgroundColor: "#F3F4F6",
    borderRadius: 16,
    padding: 14,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  inputError: {
    borderWidth: 1,
    borderColor: "#EF4444",
  },
  inputText: {
    fontSize: 16,
    color: "#1F2937",
  },
  inputTextPlaceholder: {
    color: "#9CA3AF",
  },
  errorText: {
    fontSize: 12,
    color: "#EF4444",
    fontWeight: "bold",
  },
  modalContent: {
    flexDirection: "column",
    gap: 12,
    marginHorizontal: 24,
    flex: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
    flex: 1,
  },
  pickerItem: {
    fontSize: 16,
    color: "#1F2937",
  },
  pickerItemBold: {
    fontSize: 16,
    color: "#1F2937",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 24,
    paddingVertical: 16,
    backgroundColor: "#fff",
  },
  button: {
    flex: 1,
    backgroundColor: "#3B82F6",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonOutline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#3B82F6",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonTextOutline: {
    color: "#3B82F6",
  },
});

export default DatePicker;
