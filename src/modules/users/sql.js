export const selectAllConfig = `
  SELECT * FROM config;
`;

export const selectConfigByCategory = `
  SELECT * FROM config WHERE category = $1;
`;

export const selectConfigByName = `
  SELECT * FROM config WHERE name = $1;
`;

export const sqlUpdateConfigValueByName = `
  UPDATE config 
  SET value = $1,
      "updatedat" = NOW()
  WHERE name = $2
  RETURNING *;
`;
