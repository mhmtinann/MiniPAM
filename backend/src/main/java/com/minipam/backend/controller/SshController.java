package com.minipam.backend.controller;

import com.jcraft.jsch.JSch;
import com.jcraft.jsch.Session;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ssh")
@CrossOrigin
public class SshController {

    @PostMapping("/connect")
    public ResponseEntity<String> connect(@RequestBody SshRequest request) {
        JSch jsch = new JSch();
        Session session = null;
        try {
            session = jsch.getSession(request.getUsername(), request.getIp(), request.getPort());
            session.setPassword(request.getPassword());
            session.setConfig("StrictHostKeyChecking", "no");
            session.connect(5000); // 5 saniye timeout
            session.disconnect();
            return ResponseEntity.ok("Bağlantı başarılı!");
        } catch (Exception e) {
            if (session != null && session.isConnected()) session.disconnect();
            return ResponseEntity.status(500).body("Bağlantı başarısız: " + e.getMessage());
        }
    }
}

class SshRequest {
    private String ip;
    private int port;
    private String username;
    private String password;

    public String getIp() { return ip; }
    public void setIp(String ip) { this.ip = ip; }
    public int getPort() { return port; }
    public void setPort(int port) { this.port = port; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}