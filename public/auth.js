// Creates new oktaSignIn widget
var OKTA_SETTINGS = {
  // These settings are unique to this Okta web application
    baseUrl: "https://dev-8603522.okta.com",
    clientId: "0oa1bxnjl5vgiLnvU5d6",
    redirectUri: "http://localhost:8080/"
  };
  
var oktaSignIn = new OktaSignIn({
  logo: '//logo.clearbit.com/okta.com',
  features:{
    registration: true  
  },
  baseUrl: OKTA_SETTINGS.baseUrl,
  clientId: OKTA_SETTINGS.clientId,
  redirectUri: OKTA_SETTINGS.redirectUri,
  authParams: {
    pkce: true,
    responseType: ["token", "id_token"]
  }
});

// Handle the user's login and redirects
function handleLogin() {

  // If user is logging in for the first time
  if (oktaSignIn.hasTokensInUrl()) {
      oktaSignIn.authClient.token.parseFromUrl().then(function success(tokens) {
          // Save tokens in case page gets refreshed
          // Add token to tokenManager and auto-renew token
          tokens.forEach(token => {
            if (token.idToken) {
              oktaSignIn.authClient.tokenManager.add('idToken', token);
            }
            if (token.accessToken) {
              oktaSignIn.authClient.tokenManager.add('accessToken', token);
            }
          });
  
          // Say hello to the person who just signed in:
          oktaSignIn.authClient.tokenManager.get('idToken').then(function (idToken) {
            console.log('Hello, ' + idToken.claims.email);
          });
  
          // Remove the tokens from the window location hash
          window.location.hash = '';
        },
        function error(err) {
          // Handle errors as needed
          console.error(err);
        }
      );
    } else {
      oktaSignIn.authClient.session.get().then(function (res) {   
        // Session exists, show logged in state.
        if (res.status === 'ACTIVE') {
          console.log('Welcome back, ' + res.login);
          console.log("Now redirecting you to your room...")

          // Redirect user to dedicated room URL.
          window.location = res.login;

          return;
        }
        
      });
    }
    showLogin();
  }


// Render login form
function showLogin() {
  oktaSignIn.renderEl({ el: "#okta-login-container" }, function(res) {}, function(err) {
    alert("Couldn't render the login form, something horrible must have happened. Please refresh the page.");
  });
}

// Determine if there is a querystring.
function hasQueryString() {
  return location.href.indexOf("?") !== -1;
}