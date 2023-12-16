import parse from "date-fns/parse";

export const date = parse(date, 'dd-MM-yyyy', new Date().toLocaleDateString());
