echo "==== Initializing session secrets ===="

printf "1. Generating secret key for dev environment and adding it to .env... "
DEV_SECRET_KEY=$(./scripts/secret-key.sh)
touch .env
echo "SESSION_SECRET=\"$DEV_SECRET_KEY\"" >> .env
printf "Done\n"

echo "2. Go to https://github.com/<username>/<repo-name>/settings/environments"
echo "3. Click on the \"New environment\" button"
echo "4. Enter the name \"deployment\" and click on the \"Configure environment\" button"
echo "5. Click \"Add Secret\". Enter the following values:"
echo 
echo "Name: SESSION_SECRET"
echo "Value: $(./scripts/secret-key.sh)"
echo
echo "Press enter to continue..."
read _
