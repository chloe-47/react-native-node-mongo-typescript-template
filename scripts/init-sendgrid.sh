echo "==== Initializing SendGrid: ===="
echo "1. Go to sendgrid.com and create an account."

printf "2. Enter your API key here: "
read SENDGRID_API_KEY
printf "\n"
touch .env
echo >> .env
echo "SENDGRID_API_KEY=\"$SENDGRID_API_KEY\"" >> .env

echo