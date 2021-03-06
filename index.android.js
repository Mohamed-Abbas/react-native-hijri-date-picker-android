import {
  NativeModules
} from 'react-native';

const HijriDatePickerModule = NativeModules.HijriDatePickerAndroid;
/**
 * Convert a Date to a timestamp.
 */
function _toMillis(options: Object, key: string) {
  const dateVal = options[key];
  // Is it a Date object?
  if (typeof dateVal === 'object' && typeof dateVal.getMonth === 'function') {
    options[key] = dateVal.getTime();
  }
}


/**
 * Opens the standard Android date picker dialog.
 *
 * ### Example
 *
 * ```
 * try {
 *   const {action, year, month, day} = await DatePickerAndroid.open({
 *     // Use `new Date()` for current date.
 *     // May 25 2020. Month 0 is January.
 *     date: new Date(2020, 4, 25)
 *   });
 *   if (action !== DatePickerAndroid.dismissedAction) {
 *     // Selected year, month (0-11), day
 *   }
 * } catch ({code, message}) {
 *   console.warn('Cannot open date picker', message);
 * }
 * ```
 */
class HijriDatePickerAndroid {
  /**
   * Opens the standard Android date picker dialog.
   *
   * The available keys for the `options` object are:
   *   * `date` (`Date` object or timestamp in milliseconds) - date to show by default
   *   * `minDate` (`Date` or timestamp in milliseconds) - minimum date that can be selected
   *   * `maxDate` (`Date` object or timestamp in milliseconds) - minimum date that can be selected
   *   * `mode` (`enum('no_arrows', 'default')`) - To set the date-picker mode to no_arrows/default
   *            - 'no_arrows': Show a date picker without arrows at the top bar
   *            - 'default': Show the basic date picker
   *   *  `weekDayLabels` (array of strings) the day labels that appears on the calendar
   *
   * Returns a Promise which will be invoked an object containing `action`, `year`, `month` (0-11),
   * `day` if the user picked a date. If the user dismissed the dialog, the Promise will
   * still be resolved with action being `DatePickerAndroid.dismissedAction` and all the other keys
   * being undefined. **Always** check whether the `action` before reading the values.
   *
   * Note the native date picker dialog has some UI glitches on Android 4 and lower
   * when using the `minDate` and `maxDate` options.
   */
  static async open(options: Object): Promise<Object> {
    const optionsMs = options;
    if (optionsMs) {
      _toMillis(options, 'date');
      _toMillis(options, 'minDate');
      _toMillis(options, 'maxDate');
    }
    return HijriDatePickerModule.open(options);
  }

  /**
   * A date has been selected.
   */
  static get dateSetAction() { return 'dateSetAction'; }
  /**
   * The dialog has been dismissed.
   */
  static get dismissedAction() { return 'dismissedAction'; }

  static async convertGregorianDateToHijriDate(dateObj: Object): Object {
    let millis = dateObj.getTime();
    return HijriDatePickerModule.convertMillisecondsToHijriDate(millis);
  }

  static async convertHijriDateToGregorianDate(hijriDateStr: string): double {
    return HijriDatePickerModule.convertHijriDateStrToGregorianMilliseconds(hijriDateStr);
  }





}


module.exports = HijriDatePickerAndroid;


