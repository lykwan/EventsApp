export const fetchUser = (userId, success, error) => {
  $.ajax({
    url: `api/users/${userId}`,
    method: 'GET',
    success,
    error
  });
};

export const fetchUsers = (success, error, query) => {
  $.ajax({
    url: 'api/users',
    method: 'GET',
    data: { query },
    success,
    error
  });
};
