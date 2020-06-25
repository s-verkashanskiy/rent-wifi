// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
export const cookiesCleaner = (req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.session.prevUrl = req.originalUrl;
    res.clearCookie('user_sid');
  }
  next();
};

// middleware function to check for logged-in users
export const sessionChecker = (url = '') => {

  return async function(req, res, next) {
		if (!req.session.user) {
      res.redirect('/' + url);
		} else {
      next();
		}
	};
};
