import parse from "date-fns/parse";

export const parseDate = parse(date, 'dd-MM-yyyy', new Date().toLocaleDateString());
