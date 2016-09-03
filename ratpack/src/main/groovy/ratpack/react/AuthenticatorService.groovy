package ratpack.react

import org.slf4j.LoggerFactory

class AuthenticatorService {
    def authenticate(def credentials) throws Exception {
        if (credentials == null) {
            throwsException("No credential")
        }


        def user = credentials.user.textValue()
        def pw = credentials.password.textValue()
        if (!user || (user != pw)) {
            throwsException("invalid username/password, (demo, use same for both)")
        }

        def claims = [:]
        claims.user = user
        claims.name = "Joe Blow"
        claims
    }

    static void throwsException(String message) {
        LoggerFactory.getLogger(getClass()).error(message)
        throw new Exception(message)
    }
}
