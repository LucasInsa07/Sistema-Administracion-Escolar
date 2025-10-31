package com.demo.sistema_gestion_escolar.config;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // CORS amplio (tu dominio + localhost). Agregá lo que necesites en la env.
    @Bean
    CorsConfigurationSource corsConfigurationSource(
            @Value("${app.cors.allowed-origins:}") String allowedCsv) {

        List<String> defaults = List.of(
            "http://administracion.thomasruizdiaz.com",
            "https://administracion.thomasruizdiaz.com",
            "http://localhost:3000",
            "https://localhost:3000"
        );

        List<String> origins = (allowedCsv == null || allowedCsv.isBlank())
                ? defaults
                : Arrays.stream(allowedCsv.split("\\s*,\\s*")).toList();

        CorsConfiguration cfg = new CorsConfiguration();
        // Usamos patterns para admitir http/https (y podrías sumar subdominios si quisieras)
        cfg.setAllowedOriginPatterns(origins);
        cfg.setAllowedMethods(List.of("GET","POST","PUT","PATCH","DELETE","OPTIONS"));
        cfg.setAllowedHeaders(List.of("*"));
        cfg.setExposedHeaders(List.of("Authorization", "Set-Cookie"));
        cfg.setAllowCredentials(true);
        cfg.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", cfg);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12); // Factor de costo 12 para buena seguridad
    }

    @Bean
    SecurityFilterChain securityFilterChain(org.springframework.security.config.annotation.web.builders.HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(Customizer.withDefaults())
            .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // Abrimos todo: GET/POST/PUT/DELETE/OPTIONS de cualquier path
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .anyRequest().permitAll()
            );

        // ⚠️ Intencionalmente NO agregamos ningún filtro JWT aquí.
        // Si tu proyecto tiene un JwtAuthFilter registrado "en otro lado",
        // comentá su @Bean o la línea addFilterBefore(...) en la config de seguridad original.

        return http.build();
    }
}