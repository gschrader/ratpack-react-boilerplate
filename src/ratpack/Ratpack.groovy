import static ratpack.groovy.Groovy.ratpack

ratpack {
    handlers {
        get {
            render file("public/index.html")
        }

        get('static/:id')  {
            render "http://localhost:3000/static/${context.pathTokens['id']}".toURL().text
        }
        assets "public"
    }
}
