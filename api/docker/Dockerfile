FROM eclipse-temurin:21-jdk

WORKDIR /api

# Copier uniquement Maven wrapper + pom pour précharger les dépendances (monter dans le dosser ~/.m2)
COPY app/pom.xml .
COPY app/mvnw .
COPY app/.mvn ./.mvn
RUN chmod +x mvnw && ./mvnw dependency:go-offline -B

# Exposer le port
EXPOSE 8080

# Commande pour dev
CMD ["./mvnw", "spring-boot:run"]
