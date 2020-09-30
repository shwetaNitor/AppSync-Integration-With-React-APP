# Serverless-React-Amplify-Cognito-Appsync-App

![Architecture](https://github.com/shwetaNitor/Serverless-React-Amplify-Cognito-Appsync-App/blob/master/Serverless-AWS-Amplify-Cognito-Appsync.png)


### Follow below steps for setup and deployment

### Clone repository on local using 

```bash
git clone "https://github.com/shwetaNitor/Serverless-React-Amplify-Cognito-Appsync-App.git"
```

### To setup frontend i.e. React APP 

```bash
cd frondend
```

```bash
npm i
```

### The next thing we need to do is install & configure the AWS Amplify CLI. To do so, we'll use npm:

```bash
npm install -g @aws-amplify/cli
```

### Once the CLI is installed, we'll need to configure it to use an IAM user from our AWS account

```bash
amplify configure
```

### Next, we'll run the push command to create the services in our account:

```bash
amplify push
```

### Now, you'll be prompted for the following:

- Do you want to generate code for your newly created GraphQL API? Y

- Choose the code generation language target: JavaScript

- Enter the file name pattern of graphql queries, mutations and subscriptions: src/graphql/*/.js

- Do you want to generate/update all possible GraphQL operations - queries, mutations and subscriptions: Y

### Once the push is complete, the AWS AppSync service have been successfully created in our account.

## The library will recognize this directive & automcatically expand the schema into additional schema that is typically necessary for a robust API, including queries, mutations, subscriptions, resolvers & a data source (Amazon DynamoDB). Everything you need to get up & running is now set up for you using this directive.

# If at any time you would like to view the services that have been created in your Amplify configuration, you can run amplify status.

# To view the AWS AppSync console & see the API that was just created, click here. To view the Cognito user pool that was just created, click here.

# Now, we should be able to run the app & see the queried data rendered to our screen:

```bash
npm start
```


