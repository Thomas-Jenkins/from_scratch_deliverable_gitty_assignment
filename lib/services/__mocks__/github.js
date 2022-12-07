const exchangeCodeForToken = async (code) => {
  return 'anyString';
};

const getGithubProfile = async (token) => {
  return {
    email: 'mockEmail@mocker.com',
    login: 'mockLogin', 
  };
};

module.exports = { exchangeCodeForToken, getGithubProfile };
