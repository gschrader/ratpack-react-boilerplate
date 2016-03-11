package ratpack.react

class Util {
    static boolean isRunning(String url) {
        try {
            url.toURL().text
            return true
        } catch (e) {
            return false
        }
    }
}
