# Step 1: Build the React app
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy only package files first to optimize layer caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the full project and build
COPY . .
RUN npm run build

# Step 2: Serve with Nginx
FROM nginx:alpine AS production

# Copy the build output from the previous stage
COPY --from=builder /app/build /usr/share/nginx/html

# Optional: Replace the default nginx.conf (only if needed)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Healthcheck (optional but useful)
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
