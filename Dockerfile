FROM --platform=linux/amd64 public.ecr.aws/lambda/nodejs:20

# WORKDIR /usr/src

COPY package.json .
COPY package-lock.json .

RUN npm install
# EXPOSE 2233
COPY . .

CMD ["index.handler"]    
