export const capitalizeFirstLetter = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

export const getFullName = (name: string, lastname: string, lastnameFirst?: boolean) => {
  let fullName = '';
  if (lastnameFirst) {
    fullName = `${capitalizeFirstLetter(lastname)} ${capitalizeFirstLetter(name)}`;
  } else {
    fullName = `${capitalizeFirstLetter(name)} ${capitalizeFirstLetter(lastname)}`;
  }
  return fullName;
};
