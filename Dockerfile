FROM amazon/aws-lambda-nodejs:12

COPY . /var/task/

RUN rm -rf node_modules
RUN npm install
RUN npm run build
# The following is used when the docker container is ran directly
# Lambda function deployment overrides this in the iac terraform folder
EXPOSE 5000

ENV LAMBDA_TASK_ROOT=/var/task/dist

ENTRYPOINT [ "/var/lang/bin/npm" ]
CMD [ "run", "listen" ]