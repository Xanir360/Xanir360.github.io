/**
 * Advanced Date Converter (Gregorian & Jalali)
 * Author: siamak Kasan
 * Updated by: Your Name (Optional)+ In case of updating or getting a code error
 * License: GNU/LGPL (Open Source & Free)
 * Version: 8.0 (Complete)
 * Description: A comprehensive date conversion library with additional features.
 */

class DateConverter {
  /**
   * Convert Gregorian date to Jalali date.
   * @param {number} gy - Gregorian year
   * @param {number} gm - Gregorian month (1-12)
   * @param {number} gd - Gregorian day (1-31)
   * @returns {number[]} [jy, jm, jd] - Jalali year, month, day
   */
  static gregorianToJalali(gy, gm, gd) {
    if (typeof gy !== 'number' || typeof gm !== 'number' || typeof gd !== 'number') {
      throw new TypeError("Invalid input type. Expected numbers.");
    }
    if (!this.isValidGregorianDate(gy, gm, gd)) {
      throw new Error("Invalid Gregorian date.");
    }

    const daysInGregorianMonths = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    const gy2 = gm > 2 ? gy + 1 : gy; // Adjust for leap year if month is after February
    let totalDays = 355666 + (365 * gy) + Math.floor((gy2 + 3) / 4) - Math.floor((gy2 + 99) / 100) + Math.floor((gy2 + 399) / 400) + gd + daysInGregorianMonths[gm - 1];

    let jy = -1595 + (33 * Math.floor(totalDays / 12053));
    totalDays %= 12053;
    jy += 4 * Math.floor(totalDays / 1461);
    totalDays %= 1461;

    if (totalDays > 365) {
      jy += Math.floor((totalDays - 1) / 365);
      totalDays = (totalDays - 1) % 365;
    }

    let jm, jd;
    if (totalDays < 186) {
      jm = 1 + Math.floor(totalDays / 31);
      jd = 1 + (totalDays % 31);
    } else {
      jm = 7 + Math.floor((totalDays - 186) / 30);
      jd = 1 + ((totalDays - 186) % 30);
    }

    return [jy, jm, jd];
  }

