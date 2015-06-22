import ratpack.file.MimeTypes
import ratpack.groovy.template.TextTemplateModule

import static ratpack.groovy.Groovy.groovyTemplate
import static ratpack.groovy.Groovy.ratpack

ratpack {
    bindings {
        module(TextTemplateModule)
    }

    serverConfig {
        development(true)
    }

    handlers {
        get {
            def bundle = "/bundle.js"
            render groovyTemplate([bundle: bundle], "index.html")
        }

        get("dev") {
            def bundle = "http://localhost:3000/static/bundle.js"
            render groovyTemplate([bundle: bundle], "index.html")
        }

        get("bundle.js") { ctx ->
            def resourceStream = getClass().getResourceAsStream("/bundle.js")?.text
            if (resourceStream) {
                ctx.response.send(ctx.get(MimeTypes).getContentType("bundle.js"), resourceStream)
            } else {
                ctx.next()
            }
        }

        get('static/:id') {
            render "http://localhost:3000/static/${context.pathTokens['id']}".toURL().text
        }

        assets "public"
    }
}
