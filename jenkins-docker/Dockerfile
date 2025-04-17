FROM jenkins/jenkins:lts-jdk11

USER root

# Install Docker CLI inside the container (optional if you already mount it)
RUN apt-get update && \
    apt-get install -y docker.io && \
    apt-get clean

# Create docker group with host's Docker group GID and add jenkins user to it
RUN groupadd -g 998 docker || true && \
    usermod -aG docker jenkins

# Switch back to Jenkins user
USER jenkins
