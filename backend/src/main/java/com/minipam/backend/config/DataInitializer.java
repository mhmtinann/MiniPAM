package com.minipam.backend.config;

import com.minipam.backend.model.User;
import com.minipam.backend.model.Role;
import com.minipam.backend.model.Asset;
import com.minipam.backend.repository.UserRepository;
import com.minipam.backend.repository.AssetRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository, AssetRepository assetRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepository.findByUsername("admin").isEmpty()) {
                User admin = new User();
                admin.setUsername("admin");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setRole(Role.ADMIN);
                userRepository.save(admin);
                System.out.println("Admin user created successfully!");
            }

            if (assetRepository.count() == 0) {
                // Sunucu 1
                Asset server1 = new Asset();
                server1.setHostname("Web Sunucusu");
                server1.setIpAddress("192.168.1.100");
                server1.setUsername("root");
                server1.setPassword("server123");
                server1.setPort(22);
                server1.setConnectionType(Asset.ConnectionType.SSH);
                assetRepository.save(server1);

                // Sunucu 2
                Asset server2 = new Asset();
                server2.setHostname("Veritabanı Sunucusu");
                server2.setIpAddress("192.168.1.101");
                server2.setUsername("root");
                server2.setPassword("server123");
                server2.setPort(22);
                server2.setConnectionType(Asset.ConnectionType.SSH);
                assetRepository.save(server2);

                // Sunucu 3
                Asset server3 = new Asset();
                server3.setHostname("Uygulama Sunucusu");
                server3.setIpAddress("192.168.1.102");
                server3.setUsername("root");
                server3.setPassword("server123");
                server3.setPort(22);
                server3.setConnectionType(Asset.ConnectionType.SSH);
                assetRepository.save(server3);
            }
        };
    }
} 