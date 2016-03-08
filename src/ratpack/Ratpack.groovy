import com.fasterxml.jackson.databind.ObjectMapper
import org.pac4j.core.profile.UserProfile
import org.pac4j.jwt.profile.JwtGenerator
import ratpack.exec.Blocking
import ratpack.groovy.template.TextTemplateModule
import ratpack.react.AuthenticatorService
import ratpack.react.JVMDataService

import java.time.Duration

import static ratpack.groovy.Groovy.groovyTemplate
import static ratpack.groovy.Groovy.ratpack
import static ratpack.jackson.Jackson.json
import static ratpack.jackson.Jackson.jsonNode
import static ratpack.stream.Streams.periodically
import static ratpack.websocket.WebSockets.websocketBroadcast

def secret = ("McGriddles!" * 10).substring(0, 32)

ratpack {

    bindings {
        module(TextTemplateModule)
        bindInstance(new JVMDataService())
        bindInstance(new AuthenticatorService())
    }

    serverConfig {
        development(true)
    }

    handlers {
        path("api/login") { ctx ->
            parse(jsonNode()).then(
                    { data ->
                        Blocking.get(
                                {
                                    def model = ctx.get(AuthenticatorService).authenticate(data)
                                    JwtGenerator generator = new JwtGenerator(secret, false)

                                    def profile = new UserProfile()
                                    profile.addAttribute("name", model.name)
                                    profile.addAttribute("user", model.user)

                                    return generator.generate(profile)
                                }
                        ).onError({ e ->
                            ctx.response.status(400)
                            render e.message

                        }).then(
                                { token ->
                                    render json(token)

                                }
                        )
                    }
            )
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
