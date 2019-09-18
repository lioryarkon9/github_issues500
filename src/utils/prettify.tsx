export const getEnglishMonthNameByInt = (month: number): string => {
  switch (month) {
    case 0:
      return 'January';
    case 1:
      return 'February';
    case 2:
      return 'March';
    case 3:
      return 'April';
    case 4:
      return 'May';
    case 5:
      return 'June';
    case 6:
      return 'July';
    case 7:
      return 'August';
    case 8:
      return 'September';
    case 9:
      return 'October';
    case 10:
      return 'November';
    case 11:
      return 'December';
    default:
      return '';
  }
};

export const getPrettyOpenedOn = (strDate: string): string => {
  let result = 'opened on';
  const dateObject = new Date(strDate);
  const dd = dateObject.getDate(),
    mm = dateObject.getMonth(),
    yyyy = dateObject.getFullYear();
  result += ' ' + getEnglishMonthNameByInt(mm) + ' ' + dd + ', ' + yyyy;

  return result;
};

export const sortIssuesFunction = (itemA: any, itemB: any): number => {
  //sorting issues by updated_at (first option) or created_at (if no updated date)
  let sortingDateA, sortingDateB;
  const updateAtDate1 = itemA.updated_at;
  const updatedAtDate2 = itemB.updated_at;
  sortingDateA = updateAtDate1 ? updateAtDate1 : itemA.created_at; // theses could be either real dates or strings from api
  sortingDateB = updatedAtDate2 ? updatedAtDate2 : itemB.created_at;
  const realDateA: any = new Date(sortingDateA);
  const realDateB: any = new Date(sortingDateB);
  return realDateB - realDateA;
};
