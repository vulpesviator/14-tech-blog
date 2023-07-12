module.exports = {
    format_date: (date) => {
      // Format date as MM/DD/YYYY
      const month = new Date(date).getMonth() + 1;
      const day = new Date(date).getDate();
      const year = new Date(date).getFullYear();
      return `${month}/${day}/${year}`;
    },
  
    format_amount: (amount) => {
      // format large numbers with commas
      return parseInt(amount).toLocaleString();
    },
  
    is_my_page: (pageUser, userId) => {
      return pageUser === userId;
    },
  };