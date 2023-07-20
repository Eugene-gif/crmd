export function getFormatDate(inputDateStr) {
  const [timeStr, dateStr] = inputDateStr.split(' ');
  const [day, month, year] = dateStr.split('/').map(Number);
  const inputDate = new Date(year, month - 1, day);
  const today = new Date();
  const isSameDate = inputDate.getDate() === today.getDate()
                    && inputDate.getMonth() === today.getMonth()
                    && inputDate.getFullYear() === today.getFullYear();
  
  if (isSameDate) {
    return timeStr;
  }
  
  return dateStr;
}

export function checkIsNew(inputDateStr) {
  const [, dateStr] = inputDateStr.split(' ');
  const [day, month, year] = dateStr.split('/').map(Number);
  const inputDate = new Date(year, month - 1, day);
  const today = new Date();
  const isSameDate = inputDate.getDate() === today.getDate()
                    && inputDate.getMonth() === today.getMonth()
                    && inputDate.getFullYear() === today.getFullYear();

  if (isSameDate) {
    return 'Новая';
  }

  return null;
}