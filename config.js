// Autodesk Forge configuration
module.exports = {
    // Set environment variables or hard-code here
    credentials: {
        client_id: process.env.FORGE_CLIENT_ID,
        client_secret: process.env.FORGE_CLIENT_SECRET,
        callback_url: process.env.FORGE_CALLBACK_URL
    },
    scopes: {
        // Required scopes for the server-side application
        internal: ['bucket:create', 'bucket:read', 'data:read', 'data:create', 'data:write'],
        // Required scope for the client-side viewer
        public: ['viewables:read']
    }
  
  //some endpoints have not been packaged with Forge SDK
  //most endpoints of Issue API use the same kind of header
  
  //  hqv1:{
   //   userprofile_useratme: 'https://developer.api.autodesk.com/userprofile/v1/users/@me'
   // },

   // Issue API
  // issue: {

    //    basedUrl: 'https://developer.api.autodesk.com/issues/v1/containers/',
    //  httpHeaders: function (access_token) {
    //    return {
    //      Authorization: 'Bearer ' + access_token,
    //      'Content-Type': 'application/vnd.api+json'
    //    }
    //  },
    //  getIssues: function (containerId, filter = '') {
    //    return this.basedUrl + containerId + '/quality-issues' + filter;
    //  }
   // },
};
