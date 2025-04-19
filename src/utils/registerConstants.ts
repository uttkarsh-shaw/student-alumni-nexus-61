
export const branches = [
  "Computer Science Engineering",
  "Information Technology",
  "Electronics & Communication",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Chemical Engineering",
];

export const graduationYears = Array.from(
  { length: 15 },
  (_, i) => (new Date().getFullYear() - 10 + i).toString()
);
