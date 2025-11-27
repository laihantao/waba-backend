export const selectAllConfig = `
  SELECT * FROM config;
`;

export const selectConfigByCategory = `
  SELECT * FROM config WHERE category = $1;
`;

export const updateConfigValueByName = `
  UPDATE config 
  SET value = $1
  WHERE name = $2;
`;
