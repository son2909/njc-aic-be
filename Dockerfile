FROM public.ecr.aws/lambda/nodejs:16

# Copy function code
COPY src/lambda.ts ${LAMBDA_TASK_ROOT}
  
# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "src/lambda.handler" ]