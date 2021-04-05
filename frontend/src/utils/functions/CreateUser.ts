import dayjs from 'dayjs';

function getDays() {
   const Array = new Uint8Array(dayjs().daysInMonth());
   const dias: number[] = [];

   Array.map((_, index) => dias.push(index + 1));

   return dias;
}

function getYears() {
   const Array = new Uint8Array(117);
   const years: number[] = [];
   let actualYear = dayjs().year() - 116;

   Array.map(() => years.push(actualYear++));

   return years;
}

export { getDays, getYears };
