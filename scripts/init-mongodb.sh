echo "==== Initializing mongodb: ===="
echo "1. Go to mongodb.com and create a cluster named Cluster0 and a user named user0"

stty -echo
printf "2. Enter the password you used for user0: "
read PASSWORD
stty echo
printf "\n"
touch .env
echo >> .env
echo "MONGODB_PASSWORD=\"$PASSWORD\"" >> .env

echo "3. Open the page for your database cluster"
echo "4. Click on the cluster name and then click on the \"Connect\" button."
echo "5. Click \"Connect your application.\""
echo "6. This will show a string like: mongodb+srv://user0:<password>@cluster0.<MONGODB_SUBDOMAIN>.mongodb.net/?retryWrites=true&w=majority"

printf "7. Enter the MONGODB_SUBDOMAIN value: "
read MONGODB_SUBDOMAIN
printf "\n"
echo "MONGODB_SUBDOMAIN=\"$MONGODB_SUBDOMAIN\"" >> .env

echo