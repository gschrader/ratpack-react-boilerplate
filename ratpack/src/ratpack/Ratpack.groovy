import com.fasterxml.jackson.databind.ObjectMapper
import org.pac4j.http.client.direct.ParameterClient
import org.pac4j.http.profile.HttpProfile
import org.pac4j.jwt.credentials.authenticator.JwtAuthenticator
import org.pac4j.jwt.profile.JwtGenerator
import ratpack.exec.Blocking
import ratpack.file.MimeTypes
import ratpack.groovy.template.TextTemplateModule
import ratpack.pac4j.RatpackPac4j
import ratpack.react.AuthenticatorService
import ratpack.react.JVMDataService
import ratpack.session.SessionModule

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
        module SessionModule
        module TextTemplateModule
        bindInstance(new JVMDataService())
        bindInstance(new AuthenticatorService())
    }

    serverConfig {
        development(true)
    }

    handlers {
        def parameterClient = new ParameterClient("jwt", new JwtAuthenticator(secret))
        parameterClient.supportGetRequest = true

        all RatpackPac4j.authenticator(parameterClient)

        prefix("api") {
            path("login") { ctx ->
                parse(jsonNode()).then(
                        { data ->
                            Blocking.get(
                                    {
                                        def model = ctx.get(AuthenticatorService).authenticate(data)
                                        JwtGenerator generator = new JwtGenerator(secret, false)

                                        def profile = new HttpProfile()
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

            post("logout") {
                render json(
                        [
                                user: ""
                        ]
                )
            }

            path("status") { context ->
                websocketBroadcast(context, periodically(registry, Duration.ofMinutes(1), {
                    return new ObjectMapper().writeValueAsString(true)
                }))
            }

            all RatpackPac4j.requireAuth(ParameterClient)

            prefix("jvm") {
                get {
                    render json(get(JVMDataService))
                }
            }

            path("jvmws") { context ->
                websocketBroadcast(context, periodically(registry, Duration.ofMillis(1000), {
                    return new ObjectMapper().writeValueAsString(registry.get(JVMDataService).last)
                }))
            }
        }

        get('static/:type/:id') { context ->
            def path = "/static/${context.pathTokens['type']}/${context.pathTokens['id']}"
            InputStream resourceStream = getClass().getResourceAsStream(path)
            if (resourceStream) {
                def contentType = context.get(MimeTypes).getContentType(path)
                context.response.send(contentType, resourceStream.bytes)
            } else {
                context.next()
            }

        }


        get('readme') {
            def readme = "https://raw.githubusercontent.com/gschrader/ratpack-react-boilerplate/master/README.md".toURL().text
            // hack to get rid of demo.gif, it's not needed for live demo and there isn't code to go look for it
            readme = readme.replaceAll(/!\[Demo]\(\.\/demo\.gif\)/, "")
            render readme
        }

        all {
            render groovyTemplate([:], "index.html")
        }
    }
}
