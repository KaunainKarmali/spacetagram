// Validate user's search query
export const validateSearch = (search) => {
  let valid = true;
  const searchErrorArr = [];

  // Must have a start date
  if (search.start === "") {
    valid = false;
    searchErrorArr.push({ message: "Missing start date" });
  }

  // Start date must be before end date
  if (search.end !== "" && new Date(search.start) > new Date(search.end)) {
    valid = false;
    searchErrorArr.push({
      message: "Start date must be before the end date",
    });
  }

  return { valid, searchErrorArr };
};
