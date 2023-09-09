# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template


### Setup

[Ref](https://docs.aws.amazon.com/redshift/latest/gsg/rs-gsg-create-sample-db.html#gsg-load-sample-data-v1)

```bash
npm install @aws-cdk/aws-redshift-alpha@2.80.0-alpha.0
```

This [link](https://docs.aws.amazon.com/systems-manager/latest/userguide/managed-instances-default-host-management.html) discuss how to enable ssm session globally.


### Initialize the sample data db


Download the zipped file from [here](https://docs.aws.amazon.com/redshift/latest/gsg/samples/tickitdb.zip)

```bash
for fobj in allevents_pipe.txt allusers_pipe.txt  category_pipe.txt  date2008_pipe.txt  listings_pipe.txt  sales_tab.txt venue_pipe.txt
do 
aws s3 cp ~/Downloads/tickitdb/$fobj s3://mys3stack-mydemoredshiftbucketahskjfsahfk43a7c739-1fweiuqwd278u/tickitdb/$fobj
done
```

```sql
copy tickit.users from 's3://mys3stack-mydemoredshiftbucketahskjfsahfk43a7c739-1fweiuqwd278u/tickitdb/allusers_pipe.txt' 
iam_role 'arn:aws:iam::733829533973:role/MyRedshiftStack-RedshiftRoleD1BA0605-VVLBNCFLUNKZ' 
delimiter '|' region 'eu-west-1';

copy tickit.venue from 's3://mys3stack-mydemoredshiftbucketahskjfsahfk43a7c739-1fweiuqwd278u/tickitdb/venue_pipe.txt' 
iam_role 'arn:aws:iam::733829533973:role/MyRedshiftStack-RedshiftRoleD1BA0605-VVLBNCFLUNKZ'
delimiter '|' region 'eu-west-1';

copy tickit.category from 's3://mys3stack-mydemoredshiftbucketahskjfsahfk43a7c739-1fweiuqwd278u/tickitdb/category_pipe.txt' 
iam_role 'arn:aws:iam::733829533973:role/MyRedshiftStack-RedshiftRoleD1BA0605-VVLBNCFLUNKZ'
delimiter '|' region 'eu-west-1';

copy tickit.date from 's3://mys3stack-mydemoredshiftbucketahskjfsahfk43a7c739-1fweiuqwd278u/tickitdb/date2008_pipe.txt' 
iam_role 'arn:aws:iam::733829533973:role/MyRedshiftStack-RedshiftRoleD1BA0605-VVLBNCFLUNKZ'
delimiter '|' region 'eu-west-1';

copy tickit.event from 's3://mys3stack-mydemoredshiftbucketahskjfsahfk43a7c739-1fweiuqwd278u/tickitdb/allevents_pipe.txt' 
iam_role 'arn:aws:iam::733829533973:role/MyRedshiftStack-RedshiftRoleD1BA0605-VVLBNCFLUNKZ'
delimiter '|' timeformat 'YYYY-MM-DD HH:MI:SS' region 'eu-west-1';

copy tickit.listing from 's3://mys3stack-mydemoredshiftbucketahskjfsahfk43a7c739-1fweiuqwd278u/tickitdb/listings_pipe.txt' 
iam_role 'arn:aws:iam::733829533973:role/MyRedshiftStack-RedshiftRoleD1BA0605-VVLBNCFLUNKZ'
delimiter '|' region 'eu-west-1';

copy tickit.sales from 's3://mys3stack-mydemoredshiftbucketahskjfsahfk43a7c739-1fweiuqwd278u/tickitdb/sales_tab.txt'
iam_role 'arn:aws:iam::733829533973:role/MyRedshiftStack-RedshiftRoleD1BA0605-VVLBNCFLUNKZ'
delimiter '\t' timeformat 'MM/DD/YYYY HH:MI:SS' region 'eu-west-1';
```
