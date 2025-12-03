export const loginValidation = `
  SELECT id, name, password, displayName, email, phone,createdAt, createdAt 
    FROM users 
    WHERE (LOWER(name) = LOWER($1) OR LOWER(email) = LOWER($1))
  AND isDeleted = FALSE;
`;

export const sqlResetPassword = `
  UPDATE users 
  SET password = $2,
      "updatedat" = NOW()
  WHERE id = $1
`;

export const selectUserById = `
  SELECT id, name, displayName, email, phone,createdAt, createdAt 
    FROM users 
    WHERE id = $1
  AND isDeleted = FALSE;
`;
 
