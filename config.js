module.exports = {
  phusion: {
    component: {
      breakpoint: {
        smallMax: 640,
        mediumMax: 1077,
        largeMax: 1200,
        xlargeMax: 1440
      }
    },
    module: {
      auth: {
        authTokenLocalStorageKey: "phusion_auth_token"
      },
      environment: {
        env: "dev"
      },
      http: {
        responseCaching: {
          enabled: true,
          defaultCacheExpiry: "30s",
          localStorageKey: "phusion_http_response_cache"
        }
      },
      router: {
        removeHashFromUrls: true
      },
      user: {
        userLocalStorageKey: "phusion_user_user"
      }
    }
  }
};