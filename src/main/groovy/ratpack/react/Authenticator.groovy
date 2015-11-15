package ratpack.react

import fr.javatic.ratpack.jwtauth.AuthenticationFailed
import fr.javatic.ratpack.jwtauth.AuthenticationFunction
import fr.javatic.ratpack.jwtauth.JWTClaims
import org.slf4j.LoggerFactory

class Authenticator implements AuthenticationFunction<AuthForm> {
    @Override
    JWTClaims authenticate(AuthForm credentials) throws AuthenticationFailed {
        if (credentials == null) {
            throwsException("No credential")
        }

        if (credentials.user && credentials.user != credentials.password) {
            throwsException("invalid username/password, (demo, use same for both)")
        }

        def claims = new JWTClaims()
        claims.set("user", credentials.user)
        claims.set("name", "Joe Blow")
        claims
    }

    static void throwsException(String message) {
        LoggerFactory.getLogger(getClass()).error(message)
        throw new AuthenticationFailed(message)
    }
}
