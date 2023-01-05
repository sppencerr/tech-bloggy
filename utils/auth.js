const withAuth = (req, res, next) => {
    // Check if the user is logged in
    if (!req.session.loggedIn) {
      // If not, redirect them to the login page
      res.redirect("/login");
    } else {
      // If they are logged in, allow them to proceed
      next();
    }
  };
  
  module.exports = withAuth;
  