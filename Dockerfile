FROM public.ecr.aws/lambda/nodejs:16

WORKDIR /server
# Copy function code
COPY . .

RUN npm install -g yarn
RUN yarn 
RUN yarn build

EXPOSE 80
  
# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
RUN chmod +x /server/startProduction.sh
RUN chown root:root startProduction.sh

CMD /server/startProduction.sh