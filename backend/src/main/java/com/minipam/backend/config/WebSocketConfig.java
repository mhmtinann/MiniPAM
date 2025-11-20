package com.minipam.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {
    private final SshWebSocketHandler sshWebSocketHandler;
    private final RdpWebSocketHandler rdpWebSocketHandler;

    public WebSocketConfig(SshWebSocketHandler sshWebSocketHandler, RdpWebSocketHandler rdpWebSocketHandler) {
        this.sshWebSocketHandler = sshWebSocketHandler;
        this.rdpWebSocketHandler = rdpWebSocketHandler;
    }

    @Override
    public void registerWebSocketHandlers(@NonNull WebSocketHandlerRegistry registry) {
        registry
            .addHandler(sshWebSocketHandler, "/ws/ssh")
            .setAllowedOrigins("http://localhost:3000")
            .addInterceptors(new HttpSessionHandshakeInterceptor())
            .setHandshakeHandler(new DefaultHandshakeHandler());

        registry
            .addHandler(rdpWebSocketHandler, "/ws/rdp/{assetId}")
            .setAllowedOrigins("http://localhost:3000")
            .addInterceptors(new HttpSessionHandshakeInterceptor())
            .setHandshakeHandler(new DefaultHandshakeHandler());
    }
}