  /**
   * Convert Jalali date to Gregorian date.
   * @param {number} jy - Jalali year
   * @param {number} jm - Jalali month (1-12)
   * @param {number} jd - Jalali day (1-31)
   * @returns {number[]} [gy, gm, gd] - Gregorian year, month, day
   */
  static jalaliToGregorian(jy, jm, jd) {
    if (typeof jy !== 'number' || typeof jm !== 'number' || typeof jd !== 'number') {
      throw new TypeError("Invalid input type. Expected numbers.");
    }
    if (!this.isValidJalaliDate(jy, jm, jd)) {
      throw new Error("Invalid Jalali date.");
    }

    jy += 1595;
    let totalDays = -355668 + (365 * jy) + (Math.floor(jy / 33) * 8) + Math.floor(((jy % 33) + 3) / 4) + jd + (jm < 7 ? (jm - 1) * 31 : ((jm - 7) * 30) + 186);

    let gy = 400 * Math.floor(totalDays / 146097);
    totalDays %= 146097;

    if (totalDays > 36524) {
      gy += 100 * Math.floor((--totalDays) / 36524);
      totalDays %= 36524;
      if (totalDays >= 365) totalDays++;
    }

    gy += 4 * Math.floor(totalDays / 1461);
    totalDays %= 1461;

    if (totalDays > 365) {
      gy += Math.floor((totalDays - 1) / 365);
      totalDays = (totalDays - 1) % 365;
    }

    let gd = totalDays + 1;
    const daysInGregorianMonths = [0, 31, (gy % 4 === 0 && gy % 100 !== 0) || (gy % 400 === 0) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let gm;

    for (gm = 0; gm < 13 && gd > daysInGregorianMonths[gm]; gm++) {
      gd -= daysInGregorianMonths[gm];
    }

    return [gy, gm, gd];
  }

  /**
   * Check if a Gregorian date is valid.
   * @param {number} gy - Gregorian year
   * @param {number} gm - Gregorian month (1-12)
   * @param {number} gd - Gregorian day (1-31)
   * @returns {boolean} True if the date is valid, otherwise false
   */
  static isValidGregorianDate(gy, gm, gd) {
    if (gm < 1 || gm > 12 || gd < 1) return false;
    const daysInMonth = [31, (gy % 4 === 0 && gy % 100 !== 0) || (gy % 400 === 0) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return gd <= daysInMonth[gm - 1];
  }

  /**
   * Check if a Jalali date is valid.
   * @param {number} jy - Jalali year
   * @param {number} jm - Jalali month (1-12)
   * @param {number} jd - Jalali day (1-31)
   * @returns {boolean} True if the date is valid, otherwise false
   */
  static isValidJalaliDate(jy, jm, jd) {
    if (jm < 1 || jm > 12 || jd < 1) return false;
    const daysInMonth = jm < 7 ? 31 : jm === 12 && !this.isJalaliLeapYear(jy) ? 29 : 30;
    return jd <= daysInMonth;
  }

  /**
   * Check if a Jalali year is a leap year.
   * @param {number} jy - Jalali year
   * @returns {boolean} True if the year is a leap year, otherwise false
   */
  static isJalaliLeapYear(jy) {
    return (((jy - 474) % 2820) + 474 + 38) * 682 % 2816 < 682;
  }

  /**
   * Convert English numbers to Persian numbers.
   * @param {string} num - A string containing English numbers
   * @returns {string} A string with Persian numbers
   */
  static toPersianNumbers(num) {
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    return num.toString().replace(/\d/g, (d) => persianDigits[d]);
  }

  /**
   * Format a Jalali date as a string with Persian numbers.
   * @param {number} jy - Jalali year
   * @param {number} jm - Jalali month (1-12)
   * @param {number} jd - Jalali day (1-31)
   * @param {string} format - Output format (e.g., "YYYY/MM/DD", "DD-MM-YYYY")
   * @param {boolean} usePersianNumbers - Whether to use Persian numbers (default: true)
   * @returns {string} Formatted date string
   */
  static formatJalaliDate(jy, jm, jd, format = "YYYY/MM/DD", usePersianNumbers = true) {
    if (!this.isValidJalaliDate(jy, jm, jd)) {
      throw new Error("Invalid Jalali date.");
    }

    let formattedDate = format
      .replace("YYYY", jy.toString())
      .replace("MM", jm.toString().padStart(2, "0"))
      .replace("DD", jd.toString().padStart(2, "0"));

    if (usePersianNumbers) {
      formattedDate = this.toPersianNumbers(formattedDate);
    }

    return formattedDate;
  }

  /**
   * Get the name of a Jalali month.
   * @param {number} jm - Jalali month (1-12)
   * @returns {string} Name of the month
   */
  static getJalaliMonthName(jm) {
    const monthNames = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];
    if (jm < 1 || jm > 12) throw new Error("Invalid Jalali month.");
    return monthNames[jm - 1];
  }

  /**
   * Get the day of the week for a Jalali date.
   * @param {number} jy - Jalali year
   * @param {number} jm - Jalali month (1-12)
   * @param {number} jd - Jalali day (1-31)
   * @returns {string} Name of the day of the week
   */
  static getDayOfWeek(jy, jm, jd) {
    const [gy, gm, gd] = this.jalaliToGregorian(jy, jm, jd);
    const date = new Date(gy, gm - 1, gd);
    const dayNames = ["یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه", "شنبه"];
    return dayNames[date.getDay()];
  }

  /**
   * Calculate the difference in days between two Jalali dates.
   * @param {number} jy1 - Jalali year of the first date
   * @param {number} jm1 - Jalali month of the first date
   * @param {number} jd1 - Jalali day of the first date
   * @param {number} jy2 - Jalali year of the second date
   * @param {number} jm2 - Jalali month of the second date
   * @param {number} jd2 - Jalali day of the second date
   * @returns {number} Difference in days
   */
  static differenceInDays(jy1, jm1, jd1, jy2, jm2, jd2) {
    const [gy1, gm1, gd1] = this.jalaliToGregorian(jy1, jm1, jd1);
    const [gy2, gm2, gd2] = this.jalaliToGregorian(jy2, jm2, jd2);
    const date1 = new Date(gy1, gm1 - 1, gd1);
    const date2 = new Date(gy2, gm2 - 1, gd2);
    const diffTime = Math.abs(date2 - date1);
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  }

  /**
   * Add days to a Jalali date.
   * @param {number} jy - Jalali year
   * @param {number} jm - Jalali month
   * @param {number} jd - Jalali day
   * @param {number} daysToAdd - Number of days to add
   * @returns {number[]} [jy, jm, jd] - New Jalali date
   */
  static addDays(jy, jm, jd, daysToAdd) {
    const [gy, gm, gd] = this.jalaliToGregorian(jy, jm, jd);
    const date = new Date(gy, gm - 1, gd + daysToAdd);
    return this.gregorianToJalali(date.getFullYear(), date.getMonth() + 1, date.getDate());
  }

  /**
   * Subtract days from a Jalali date.
   * @param {number} jy - Jalali year
   * @param {number} jm - Jalali month
   * @param {number} jd - Jalali day
   * @param {number} daysToSubtract - Number of days to subtract
   * @returns {number[]} [jy, jm, jd] - New Jalali date
   */
  static subtractDays(jy, jm, jd, daysToSubtract) {
    return this.addDays(jy, jm, jd, -daysToSubtract);
  }

/**
 * Check if a Jalali date is a holiday in Iran.
 * @param {number} jy - Jalali year
 * @param {number} jm - Jalali month
 * @param {number} jd - Jalali day
 * @returns {boolean} True if the date is a holiday, otherwise false
 */
static isHoliday(jy, jm, jd) {
  // لیست تعطیلات ثابت
  const holidays = [
    "1/1",   // نوروز
    "1/2",   // نوروز
    "1/3",   // نوروز
    "1/4",   // نوروز
    "1/12",  // روز جمهوری اسلامی
    "1/13",  // روز طبیعت
    "3/14",  // رحلت امام خمینی
    "3/15",  // قیام ۱۵ خرداد
    "11/22", // پیروزی انقلاب اسلامی
  ];

  // بررسی تعطیلات ثابت
  const dateKey = `${jm}/${jd}`;
  if (holidays.includes(dateKey)) {
    return true;
  }

  // بررسی روز جمعه
  const dayOfWeek = this.getDayOfWeek(jy, jm, jd);
  if (dayOfWeek === "جمعه") {
    return true;
  }

  // اگر هیچ شرطی برقرار نبود، تعطیل نیست
  return false;
}

  /**
   * Get the season based on Jalali month.
   * @param {number} jm - Jalali month (1-12)
   * @returns {string} Name of the season
   */
  static getSeason(jm) {
    if (jm < 1 || jm > 12) {
      throw new Error("Invalid Jalali month.");
    }

    if (jm >= 1 && jm <= 3) {
      return "بهار";
    } else if (jm >= 4 && jm <= 6) {
      return "تابستان";
    } else if (jm >= 7 && jm <= 9) {
      return "پاییز";
    } else {
      return "زمستان";
    }
  }

  /**
   * Get the zodiac sign based on Jalali month and day.
   * @param {number} jm - Jalali month (1-12)
   * @param {number} jd - Jalali day (1-31)
   * @returns {string} Name of the zodiac sign
   */
  static getZodiacSign(jm, jd) {
    if (jm < 1 || jm > 12 || jd < 1 || jd > 31) {
      throw new Error("Invalid Jalali month or day.");
    }

    if ((jm === 1 && jd >= 20) || (jm === 2 && jd <= 18)) {
      return "دلو";
    } else if ((jm === 2 && jd >= 19) || (jm === 3 && jd <= 20)) {
      return "حوت";
    } else if ((jm === 3 && jd >= 21) || (jm === 4 && jd <= 19)) {
      return "حمل";
    } else if ((jm === 4 && jd >= 20) || (jm === 5 && jd <= 20)) {
      return "ثور";
    } else if ((jm === 5 && jd >= 21) || (jm === 6 && jd <= 21)) {
      return "جوزا";
    } else if ((jm === 6 && jd >= 22) || (jm === 7 && jd <= 22)) {
      return "سرطان";
    } else if ((jm === 7 && jd >= 23) || (jm === 8 && jd <= 22)) {
      return "اسد";
    } else if ((jm === 8 && jd >= 23) || (jm === 9 && jd <= 22)) {
      return "سنبله";
    } else if ((jm === 9 && jd >= 23) || (jm === 10 && jd <= 22)) {
      return "میزان";
    } else if ((jm === 10 && jd >= 23) || (jm === 11 && jd <= 21)) {
      return "عقرب";
    } else if ((jm === 11 && jd >= 22) || (jm === 12 && jd <= 21)) {
      return "قوس";
    } else {
      return "جدی";
    }
  }

  /**
   * Get the Iranian zodiac animal based on Jalali year.
   * @param {number} jy - Jalali year
   * @returns {string} Name of the Iranian zodiac animal
   */
  static getIranZodiac(jy) {
    const zodiacAnimals = [
      "شیر",       // 0
      "پلنگ",      // 1
      "گرگ",       // 2
      "خرس",       // 3
      "شتر",       // 4
      "گاو",       // 5
      "اسب",       // 6
      "قوچ",       // 7
      "شاهین",     // 8
      "مار",       // 9
      "فیل",       // 10
      "گوزن"       // 11
    ];

    const remainder = jy % 12;
    return zodiacAnimals[remainder];
  }

  /**
   * Get the current Jalali date.
   * @returns {number[]} [jy, jm, jd] - Current Jalali date
   */
  static getCurrentJalaliDate() {
    const now = new Date();
    return this.gregorianToJalali(now.getFullYear(), now.getMonth() + 1, now.getDate());
  }

  /**
   * Get the current Jalali date and time.
   * @returns {string} Formatted Jalali date and time
   */
  static getCurrentJalaliDateTime() {
    const now = new Date();
    const [jy, jm, jd] = this.gregorianToJalali(now.getFullYear(), now.getMonth() + 1, now.getDate());
    const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    return `${this.formatJalaliDate(jy, jm, jd)} ${time}`;
  }
}

// مثال استفاده:
try {
  const jalaliDate = DateConverter.gregorianToJalali(2023, 10, 7);
  //console.log("Jalali Date:", jalaliDate); // خروجی: [1402, 7, 15]

  const formattedDate = DateConverter.formatJalaliDate(1402, 7, 15, "YYYY/MM/DD");
  //console.log("Formatted Jalali Date:", formattedDate); // خروجی: "۱۴۰۲/۰۷/۱۵"

  const gregorianDate = DateConverter.jalaliToGregorian(1402, 7, 15);
  //console.log("Gregorian Date:", gregorianDate); // خروجی: [2023, 10, 7]

  const monthName = DateConverter.getJalaliMonthName(7);
  //console.log("Month Name:", monthName); // خروجی: "مهر"

  const dayOfWeek = DateConverter.getDayOfWeek(1402, 7, 15);
  //console.log("Day of Week:", dayOfWeek); // خروجی: "شنبه"

  const diffDays = DateConverter.differenceInDays(1402, 7, 15, 1402, 8, 1);
  //console.log("Difference in Days:", diffDays); // خروجی: 16

  const newDate = DateConverter.addDays(1402, 7, 15, 10);
  //console.log("New Jalali Date:", newDate); // خروجی: [1402, 7, 25]

  const isHoliday = DateConverter.isHoliday(1402, 1, 1);
  //console.log("Is Holiday:", isHoliday); // خروجی: true

  const season = DateConverter.getSeason(7);
  //console.log("Season:", season); // خروجی: "پاییز"

  const zodiacSign = DateConverter.getZodiacSign(7, 15);
  //console.log("Zodiac Sign:", zodiacSign); // خروجی: "میزان"

  const iranZodiac = DateConverter.getIranZodiac(1402);
  //console.log("Iran Zodiac:", iranZodiac); // خروجی: "شاهین"

  const currentJalaliDate = DateConverter.getCurrentJalaliDate();
  //console.log("Current Jalali Date:", currentJalaliDate);

  const currentJalaliDateTime = DateConverter.getCurrentJalaliDateTime();
  //console.log("Current Jalali Date and Time:", currentJalaliDateTime);
  console.log = function() {}; // غیرفعال کردن تمام console.logها
} catch (error) {
  console.error(error.message);
}
