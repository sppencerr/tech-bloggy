module.exports = {
    format_time: date => {
      // Return the formatted time string
      return date.toLocaleTimeString();
    },
    format_date: date => {
      // Get the month, date, and year and format them
      return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    }
  };