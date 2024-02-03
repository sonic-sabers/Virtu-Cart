// export const ConvertDate = (dateToBeChanged: number) => {
//     const date = new Date(dateToBeChanged);
  
//     const options = {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//     } as Intl.DateTimeFormatOptions;
  
//     const formattedDate = date.toLocaleDateString(undefined, options);
//     return formattedDate;
//   };
  export const ConvertDate = (dateToBeChanged: number) => {
    const date = new Date(dateToBeChanged);
  
    const formatDate = (date: Date) => {
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      } as Intl.DateTimeFormatOptions;
  
      return date.toLocaleDateString(undefined, options);
    };
  
    const formatTime = (date: Date) => {
      const hours = date.getHours() % 12 || 12;
      const minutes = date.getMinutes();
      const ampm = date.getHours() >= 12 ? 'pm' : 'am';
  
      return `${hours}:${minutes.toString().padStart(2, '0')}${ampm}`;
    };
  
    const formattedDate = formatDate(date);
    const formattedTime = formatTime(date);
  
    return `${formattedDate} ${formattedTime}`;
  };
  
  