package com.minipam.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class CommandLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "session_id")
    private SessionLog session;

    private String command;
    private String output;
    private String status; // SUCCESS, ERROR, WARNING
    private LocalDateTime timestamp;
    private String workingDirectory;
    private String exitCode;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public SessionLog getSession() { return session; }
    public void setSession(SessionLog session) { this.session = session; }

    public String getCommand() { return command; }
    public void setCommand(String command) { this.command = command; }

    public String getOutput() { return output; }
    public void setOutput(String output) { this.output = output; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }

    public String getWorkingDirectory() { return workingDirectory; }
    public void setWorkingDirectory(String workingDirectory) { this.workingDirectory = workingDirectory; }

    public String getExitCode() { return exitCode; }
    public void setExitCode(String exitCode) { this.exitCode = exitCode; }
} 