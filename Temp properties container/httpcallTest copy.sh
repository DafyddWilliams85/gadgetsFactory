
sudo apt-get install jq -y
#
APPID=$( jq -r  '.APPID'  techData.json)

HTTP_CODE=$(curl --write-out "%{http_code}\n" "https://api.innonation.nl/test_post?appid="$APPID -k -o response.json)
echo $HTTP_CODE
