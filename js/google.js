
  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }

  gapi.load('auth2', function() {
    auth2 = gapi.auth2.init({
      client_id: 'CLIENT_ID.apps.googleusercontent.com',
      fetch_basic_profile: false,
      scope: 'profile'
    });

    // Sign the user in, and then retrieve their ID.
    auth2.signIn().then(function() {
      console.log(auth2.currentUser.get().getId());
    });
  });
