const { AuthenticationService, JWTStrategy } = require('@feathersjs/authentication')
const { LocalStrategy } = require('@feathersjs/authentication-local')
const { expressOauth } = require('@feathersjs/authentication-oauth')

// class MyAuthenticationService extends AuthenticationService {
//   async getPayload(authResult, params) {
//     // Call original `getPayload` first
//     const payload = await super.getPayload(authResult, params);
//     const { user } = authResult;
//
//     return {
//       ...payload,
//       userId: user._id
//     };
//   }
// }
//
// class LegacyJWTStrategy extends JWTStrategy {
//   getEntityId(authResult) {
//     const { authentication: { payload } } = authResult;
//
//     return payload.userId || payload.sub;
//   }
// }


module.exports = app => {
    const authentication = new AuthenticationService(app)

    authentication.register('jwt', new JWTStrategy())
    authentication.register('local', new LocalStrategy())

    // const authentication = new MyAuthenticationService(app);
    //
    // authentication.register('jwt', new LegacyJWTStrategy());
    // authentication.register('local', new LocalStrategy());

    app.use('/authentication', authentication)
    app.configure(expressOauth())
}
