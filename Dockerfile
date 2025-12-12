FROM node:20

# 2. Set working directory inside container
WORKDIR /app

# 3. Copy only package files first (better for caching)
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy rest of your project files
COPY . .

# 6. Expose port (for info / docs)
EXPOSE 3000

# 7. Start app (correct)
CMD ["npm", "start"]
