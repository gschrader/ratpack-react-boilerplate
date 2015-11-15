import com.fasterxml.jackson.databind.ObjectMapper
import fr.javatic.ratpack.jwtauth.InputType
import fr.javatic.ratpack.jwtauth.JWTAuthModule
import fr.javatic.ratpack.jwtauth.LoginHandlerProvider
import ratpack.groovy.template.TextTemplateModule
import ratpack.react.AuthForm
import ratpack.react.Authenticator
import ratpack.react.JVMDataService

import java.time.Duration

import static ratpack.groovy.Groovy.groovyTemplate
import static ratpack.groovy.Groovy.ratpack
import static ratpack.jackson.Jackson.json
import static ratpack.jackson.Jackson.jsonNode
import static ratpack.stream.Streams.periodically
import static ratpack.websocket.WebSockets.websocketBroadcast

ratpack {

    bindings {
        module(TextTemplateModule)
        bindInstance(new JVMDataService())

        def secret = "McGriddles!" * 10

        module(JWTAuthModule, { cfg ->
            cfg.secret(secret)
            cfg.header("X-Authentication")
            cfg.authentication("default", AuthForm, Authenticator, InputType.JSON)

        })
    }

    serverConfig {
        development(true)
    }

    handlers {
        path("api/login") {
            get(LoginHandlerProvider).handleLoginFor("default", context)
        }

        post("api/logout") {
            render json(
                    [
                            user: ""
                    ]
            )
        }

        path("jvm") {
            render json(get(JVMDataService))
        }

        path("ws/jvm") { context ->
            websocketBroadcast(context, periodically(registry, Duration.ofMillis(1000), {
                return new ObjectMapper().writeValueAsString(registry.get(JVMDataService).last)
            }))
        }

        get('static/:id') {
            render "http://localhost:3000/static/${context.pathTokens['id']}".toURL().text
        }

        files {
            dir "react"
        }

        all {
            if (serverConfig.isDevelopment()) {
                def bundle = "http://localhost:3000/static/"
                render groovyTemplate([bundle: bundle], "index.html")
            } else {
                def bundle = "/"
                render groovyTemplate([bundle: bundle], "index.html")
            }
        }
    }
}
