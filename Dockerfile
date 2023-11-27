# Development
FROM node:18-alpine as development
# add the missing shared libraries from alpine base image
RUN apk add --no-cache libc6-compat

WORKDIR /app

ENV NODE_ENV development

# Copy source code into app folder
COPY . .

# Install dependencies
RUN yarn --frozen-lockfile

# Production Build
FROM node:18-alpine as build

WORKDIR /app
RUN apk add --no-cache libc6-compat

ENV NODE_ENV production

# In order to run yarn build we need access to the Nest CLI.
COPY --from=development /app/node_modules ./node_modules
COPY . .

# Generate the production build. The build script runs "nest build" to compile the application.
RUN yarn build

# Install only the production dependencies and clean cache to optimize image size.
RUN yarn --frozen-lockfile --production && yarn cache clean

# Production Server
FROM node:18-alpine as prod

WORKDIR /app
RUN apk add --no-cache libc6-compat

ENV NODE_ENV production

# Re-create non-root user for Docker
RUN addgroup --system --gid 1001 node
RUN adduser --system --uid 1001 node

# Copy only the necessary files
COPY --chown=node:node --from=build /app/dist dist
COPY --chown=node:node --from=build /app/node_modules node_modules

# Set Docker as non-root user
USER node

CMD ["node", "dist/main.js"]