const dataFormat = (date: string) => {
  //2023-01-22T22:20:44.982Z
  
  const dateArr = date.split('T');
  const newDate = dateArr[0] + ' ' + dateArr[1].slice(0, 8);

  return newDate
}

export default dataFormat;